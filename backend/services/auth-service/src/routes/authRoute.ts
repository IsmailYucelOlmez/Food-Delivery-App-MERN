import { Router } from "express";
import { body } from "express-validator";
import {
  register,
  login,
  refreshToken,
  logout,
  getProfile,
  updateProfile,
  changePassword,
  getAllUsers,
  updateUserRole,
  deactivateUser,
  validateToken
} from "../controllers/authController";
import {
  jwtCheck,
  jwtParse,
  requireAdmin,
  requireUserOrAdmin
} from "../middleware/auth";

const router = Router();

// Validation middleware
const validateRegistration = [
  body('email').isEmail().normalizeEmail(),
  body('name').trim().isLength({ min: 2, max: 50 }),
  body('password').optional().isLength({ min: 6 }),
  body('role').optional().isIn(['user', 'admin', 'driver', 'restaurant'])
];

const validateLogin = [
  body('email').optional().isEmail().normalizeEmail(),
  body('password').optional().isLength({ min: 6 })
];

const validateProfileUpdate = [
  body('name').optional().trim().isLength({ min: 2, max: 50 }),
  body('email').optional().isEmail().normalizeEmail()
];

const validatePasswordChange = [
  body('currentPassword').isLength({ min: 6 }),
  body('newPassword').isLength({ min: 6 })
];

const validateRoleUpdate = [
  body('role').isIn(['user', 'admin', 'driver', 'restaurant'])
];

// Public routes
router.post("/register", validateRegistration, register);
router.post("/login", validateLogin, login);

// Protected routes
router.use(jwtCheck);
router.use(jwtParse);

// User routes
router.get("/profile", getProfile);
router.put("/profile", validateProfileUpdate, updateProfile);
router.post("/refresh-token", refreshToken);
router.post("/logout", logout);
router.put("/change-password", validatePasswordChange, changePassword);

// Admin routes
router.get("/users", requireAdmin, getAllUsers);
router.put("/users/:userId/role", requireAdmin, validateRoleUpdate, updateUserRole);
router.put("/users/:userId/deactivate", requireAdmin, deactivateUser);

// Token validation for other services
router.post("/validate-token", jwtCheck, jwtParse, validateToken);

export default router;
