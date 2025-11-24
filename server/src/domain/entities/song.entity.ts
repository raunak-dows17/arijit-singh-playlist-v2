import MediaEntity from "../../shared/media/domain/entities/media.entity";

export default interface SongEntity {
    _id?: string;
    name: string;
    artists: string[];
    cover?: MediaEntity;
    song: MediaEntity;
    createdAt: Date;
    updateAt: Date;
}
