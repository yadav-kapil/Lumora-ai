export const validateForm = (formData) => {
  const errors = {};

  const { email, password, confirmPassword } = formData;

  // 🔹 Email validation
  if (!email) {
    errors.emailErr = "Email is required";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.emailErr = "Please enter a valid email";
    }
  }

  // 🔹 Password validation
  if (!password) {
    errors.passwordErr = "Password is required";
  } else if (password.length < 6) {
    errors.passwordErr = "Password must be at least 6 characters";
  }

  // 🔹 Confirm password
  if (!confirmPassword) {
    errors.confirmPasswordErr = "Please confirm your password";
  } else if (password !== confirmPassword) {
    errors.confirmPasswordErr = "Passwords do not match";
  }

  return errors;
};