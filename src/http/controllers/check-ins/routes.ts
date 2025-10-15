import { verifyJWT } from "@/http/middlewares/verify-jwt.js";
import { verifyUserRole } from "@/http/middlewares/verify-user-role.js";
import type { FastifyInstance } from "fastify";
import { create } from "./create.controller.js";
import { history } from "./history.controller.js";
import { metrics } from "./metrics.controller.js";
import { validate } from "./validate.controller.js";



export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/check-ins/history', history)
  app.get('/check-ins/metrics', metrics)

  app.post('/gyms/:gymId/check-ins', create)
  app.patch('/check-ins/:checkInId/validate', { onRequest: [verifyUserRole('ADMIN')] }, validate)


}