import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import app from '../../server';
import { UserSignIn } from './userSignIn';
import { UserSignOut } from './userSignOut';





export const AuthRoutes = async (app: FastifyInstance) => {
  app.register(UserSignIn)
  app.register(UserSignOut)
  return app
}