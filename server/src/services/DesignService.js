import { query } from "express"
import { dbContext } from "../db/DbContext.js"
import { TattooQuery } from "../models/Tattoo.js"

class DesignService {
    async getAllDesigns() {
        const designs = await dbContext.Design.find()
        return designs
    }

    async getDesignById(id) {
        const design = await dbContext.Design.findById(id)
        if (!design) throw new Error(`No Design was found with id ${id}`)
        return design
    }

    async getSearchedDesigns(queryParam) {
        const pageNumber = parseInt(queryParam.page) || 1
        const designLimit = 40
        const skipNumber = (pageNumber - 1) * designLimit

        const searchQuery = new TattooQuery(queryParam)

        const shownTats = await dbContext.Design
            .find(searchQuery)
            .limit(designLimit)
            .skip(skipNumber)

        const total = await dbContext.Design.countDocuments(queryParam)

        const response = {
            designs: shownTats,
            page: pageNumber,
            count: total,
        }
        return response

    }

}

export const designService = new DesignService()