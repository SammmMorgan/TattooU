import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { likeService } from "../services/LikeService.js";

export class LikedImageController extends BaseController {
    constructor() {
        super('api/likes')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createLike)
            .delete('', this.deleteLike)
    }
    
      /**
   * Sends all values back to the client
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   */
    
    async createLike(request, response, next) {
        try {
            const data = request.body
            // @ts-ignore
            data.collectionId = request.userInfo.id
            const like = await likeService.createLike(data)
            response.send(like)
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
    async deleteLike(request, response, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }
}