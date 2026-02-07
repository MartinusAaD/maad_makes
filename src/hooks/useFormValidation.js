import { useState, useCallback } from "react";

/**
 * Custom hook for form validation
 * @param {Object} initialValues - Initial form values
 * @param {Function} validationRules - Function that returns validation rules for each field
 * @returns {Object} - Form validation state and methods
 */
const useFormValidation = (
  initialValues = {},
  validationRules = () => ({}),
) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Validate a single field
  const validateField = useCallback(
    (name, value) => {
      const rules = validationRules();
      const fieldRules = rules[name];

      if (!fieldRules) return "";

      // Required validation
      if (fieldRules.required) {
        if (value === "" || value === null || value === undefined) {
          return fieldRules.required.message || "This field is required";
        }
        if (Array.isArray(value) && value.length === 0) {
          return fieldRules.required.message || "This field is required";
        }
      }

      // Min length validation
      if (fieldRules.minLength && value) {
        if (value.length < fieldRules.minLength.value) {
          return (
            fieldRules.minLength.message ||
            `Must be at least ${fieldRules.minLength.value} characters`
          );
        }
      }

      // Max length validation
      if (fieldRules.maxLength && value) {
        if (value.length > fieldRules.maxLength.value) {
          return (
            fieldRules.maxLength.message ||
            `Must be no more than ${fieldRules.maxLength.value} characters`
          );
        }
      }

      // Min value validation (for numbers)
      if (fieldRules.min !== undefined && value !== "") {
        const numValue = Number(value);
        if (numValue < fieldRules.min.value) {
          return (
            fieldRules.min.message || `Must be at least ${fieldRules.min.value}`
          );
        }
      }

      // Max value validation (for numbers)
      if (fieldRules.max !== undefined && value !== "") {
        const numValue = Number(value);
        if (numValue > fieldRules.max.value) {
          return (
            fieldRules.max.message ||
            `Must be no more than ${fieldRules.max.value}`
          );
        }
      }

      // Email validation
      if (fieldRules.email && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return (
            fieldRules.email.message || "Please enter a valid email address"
          );
        }
      }

      // Pattern validation
      if (fieldRules.pattern && value) {
        const regex = new RegExp(fieldRules.pattern.value);
        if (!regex.test(value)) {
          return fieldRules.pattern.message || "Please enter a valid format";
        }
      }

      // Custom validation
      if (fieldRules.custom && value) {
        const customError = fieldRules.custom(value, values);
        if (customError) return customError;
      }

      return "";
    },
    [validationRules, values],
  );

  // Validate all fields
  const validateForm = useCallback(() => {
    const rules = validationRules();
    const newErrors = {};

    Object.keys(rules).forEach((fieldName) => {
      const error = validateField(fieldName, values[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [values, validateField, validationRules]);

  // Handle input change
  const handleChange = useCallback(
    (e) => {
      const { name, value, type, checked } = e.target;
      const newValue = type === "checkbox" ? checked : value;

      setValues((prev) => ({
        ...prev,
        [name]: newValue,
      }));

      // Validate field if it's been touched and form has been submitted
      if (touched[name] && hasSubmitted) {
        const error = validateField(name, newValue);
        setErrors((prev) => ({
          ...prev,
          [name]: error,
        }));
      }
    },
    [touched, validateField, hasSubmitted],
  );

  // Handle blur (mark field as touched)
  const handleBlur = useCallback(
    (e) => {
      const { name } = e.target;

      setTouched((prev) => ({
        ...prev,
        [name]: true,
      }));

      // Only validate on blur if form has been submitted at least once
      if (hasSubmitted) {
        const error = validateField(name, values[name]);
        setErrors((prev) => ({
          ...prev,
          [name]: error,
        }));
      }
    },
    [values, validateField, hasSubmitted],
  );

  // Handle form submit
  const handleSubmit = useCallback(
    (onSubmit) => async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setHasSubmitted(true); // Mark that form has been submitted

      // Mark all fields as touched
      const rules = validationRules();
      const allTouched = {};
      Object.keys(rules).forEach((key) => {
        allTouched[key] = true;
      });
      setTouched(allTouched);

      // Validate form
      const isValid = validateForm();

      if (isValid) {
        try {
          await onSubmit(values);
        } catch (error) {
          console.error("Form submission error:", error);
        }
      }

      setIsSubmitting(false);
    },
    [values, validateForm, validationRules],
  );

  // Reset form
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
    setHasSubmitted(false); // Reset submission flag
  }, [initialValues]);

  // Set form values programmatically
  const setFormValues = useCallback((newValues) => {
    setValues(newValues);
  }, []);

  // Set a specific field value
  const setFieldValue = useCallback(
    (name, value) => {
      setValues((prev) => ({
        ...prev,
        [name]: value,
      }));

      // Validate if touched and form has been submitted
      if (touched[name] && hasSubmitted) {
        const error = validateField(name, value);
        setErrors((prev) => ({
          ...prev,
          [name]: error,
        }));
      }
    },
    [touched, validateField, hasSubmitted],
  );

  // Set a specific field error
  const setFieldError = useCallback((name, error) => {
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  }, []);

  // Check if field has error
  const hasError = useCallback(
    (name) => {
      // Only show errors if form has been submitted or currently submitting
      return (hasSubmitted || isSubmitting) && touched[name] && errors[name];
    },
    [touched, errors, hasSubmitted, isSubmitting],
  );

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFormValues,
    setFieldValue,
    setFieldError,
    validateForm,
    hasError,
  };
};

export default useFormValidation;
