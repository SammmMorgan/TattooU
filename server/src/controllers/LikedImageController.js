// @ts-nocheck
import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { likedImageService } from "../services/LikedImageService.js";

export class LikedImageController extends BaseController {
    constructor() {
        super('api/likes')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createLike)
            .delete('/:likeId', this.deleteLike)
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
            data.accountId = request.userInfo.id
            const like = await likedImageService.createLike(data)
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
            const id = request.params.likeId
            const userId = request.userInfo.id
            const message = await likedImageService.deleteLike(id, userId)
            response.send(message)
        } catch (error) {
            next(error)
        }
    }
}