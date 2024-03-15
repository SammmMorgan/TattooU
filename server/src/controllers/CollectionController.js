import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { collectionService } from "../services/CollectionService.js";

export class CollectionController extends BaseController {
    constructor() {
        super('api/collections')
        this.router
            .get('', this.getAllCollections)
            .get('', this.getCollectionById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('/:collectionId', this.createCollection)
    }
    
     /**
   * Sends all values back to the client
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   */
    async createCollection(request, response, next) {
        try {
            const data = request.body
            // @ts-ignore
            data.creatorId = request.userInfo.id
            const collection = await collectionService.createCollection(data)
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
}