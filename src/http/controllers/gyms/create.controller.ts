import { makeCreateGymUseCase } from "@/service/factories/make-create-gym-use-case.js"
import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createGymsBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine(value => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const
    { title, description, phone, latitude, longitude } = createGymsBodySchema.parse(request.body)

  const createGymsUseCase = makeCreateGymUseCase()

  await createGymsUseCase.execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  })

  return reply.status(201).send()
}