import { verifyJWT } from "@/http/middlewares/verify-jwt.js";
import type { FastifyInstance } from "fastify";
import { authenticate } from "./authenticate.controller.js";
import { profile } from "./profile.controller.js";
import { refresh } from "./refresh.controller.js";
import { register } from "./register.controller.js";


export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)

  /** Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}