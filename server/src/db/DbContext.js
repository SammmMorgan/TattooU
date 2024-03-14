import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { TattooSchema } from '../models/Tattoo.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  
  Tattoo = mongoose.model('Design', TattooSchema)
}

export const dbContext = new DbContext()
