import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { TattooSchema } from '../models/Tattoo.js';
import { CollectionSchema } from '../models/Collection.js';
import { LikedImageSchema } from '../models/LikedImage.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  
  Design = mongoose.model('Design', TattooSchema)
  
  Collections = mongoose.model('Collection', CollectionSchema)
  
  Likes = mongoose.model('Likes', LikedImageSchema)
}

export const dbContext = new DbContext()
