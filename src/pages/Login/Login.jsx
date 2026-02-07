import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ResponsiveWidthWrapper from "../../components/ResponsiveWidthWrapper/ResponsiveWidthWrapper";
import Button from "../../components/Button/Button";
import Alert from "../../components/Alert/Alert";
import AlertDialog from "../../components/AlertDialog/AlertDialog";
import { trackSignUp, trackLogin } from "../../utils/analytics";
import useFormValidation from "../../hooks/useFormValidation";
import FormError from "../../components/Form/FormError";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState("");
  const { login, signup, resetPassword } = useAuth();
  const navigate = useNavigate();

  // Validation rules
  const validationRules = () => {
    const rules = {
      email: {
        required: { message: "Email is required" },
        email: { message: "Please enter a valid email address" },
      },
      password: {
        required: { message: "Password is required" },
        minLength: {
          value: 6,
          message: "Password must be at least 6 characters",
        },
        custom: (value) => {
          if (!value) return "";

          const hasLowerCase = /[a-z]/.test(value);
          const hasUpperCase = /[A-Z]/.test(value);
          const hasNumber = /[0-9]/.test(value);
          const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);

          if (!hasLowerCase) {
            return "Password must contain at least one lowercase letter";
          }
          if (!hasUpperCase) {
            return "Password must contain at least one uppercase letter";
          }
          if (!hasNumber) {
            return "Password must contain at least one number";
          }
          if (!hasSymbol) {
            return "Password must contain at least one special character";
          }
          return "";
        },
      },
    };

    if (isSignUp) {
      rules.firstName = {
        required: { message: "First name is required" },
        minLength: {
          value: 2,
          message: "First name must be at least 2 characters",
        },
      };
      rules.lastName = {
        required: { message: "Last name is required" },
        minLength: {
          value: 2,
          message: "Last name must be at least 2 characters",
        },
      };
      rules.confirmPassword = {
        required: { message: "Please confirm your password" },
        custom: (value, values) => {
          if (value !== values.password) {
            return "Passwords do not match";
          }
          return "";
        },
      };
    }

    return rules;
  };

  const {
    values: formData,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    hasError,
    isSubmitting,
  } = useFormValidation(
    {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationRules,
  );

  const onSubmit = async (data) => {
    try {
      setError("");
      setSuccess("");
      setLoading(true);

      if (isSignUp) {
        // Sign up new user
        await signup(data.email, data.password, {
          firstName: data.firstName,
          lastName: data.lastName,
        });
        trackSignUp();
        setSuccess("Account created! Please verify your email.");
        setTimeout(() => {
          navigate("/verify-email");
        }, 1500);
      } else {
        // Log in existing user
        await login(data.email, data.password);
        trackLogin();
        navigate("/");
      }
    } catch (err) {
      console.error("Auth error:", err);
      console.error("Error code:", err.code);
      console.error("Error message:", err.message);

      // Handle Firebase auth errors
      const errorCode = err.code || "";

      if (errorCode.includes("email-already-in-use")) {
        setError("This email is already registered. Please login instead.");
      } else if (errorCode.includes("weak-password")) {
        setError("Password is too weak. Use at least 6 characters.");
      } else if (
        errorCode.includes("user-not-found") ||
        errorCode.includes("invalid-credential")
      ) {
        setError("Invalid email or password");
      } else if (errorCode.includes("wrong-password")) {
        setError("Incorrect password");
      } else if (errorCode.includes("invalid-email")) {
        setError("Invalid email address");
      } else if (errorCode.includes("too-many-requests")) {
        setError("Too many failed attempts. Please try again later");
      } else if (errorCode.includes("user-disabled")) {
        setError("This account has been disabled");
      } else if (errorCode.includes("network")) {
        setError("Network error. Please check your connection");
      } else {
        setError(
          `Failed to ${isSignUp ? "sign up" : "log in"}: ${err.message || "Please try again"}`,
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError("");
    setSuccess("");
    resetForm();
  };

  const handleResetPassword = async () => {
    if (!resetEmail) {
      setResetError("Please enter your email address");
      return;
    }

    setResetLoading(true);
    setResetError("");
    try {
      await resetPassword(resetEmail);
      setSuccess("Password reset email sent! Check your inbox.");
      setShowResetDialog(false);
      setResetEmail("");
      setResetError("");
    } catch (err) {
      console.error("Password reset error:", err);
      setResetError(
        err.code === "auth/user-not-found"
          ? "No account found with this email"
          : "Failed to send reset email. Please try again.",
      );
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="py-8 min-h-[calc(100vh-200px)] flex items-center justify-center">
      <ResponsiveWidthWrapper>
        <div className="max-w-md mx-auto">
          {showResetDialog && (
            <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 overflow-hidden">
              <div className="p-8 max-w-md w-full mx-4 bg-light rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.3)] border-2 border-primary/40">
                <h2 className="text-2xl font-bold text-dark mb-4">
                  Reset Password
                </h2>
                <p className="text-dark mb-4">
                  Enter your email address and we'll send you a link to reset
                  your password.
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  <strong>Tip:</strong> Check your junk/spam folder if you don't
                  see the email in your inbox.
                </p>
                {resetError && (
                  <div className="mb-4">
                    <Alert
                      type="error"
                      alertMessage={resetError}
                      onClose={() => setResetError("")}
                    />
                  </div>
                )}
                <input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-2 mb-4 border-2 border-gray-300 rounded focus:border-primary focus:outline-none"
                />
                <div className="flex gap-2">
                  <Button onClick={handleResetPassword} disabled={resetLoading}>
                    {resetLoading ? "Sending..." : "Send Reset Link"}
                  </Button>
                  <Button
                    onClick={() => {
                      setShowResetDialog(false);
                      setResetError("");
                      setResetEmail("");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-primary/20">
            <h1 className="text-3xl font-bold text-dark mb-6 text-center">
              {isSignUp ? "Create Account" : "Login"}
            </h1>

            {error && (
              <div className="mb-4">
                <Alert
                  type="error"
                  alertMessage={error}
                  duration={4000}
                  onClose={() => setError("")}
                />
              </div>
            )}

            {success && (
              <div className="mb-4">
                <Alert
                  type="success"
                  alertMessage={success}
                  duration={4000}
                  onClose={() => setSuccess("")}
                />
              </div>
            )}

            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="flex flex-col gap-4"
            >
              {isSignUp && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="firstName"
                        className="font-semibold text-dark text-sm"
                      >
                        First Name
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="John"
                        className={`w-full p-3 border-2 rounded-lg focus:outline-none transition-colors ${
                          hasError("firstName")
                            ? "border-red-500 focus:border-red-600"
                            : "border-gray-300 focus:border-primary"
                        }`}
                        disabled={loading || isSubmitting}
                      />
                      <FormError error={errors.firstName} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="lastName"
                        className="font-semibold text-dark text-sm"
                      >
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Doe"
                        className={`w-full p-3 border-2 rounded-lg focus:outline-none transition-colors ${
                          hasError("lastName")
                            ? "border-red-500 focus:border-red-600"
                            : "border-gray-300 focus:border-primary"
                        }`}
                        disabled={loading || isSubmitting}
                      />
                      <FormError error={errors.lastName} />
                    </div>
                  </div>
                </>
              )}

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="font-semibold text-dark text-sm"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="you@example.com"
                  className={`w-full p-3 border-2 rounded-lg focus:outline-none transition-colors ${
                    hasError("email")
                      ? "border-red-500 focus:border-red-600"
                      : "border-gray-300 focus:border-primary"
                  }`}
                  disabled={loading || isSubmitting}
                />
                <FormError error={errors.email} />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="password"
                  className="font-semibold text-dark text-sm"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={
                    isSignUp
                      ? "Create a strong password"
                      : "Enter your password"
                  }
                  className={`w-full p-3 border-2 rounded-lg focus:outline-none transition-colors ${
                    hasError("password")
                      ? "border-red-500 focus:border-red-600"
                      : "border-gray-300 focus:border-primary"
                  }`}
                  disabled={loading || isSubmitting}
                />
                <FormError error={errors.password} />
              </div>

              {isSignUp && (
                <>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="confirmPassword"
                      className="font-semibold text-dark text-sm"
                    >
                      Confirm Password
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Re-enter your password"
                      className={`w-full p-3 border-2 rounded-lg focus:outline-none transition-colors ${
                        hasError("confirmPassword")
                          ? "border-red-500 focus:border-red-600"
                          : "border-gray-300 focus:border-primary"
                      }`}
                      disabled={loading || isSubmitting}
                    />
                    <FormError error={errors.confirmPassword} />
                  </div>

                  {/* Password Requirements */}
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="text-sm font-semibold text-dark mb-2">
                      Password Requirements:
                    </p>
                    <ul className="space-y-1 text-sm">
                      <li
                        className={`flex items-center gap-2 ${
                          formData.password.length >= 6
                            ? "text-green-600"
                            : "text-gray-600"
                        }`}
                      >
                        <span className="text-lg">
                          {formData.password.length >= 6 ? "✓" : "○"}
                        </span>
                        At least 6 characters
                      </li>
                      <li
                        className={`flex items-center gap-2 ${
                          /[a-z]/.test(formData.password)
                            ? "text-green-600"
                            : "text-gray-600"
                        }`}
                      >
                        <span className="text-lg">
                          {/[a-z]/.test(formData.password) ? "✓" : "○"}
                        </span>
                        One lowercase letter
                      </li>
                      <li
                        className={`flex items-center gap-2 ${
                          /[A-Z]/.test(formData.password)
                            ? "text-green-600"
                            : "text-gray-600"
                        }`}
                      >
                        <span className="text-lg">
                          {/[A-Z]/.test(formData.password) ? "✓" : "○"}
                        </span>
                        One uppercase letter
                      </li>
                      <li
                        className={`flex items-center gap-2 ${
                          /[0-9]/.test(formData.password)
                            ? "text-green-600"
                            : "text-gray-600"
                        }`}
                      >
                        <span className="text-lg">
                          {/[0-9]/.test(formData.password) ? "✓" : "○"}
                        </span>
                        One number
                      </li>
                      <li
                        className={`flex items-center gap-2 ${
                          /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
                            formData.password,
                          )
                            ? "text-green-600"
                            : "text-gray-600"
                        }`}
                      >
                        <span className="text-lg">
                          {/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
                            formData.password,
                          )
                            ? "✓"
                            : "○"}
                        </span>
                        One special character
                      </li>
                    </ul>
                  </div>
                </>
              )}

              <div className="mt-4">
                <Button type="submit" disabled={loading || isSubmitting}>
                  {loading || isSubmitting
                    ? isSignUp
                      ? "Creating Account..."
                      : "Logging in..."
                    : isSignUp
                      ? "Sign Up"
                      : "Log In"}
                </Button>
              </div>

              {!isSignUp && (
                <div className="text-center mt-3">
                  <button
                    type="button"
                    onClick={() => setShowResetDialog(true)}
                    disabled={loading || isSubmitting}
                    className="text-sm text-gray-600 hover:text-primary underline disabled:opacity-50"
                  >
                    Forgot password?
                  </button>
                </div>
              )}
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={toggleMode}
                disabled={loading || isSubmitting}
                className="text-primary hover:underline text-sm font-medium disabled:opacity-50"
              >
                {isSignUp
                  ? "Already have an account? Log in"
                  : "Don't have an account? Sign up"}
              </button>
            </div>
          </div>
        </div>
      </ResponsiveWidthWrapper>
    </div>
  );
};

export default Login;
