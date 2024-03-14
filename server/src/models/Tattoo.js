import { Schema } from "mongoose";

export const TattooSchema = new Schema({
    id: {
        type: Schema.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    source: {
        type: String,
        required: true
    },
    posted: {
        type: Date,
        required: true
    },
    height: {
        type: Number,
        default: 800
    },
    width: {
        type: Number,
        default: 640
    }
},
{
    timestamps: true,
    toJSON: {virtuals: true}
}
)