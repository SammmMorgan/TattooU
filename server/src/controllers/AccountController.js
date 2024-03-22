import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'
import { collectionService } from '../services/CollectionService.js'
import { likedImageService } from '../services/LikedImageService.js'
import { logger } from '../utils/Logger.js'

export class AccountController extends BaseController {
  constructor() {
    super('api/account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .put('', this.editUserAccount)
      // TODO write /collections endpoint to hit, that only returns the logged in users collections
      .get(`/:accountId/collections`, this.getAccountCollections)
      .post(`/:accountId/collections`, this.createCollection)
      .post(`/:collectionId`)
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
      const data = request.body
      // @ts-ignore
      data.creatorId = request.userInfo.id
      const collection = await collectionService.createCollection(data)
      response.send(collection)
    } catch (error) {
      next(error)
    }
  }
  async addToCollection(request, response, next) {
    try {
      const data = request.body
      data.collectionId = request.collection.id
      const pictureToAdd = await collectionService.addToCollection(data)
      response.send(pictureToAdd)
    } catch (error) {
      next(error)
    }
  }
}
