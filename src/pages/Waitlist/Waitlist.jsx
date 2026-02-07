import React, { useState } from "react";
import ResponsiveWidthWrapper from "../../components/ResponsiveWidthWrapper/ResponsiveWidthWrapper";
import FormFieldset from "../../components/Form/FormFieldset";
import FormGroup from "../../components/Form/FormGroup";
import FormLabel from "../../components/Form/FormLabel";
import FormInput from "../../components/Form/FormInput";
import FormTextarea from "../../components/Form/FormTextarea";
import FormError from "../../components/Form/FormError";
import Button from "../../components/Button/Button";
import Alert from "../../components/Alert/Alert";
import FormSelect from "../../components/Form/FormSelect";
import useFormValidation from "../../hooks/useFormValidation";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { database } from "../../firestoreConfig";

const Waitlist = () => {
  const [alert, setAlert] = useState(null);

  // Validation rules
  const validationRules = () => ({
    name: {
      required: { message: "Please enter their name" },
      minLength: { value: 1, message: "Name must be at least 1 characters" },
    },
    email: {
      required: { message: "Please enter their email address" },
      email: { message: "Please enter a valid email address" },
    },
    character: {
      required: { message: "Please enter the character name" },
      minLength: { value: 1, message: "Name must be at least 1 characters" },
    },
  });

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
      name: "",
      email: "",
      character: "",
    },
    validationRules,
  );

  const onSubmit = async (data) => {
    try {
      const docRef = await addDoc(collection(database, "waitlist"), {
        ...data,
        createdAt: serverTimestamp(),
      });

      setAlert({
        alertMessage: `${data.name} has been successfully added to the waitlist.`,
        type: "success",
      });

      resetForm();
    } catch (error) {
      console.log(error.message);
      setAlert({
        alertMessage: `Could not add to waitlist`,
        type: "error",
      });
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 bg-bg-light py-6 min-h-screen">
      <ResponsiveWidthWrapper>
        <div className="flex flex-col justify-center items-center gap-4">
          <h1 className="text-4xl font-bold">Waitlist</h1>

          <section>
            <p>
              This is the waitlist for character designs people are waiting for.
            </p>
          </section>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="w-full max-w-2xl"
          >
            <FormFieldset legend="Waitlist Form">
              <FormGroup>
                <FormLabel htmlFor="name">Name:</FormLabel>
                <FormInput
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Your name"
                  error={hasError("name")}
                />
                <FormError error={errors.name} />
              </FormGroup>

              <FormGroup>
                <FormLabel htmlFor="email">Email:</FormLabel>
                <FormInput
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="your.email@example.com"
                  error={hasError("email")}
                />
                <FormError error={errors.email} />
              </FormGroup>

              <FormGroup>
                <FormLabel htmlFor="character">Character:</FormLabel>
                <FormInput
                  type="text"
                  id="character"
                  name="character"
                  value={formData.character}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter the name of character"
                  error={hasError("character")}
                />

                <FormError error={errors.character} />
              </FormGroup>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </FormFieldset>
          </form>
        </div>
      </ResponsiveWidthWrapper>

      {alert && (
        <Alert
          alertMessage={alert.alertMessage}
          type={alert.type}
          duration={5000}
          onClose={() => setAlert(null)}
        />
      )}
    </div>
  );
};

export default Waitlist;
