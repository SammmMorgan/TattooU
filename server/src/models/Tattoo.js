import { Schema } from "mongoose";

export const TattooSchema = new Schema({
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
        toJSON: { virtuals: true }
    }
)