import { AppState } from "../AppState"
import { Collection } from "../models/Collection"
import { Like } from "../models/Like"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class CollectionService {
    async createCollection(collectionData) {
        const response = await api.post('api/collections', collectionData)
        logger.log('CREATED COLLECTION', response.data)
        const newCollection = new Collection(response.data)
        AppState.collections.push(newCollection)
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

    // async addToCollection(collectionId) {
    //     const response = await api.post(`account/collections/${collectionId}/likes`)
    //     logger.log('found collection', response.data)
    //     AppState.collections.push(new Like(response.data))

    // }


}

export const collectionService = new CollectionService()