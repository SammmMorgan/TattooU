import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { collectionService } from "../services/CollectionService.js";

export class CollectionController extends BaseController {
    constructor() {
        super('api/collections')
        this.router
            .get('', this.getAllCollections)
            .get('/:collectionId', this.getCollectionById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createCollection)
            .post('/:collectionId', this.addToCollection)
            .put('/:collectionId', this.updateCollection)
            .delete('/:collectionId', this.deleteCollection)
    }

    /**
  * Sends all values back to the client
  * @param {import("express").Request} request
  * @param {import("express").Response} response
  * @param {import("express").NextFunction} next
//   */
    //     async createCollection(request, response, next) {
    //         try {
    //             const data = request.body
    //             // @ts-ignore
    //             data.creatorId = request.userInfo.id
    //             const collection = await collectionService.createCollection(data)
    //             response.send(collection)
    //         } catch (error) {
    //             next(error)
    //         }
    //     }

    /**
  * Sends all values back to the client
  * @param {import("express").Request} request
  * @param {import("express").Response} response
  * @param {import("express").NextFunction} next
  */

    async getAllCollections(request, response, next) {
        try {
            const collections = await collectionService.getAllCollections()
            response.send(collections)
        } catch (error) {
            next(error)
        }
    }

    /**
 * Sends all values back to the client
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 * @param {import("express").NextFunction} next
 */

    async getCollectionById(request, response, next) {
        try {
            const id = request.params.collectionId
            const collection = await collectionService.getCollectionById(id)
            response.send(collection)
        } catch (error) {
            next(error)
        }
    }

    /**
* Sends all values back to the client
* @param {import("express").Request} request
* @param {import("express").Response} response
* @param {import("express").NextFunction} next
*/

    async updateCollection(request, response, next) {
        try {
            const id = request.params.collectionId
            const data = request.body
            // @ts-ignore
            const userId = request.userInfo.id
            const collection = await collectionService.updateCollection(id, data, userId)
            response.send(collection)
        } catch (error) {
            next(error)
        }
    }


    /**
   * Sends all values back to the client
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   */
    async deleteCollection(request, response, next) {
        try {
            const id = request.params.collectionId
            // @ts-ignore
            const userId = request.userInfo.id
            const message = await collectionService.deleteCollection(id, userId)
            response.send(message)
        } catch (error) {
            next(error)
        }
    }

    async addToCollection(request, response, next) {
        try {
            const data = request.body
            data.collectionId = request.collection.id
            const pictureToAdd = await collectionService.addToCollection(data)
            response.send(pictureToAdd)
        } catch (error) {
            next(error)
        }
    }
}