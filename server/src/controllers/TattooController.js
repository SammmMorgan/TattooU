import { tattooService } from "../services/TattooService.js";
import BaseController from "../utils/BaseController.js";

export class TattooController extends BaseController {
    constructor() {
        super('api/designs')
        this.router
            .get('', this.getAllTattoos)
    }
    
    async getAllTattoos(request, response, next) {
        try {
            const designs = await tattooService.getAllTattoos()
            response.send(designs)
        } catch (error) {
            next(error)
        }
    }
}