import SongEntity from "@/domain/entities/song.entity";
import SongsRepository from "@/domain/repositories/song.repository";
import { RawQlResponse } from "raw_lib";
import apiClient from "../datasources/network/api.client";

class SongsService implements SongsRepository {
  async createSong(songData: FormData): Promise<RawQlResponse<SongEntity>> {
    try {
      return await apiClient.post<SongEntity>(
        "/api/music",
        songData,
        "multipart/form-data"
      );
    } catch (error) {
      throw error;
    }
  }

  async getSong(
    limit: number = 20,
    page: number = 1,
    id: string | null
  ): Promise<RawQlResponse<number | SongEntity>> {
    try {
      return await apiClient.get<SongEntity>("/api/music", { limit, page, id });
    } catch (error) {
      throw error;
    }
  }

  async updateSong(songData: FormData): Promise<RawQlResponse<SongEntity>> {
    try {
      return await apiClient.put("/api/music", songData, "multipart/form-data");
    } catch (error) {
      throw error;
    }
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new SongsService();
