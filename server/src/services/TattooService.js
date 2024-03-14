import { dbContext } from "../db/DbContext.js"

class TattooService {
    async getAllTattoos() {
        const designs = await dbContext.Tattoo.find()
        return designs
    }
    
}

export const tattooService = new TattooService()