import {app} from '../../server';
import { UserSignIn } from './userSignIn';
import { UserSignOut } from './userSignOut';



export const AuthRoutes =  async () => {
  app.register(UserSignIn)
  app.register(UserSignOut)
}