import express from "express";
import { createUser } from "../controllers/userController.js";
import { loginUser } from "../controllers/userController.js";
import { logoutCurrentUser } from "../controllers/userController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { authorizeAdmin } from "../middlewares/authMiddleware.js";
import { getAllUsers } from "../controllers/userController.js";
import { getCurrentUserProfile } from "../controllers/userController.js";
import { updateCurrentUserProfile } from "../controllers/userController.js";
import { deleteUserById, getUserById,updateUserById } from "../controllers/userController.js";

const router = express.Router();

router
  .route("/")
  .post(createUser)
  .get(authenticate, authorizeAdmin, getAllUsers);
router.post("/auth", loginUser);
router.post("/logout", logoutCurrentUser);
router
  .route("/profile")
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, updateCurrentUserProfile);

//Admin routes
router
  .route("/:id")
  .delete(authenticate, authorizeAdmin, deleteUserById)
  .get(authenticate, authorizeAdmin, getUserById)
  .put(authenticate, authorizeAdmin, updateUserById)
export default router;
