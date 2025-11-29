import SongsRepository from "../../repositories/song.repository";

export default class GetSongUsecase {
  constructor(private songRepository: SongsRepository) {}

  async call(limit: number = 20, page: number = 1, id: string | null) {
    return this.songRepository.getSong(limit, page, id);
  }
}
