import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class CollectionService {

    async getAllCollections() {
        const collections = await dbContext.Collections.find().populate('creator').populate('imageCount')
        return collections
    }
    async createCollection(data) {
        const collection = await dbContext.Collections.create(data)
        await collection.populate('creator')
        await collection.populate('imageCount')
        return collection
    }

    async getCollectionById(id) {
        const collection = await dbContext.Collections.findById(id)
        if (!collection) throw new Error(`No Collection was found with id ${id}`)
        return collection
    }

    async updateCollection(id, data, userId) {
        const collection = await this.getCollectionById(id)
        if (collection.creatorId != userId) throw new Forbidden('You are not the creator of this collection')
        collection.title = data.name || collection.title
        collection.coverImg = data.coverImg || collection.coverImg
        await collection.save()
        return collection
    }

    async addToCollection() { }

    async deleteCollection(id, userId) {
        const collection = await dbContext.Collections.findById(id)
        if (!collection) throw new BadRequest(`Invalid id: ${id}`)
        if (collection.creatorId != userId) throw new Forbidden(`Access Denied`)
        await collection.deleteOne()
        return `Collection Deleted`
    }
}

export const collectionService = new CollectionService()