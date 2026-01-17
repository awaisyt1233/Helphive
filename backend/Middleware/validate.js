const { z } = require("zod");

// Signup Schema (Keep your existing one here)
const signupSchema = z.object({
  fullName: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
  mobileNumber: z.string()
  .length(11, "Mobile number must be exactly 11 digits")
  .regex(/^03[0-9]{9}$/, "Mobile number must start with '03' and contain only digits"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Uppercase required")
    .regex(/[0-9]/, "Number required")
    .regex(/[@$!%*?&]/, "Special character required"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// NEW: Login Schema
const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

// Middleware function for Login
const validateLogin = (req, res, next) => {
  try {
    loginSchema.parse(req.body);
    next();
  } catch (error) {
    // Check if it's a Zod validation error
    if (error.errors && error.errors.length > 0) {
      return res.status(400).json({ message: error.errors[0].message });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Export both
module.exports = { 
  validateSignup: (req, res, next) => {
    try { signupSchema.parse(req.body); next(); } 
    catch (e) { res.status(400).json({ message: e.errors[0].message }); }
  },
  validateLogin 
};