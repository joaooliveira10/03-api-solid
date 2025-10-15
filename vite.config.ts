import tsconfigPath from 'vite-tsconfig-paths'
import { defineConfig } from "vitest/config"

export default defineConfig({
  plugins: [tsconfigPath()],
  test: {
    dir: 'src',
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          dir: 'src/service',
        },
      },
      {
        extends: true,
        test: {
          name: 'e2e',
          dir: 'src/http/controllers',
          environment: 'prisma/vitest-environment-prisma/prisma-test-environment.ts',
        },
      },
    ]
  },
})