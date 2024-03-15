import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class LikeService {
    async getAccountCollections(userId) {
      const collections = await dbContext.Likes.find({accountId: userId})
      .populate({
        path: 'collection',
        populate: {
            path: 'imageCount'
        }
      })
    }
    
    
    async createLike(data) {
        const like = await dbContext.Likes.create(data)
        await like.populate('collection')
        await like.populate('design')
        return like
    }
    
    async deleteLike(id, userId) {
        const like = await dbContext.Likes.findById(id)
        if(!like) throw new BadRequest(`Invalid id: ${id}`)
        if(like.accountId != userId) throw new Forbidden(`Access Denied`)
        await like.deleteOne()
        return `Like Deleted`
    }
    
}

export const likeService = new LikeService()