import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class LikedImageService {
  async createCollection(userId, likedImgId) {
    const newCollection = await dbContext.Collections.create(likedImgId)
    newCollection.populate('creator')
    return newCollection
  }
  async getAccountCollections(userId) {
    const collections = await dbContext.Likes.find({ accountId: userId })
      .populate({
        path: 'collection',
        populate: {
          path: 'likedImages'
        }
      })
    return collections
  }


  async createLike(data) {
    const like = await dbContext.Likes.create(data)
    await like.populate('collection')
    await like.populate('design')
    return like
  }

  async deleteLike(id, userId) {
    const like = await dbContext.Likes.findById(id)
    if (!like) throw new BadRequest(`Invalid id: ${id}`)
    if (like.accountId != userId) throw new Forbidden(`Access Denied`)
    await like.deleteOne()
    return `Like Deleted`
  }

}

export const likedImageService = new LikedImageService()