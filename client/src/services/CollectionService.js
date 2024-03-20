import { AppState } from "../AppState"
import { Collection } from "../models/Collection"
import { LikedImage } from "../models/LikedImage"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class CollectionService {
    async createCollection(collectionData, likedImage) {
        logger.log(collectionData, 'new collection data')
        const response = await api.post('api/collections', collectionData)
        logger.log('CREATED COLLECTION', response.data)
        const newCollection = new Collection(response.data)
        logger.log(newCollection, 'new collection pre-push')
        newCollection.likedImages.push(likedImage)
        logger.log(newCollection, 'new collection')
        return newCollection

    }


    async getCollections() {
        const response = await api.get('api/collections')
        logger.log('getting collections', response.data)
        AppState.collections = response.data.map(collection => new Collection(collection))
    }

    async deleteCollection(collectionId) {
        const response = await api.delete(`api/collections/${collectionId}`)
        logger.log('deleted collection')
    }

    // async addToCollection(likedImage) {
    //     const response = await api.post(`account/collections/${collectionId}/likedImages`)
    //     logger.log('found collection', response.data)
    //     AppState.collections.push(new LikedImage(response.data))

    // }


}

export const collectionService = new CollectionService()