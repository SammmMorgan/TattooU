import { Schema } from "mongoose";

export const LikedImageSchema = new Schema({
    accountId: {
        type: Schema.ObjectId,
        required: true,
        ref: 'Account'
    },
    collectionId: {
        type: Schema.ObjectId,
        required: true,
        ref: 'Collection'
    },
    designId: {
        type: Schema.ObjectId,
        required: true,
        ref: 'Design'
    }
},{
    timestamps: true,
    toJSON: {virtuals: true}
})

LikedImageSchema.virtual('design', {
    localField: 'designId',
    foreignField: '_id',
    ref: 'Design',
    justOne: true
})

LikedImageSchema.virtual('collection', {
    localField: 'collectionId',
    foreignField: '_id',
    ref: 'Collection',
    justOne: true
})