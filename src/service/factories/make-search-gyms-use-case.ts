import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository.js"
import { SearchGymsUseCase } from "../search-gyms.service.js"

export function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new SearchGymsUseCase(gymsRepository)

  return useCase
}