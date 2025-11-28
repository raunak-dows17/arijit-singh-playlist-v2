import { Router } from "express";
import { authMiddleware } from "../../shared/infrastructure/middleware/auth.middleware";
import playlistController from "../controllers/playlist.controller";

const playlistRoutes = Router();

playlistRoutes.post(
  "/create",
  authMiddleware,
  playlistController.createPlaylist
);
playlistRoutes.post(
  "/update",
  authMiddleware,
  playlistController.updatePlaylist
);
playlistRoutes.post("/", authMiddleware, playlistController.getPlaylist);

export default playlistRoutes;
