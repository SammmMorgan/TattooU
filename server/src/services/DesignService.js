import { dbContext } from "../db/DbContext.js"

class DesignService {
    async getAllDesigns() {
        const designs = await dbContext.Design.find()
        return designs
    }
    
}

export const designService = new DesignService()