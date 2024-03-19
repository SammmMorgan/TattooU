import { Schema } from "mongoose";

export const CollectionSchema = new Schema({
    title: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 25
    },
    coverImg: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 500
    },
    creatorId: {
        type: Schema.ObjectId,
        ref: 'Account',
        required: true
    }
},
    {
        timestamps: true,
        toJSON: { virtuals: true }
    })

CollectionSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})

CollectionSchema.virtual('likedImages', {
    localField: '_id',
    ref: 'Likes',
    foreignField: 'collectionId',
    count: true
})