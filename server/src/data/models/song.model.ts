import { Schema, Types } from "mongoose";
import SongEntity from "../../domain/entities/song.entity";

const songSchema = new Schema<SongEntity>({
    name: { type: String, default: null },
    artists: [{
        type: String,
    }],
    cover: { type: Types.ObjectId, ref: "Media", default: null },
    song: { type: Types.ObjectId, ref: "Media", required: true },
}, {
    timestamps: true,
})

export default songSchema;
