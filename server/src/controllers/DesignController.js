import { designService } from "../services/DesignService.js";
import BaseController from "../utils/BaseController.js";

export class TattooController extends BaseController {
    constructor() {
        super('api/designs')
        this.router
            .get('', this.getAllDesigns)
            .get('/:designId', )
    }
    
    /**
   * Sends all values back to the client
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   */
    async getAllDesigns(request, response, next) {
        try {
            const designs = await designService.getAllDesigns()
            response.send(designs)
        } catch (error) {
            next(error)
        }
    }
    
    
}