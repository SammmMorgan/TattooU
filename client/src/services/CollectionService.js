import { AppState } from "../AppState"
import { Collection } from "../models/Collection"
import { LikedImage } from "../models/LikedImage"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class CollectionService {
    async createCollection(collectionData, image, accountId) {
        // logger.log(collectionData, 'new collection data')
        const response = await api.post(`api/account/${accountId}/collections`, collectionData)
        // logger.log('CREATED COLLECTION', response.data)
        const newCollection = new Collection(response.data)
        // logger.log(newCollection, 'new collection pre-push')
        newCollection.likedImages.push(image)
        AppState.collections.push(newCollection)
        logger.log(AppState.collections, 'collections')
        return newCollection

    }


    async getCollectionsByAccountId(accountId) {
        const response = await api.get(`api/account/${accountId}/collections`)
        logger.log('getting collections', response.data)
        AppState.collections = response.data.map(collection => new Collection(collection))
        logger.log('appstate collections', AppState.collections)
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