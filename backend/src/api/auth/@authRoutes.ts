import { FastifyInstance } from 'fastify';
import { UserSignIn } from './userSignIn';
import { UserSignOut } from './userSignOut';

export const AuthRoutes = async (app: FastifyInstance) => {
  app.register(UserSignIn)
  app.register(UserSignOut)
  return app
}