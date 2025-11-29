import { RawQlResponse } from "raw_lib";
import SongEntity from "../entities/song.entity";

export default abstract class SongsRepository {
  abstract createSong(songData: FormData): Promise<RawQlResponse<SongEntity>>;
  abstract updateSong(songData: FormData): Promise<RawQlResponse<SongEntity>>;
  abstract getSong(
    limit: number,
    page: number,
    id: string | null
  ): Promise<RawQlResponse<number | SongEntity>>;
}
