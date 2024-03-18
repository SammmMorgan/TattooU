import { AppState } from "../AppState"
import { Like } from "../models/Like"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class LikeService {
    async createLike(tattooData) {
        const response = await api.post('api/likes', tattooData)
        logger.log('liked image', response.data)
        AppState.likes.push(new Like(response.data))
    }
}

export const likeService = new LikeService