import SongsRepository from "../../repositories/song.repository";

export default class CreateSongUsecase {
  constructor(private songRepository: SongsRepository) {}

  async call(song: FormData) {
    return this.songRepository.createSong(song);
  }
}
