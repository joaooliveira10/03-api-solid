import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository.js"
import { AuthenticateUseCase } from "../authenticate.service.js"

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const authenticateUseCase = new AuthenticateUseCase(usersRepository)

  return authenticateUseCase
}