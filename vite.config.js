import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    hookTimeout: 120000,
    maxConcurrency: 1,
    //maxWorkers: 1,
  },
});
