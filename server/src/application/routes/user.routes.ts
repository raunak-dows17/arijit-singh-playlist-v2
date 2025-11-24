import { Router } from "express";
import { mediaUploadMiddleware } from "../../shared/infrastructure/middleware/media.middleware";
import userController from "../controllers/user.controller";
import { authMiddleware } from "../../shared/infrastructure/middleware/auth.middleware";

const userRoutes = Router();

userRoutes.post("/update", authMiddleware, mediaUploadMiddleware("profilePicture", "user_images"), userController.updateProfile);
userRoutes.post("/profile", authMiddleware, userController.getUserProfile);

export default userRoutes;
