import SongsRepository from "../../repositories/song.repository";

export default class UpdateSongUsecase {
  constructor(private songRepository: SongsRepository) {}

  async call(song: FormData) {
    return this.songRepository.updateSong(song);
  }
}
