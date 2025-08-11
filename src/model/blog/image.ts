import mongoose, { Schema, Document } from "mongoose";

export interface IImage extends Document {
    imageName: string;
    image: {
        public_id: string;
        url: string;
    };
    postDate: Date;
}

const imageSchema: Schema = new Schema({
    imageName: { type: String, required: true },
    image: {
        public_id: { type: String, required: true },
        url: { type: String, required: true }
    },
    postDate: { type: Date, default: Date.now }
});

export default mongoose.model<IImage>("Image", imageSchema);
