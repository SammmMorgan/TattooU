import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'
import { collectionService } from '../services/CollectionService.js'
import { likedImageService } from '../services/LikedImageService.js'
import { logger } from '../utils/Logger.js'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .put('', this.editUserAccount)
      // TODO write /collections endpoint to hit, that only returns the logged in users collections
      .get('/likes', this.getAccountCollections)
      .post('/likes', this.createCollection)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async editUserAccount(req, res, next) {
    try {
      const accountId = req.userInfo.id
      req.body.id = accountId
      const account = await accountService.updateAccount(req.userInfo, req.body)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getAccountCollections(request, response, next) {
    try {
      const userId = request.userInfo.id
      const collections = await likedImageService.getAccountCollections(userId)
      response.send(collections)
    } catch (error) {
      next(error)
    }
  }

  async createCollection(request, response, next) {
    try {
      const userId = request.userInfo.id
      const likedImgId = request.likedImg
      const newCollection = await likedImageService.createCollection(userId, likedImgId)
      response.send(newCollection)
    } catch (error) {
      next(error)
    }
  }
}
