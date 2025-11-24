import { Schema, Types } from "mongoose";
import Jamming from "../../domain/entities/jaming.entity";

const jammingSchema = new Schema<Jamming>({
    title: { type: String, default: null },
    sessionId: { type: String, default: null },
    mode: {
        type: String,
        enum: ["shuffle", "normal", "repeat"],
        default: "normal",
    },
    playList: [{
        type: Types.ObjectId,
        ref: "Song",
    }],
    endAt: { type: Date, default: null },
    restartedAt: { type: Date, default: null },
    users: [{
        type: Types.ObjectId,
        ref: "User"
    }],
}, { timestamps: true });

export default jammingSchema;
