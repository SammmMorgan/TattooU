import { Schema } from "mongoose";

export const TattooSchema = new Schema({
    id: {
        type: Schema.ObjectId,
        required: true,
    },
    tag: {
        type: String,
        enum: ['male', 'female', 'blackandgrey', 'color', 'sleeve', 'tribal', 'blackwork', 'chicano', 'dotwork', 'fineline', 'geometric', 'handpoked', 'darkart', 'japanese', 'lettering', 'neo', 'newschool', 'ornamental', 'realism', 'illustrative', 'oldschool', 'trashpolka', 'watercolor', 'surrealism', 'cosmetic', 'additional', 'chest', 'stomach', 'back', 'head', 'forearm', 'upperarm', 'legs', 'hand'],
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
        toJSON: { virtuals: true }
    }
)