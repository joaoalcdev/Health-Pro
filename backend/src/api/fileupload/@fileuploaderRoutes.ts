import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import app from '../../server';

import { AddFile } from './addFile';

export const FileUploaderRoutes = async (app: FastifyInstance) => {
  app.register(AddFile)
}; 