import { dbContext } from "../db/DbContext.js"

class LikeService {
    
    
    async createLike(data) {
        const like = await dbContext.Likes.create(data)
        await like.populate('collection')
        return like
    }
    
}

export const likeService = new LikeService()