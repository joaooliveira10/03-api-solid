import { verifyJWT } from "@/http/middlewares/verify-jwt.js";
import { verifyUserRole } from "@/http/middlewares/verify-user-role.js";
import type { FastifyInstance } from "fastify";
import { create } from "./create.controller.js";
import { nearby } from "./nearby.controller.js";
import { search } from "./search.controller.js";



export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)

  app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')] }, create)
}