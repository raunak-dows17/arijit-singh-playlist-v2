import { RawQlEngine, RawQlRequest } from "raw_lib";
import playlistSchema from "../../data/models/playlist.model";
import CreatePlaylistUsecase from "../../domain/usecases/playlist/create_playlist.usecase";
import GetPlaylistUsecase from "../../domain/usecases/playlist/get_playlist.usecase";
import UpdatePlaylistUsecase from "../../domain/usecases/playlist/updatePlaylist.usecase";
import mongoAdapter from "../../shared/infrastructure/database/connection";
import PlatlilstService from "../../data/services/playlist.service";
import { Request, Response } from "express";
import PlaylistEntity from "../../domain/entities/playlist.entity";

class PlaylistController {
  private createPlaylistUsecase: CreatePlaylistUsecase;
  private getPlaylistUsecase: GetPlaylistUsecase;
  private updatePlaylistUsecase: UpdatePlaylistUsecase;

  constructor() {
    mongoAdapter.registerModel("Playlist", playlistSchema);
    const engine = new RawQlEngine(mongoAdapter);
    const service = new PlatlilstService(engine);

    this.createPlaylistUsecase = new CreatePlaylistUsecase(service);
    this.getPlaylistUsecase = new GetPlaylistUsecase(service);
    this.updatePlaylistUsecase = new UpdatePlaylistUsecase(service);
  }

  async createPlaylist(req: Request, res: Response) {
    try {
      return res.success(
        await this.createPlaylistUsecase.call(req.body as PlaylistEntity)
      );
    } catch (error: any) {
      return res.error({
        status: false,
        message: error.message,
        data: null,
      });
    }
  }

  async updatePlaylist(req: Request, res: Response) {
    try {
      return res.success(
        await this.updatePlaylistUsecase.call(
          req.body as Partial<PlaylistEntity>
        )
      );
    } catch (error: any) {
      return res.error({
        status: false,
        message: error.message,
        data: null,
      });
    }
  }

  async getPlaylist(req: Request, res: Response) {
    try {
      return res.success(
        await this.getPlaylistUsecase.call(req.body as RawQlRequest)
      );
    } catch (error: any) {
      return res.error({
        status: false,
        message: error.message,
        data: null,
      });
    }
  }
}

export default new PlaylistController();
