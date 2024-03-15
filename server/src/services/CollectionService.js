import { dbContext } from "../db/DbContext.js"

class CollectionService {
    
    async getAllCollections() {
        const collections = await dbContext.Collections.find().populate('creator')
        return collections
    }
    async createCollection(data) {
        const collection = await dbContext.Collections.create(data)
        await collection.populate('creator')
        return collection
    }
    
    async getCollectionById(id) {
        const collection = await dbContext.Collections.findById(id)
        if(!collection) throw new Error(`No Collection was found with id ${id}`)
        return collection
    }
    
}

export const collectionService = new CollectionService()