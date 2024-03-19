import { AppState } from "../AppState"
import { LikedImage } from "../models/LikedImage"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class LikeService {
    async createLike(tattooData) {
        const response = await api.post('api/likes', tattooData)
        logger.log('liked image', response.data)
        AppState.likedImages.push(new LikedImage(response.data))
    }
}

export const likeService = new LikeService