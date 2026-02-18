// Validation utility functions

/**
 * Validates registration input
 * @returns {object|null} Returns error object if validation fails, null if valid
 */
const validateInput = (email, password) => {
  if (!email.includes("@") || !email.includes(".")) {
    return {
      success: false,
      message: "Please provide a valid email address",
    };
  }

  if (password.length < 8) {
    return {
      success: false,
      message: "Password must be at least 8 characters long",
    };
  }

  if (!/[A-Z]/.test(password)) {
    return {
      success: false,
      message: "Password must contain at least one uppercase letter",
    };
  }

  if (!/[a-z]/.test(password)) {
    return {
      success: false,
      message: "Password must contain at least one lowercase letter",
    };
  }

  if (!/[0-9]/.test(password)) {
    return {
      success: false,
      message: "Password must contain at least one number",
    };
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return {
      success: false,
      message:
        "Password must contain at least one special character (!@#$%^&*...)",
    };
  }

  return null;
};

module.exports = {
  validateInput,
};
