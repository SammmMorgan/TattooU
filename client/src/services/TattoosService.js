import { AppState } from "../AppState.js"
import { Tattoo } from "../models/Tattoo.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TattoosService {

  async getMoreTats(pageNum) {
    const response = await api.get('api/designs', { params: pageNum })
    logger.log(pageNum)
    AppState.currentPage++
    logger.log(response.data)
    // AppState.tattoos.push(new Tattoo(response.data))

  }
  async getAllTattoos(query) {
    const response = await api.get('api/designs', { params: query })
    logger.log('getting tattoos', response.data)
    AppState.tattoos = response.data.designs.map(tattoo => new Tattoo(tattoo))
  }
  setLikedImage(tattooId) {
    const likedImage = AppState.tattoos.find(tattoo => tattoo.id == tattooId)
    likedImage.isLiked = true
    // @ts-ignore
    AppState.likedImage = likedImage
  }

}

export const tattoosService = new TattoosService()