import { dbContext } from "../db/DbContext.js"

class DesignService {
    async getAllDesigns() {
        const designs = await dbContext.Design.find()
        return designs
    }
    
    async getDesignById(id) {
        const design = await dbContext.Design.findById(id)
        if(!design) throw new Error(`No Design was found with id ${id}`)
        return design   
    }
    
}

export const designService = new DesignService()