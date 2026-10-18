import { defineConfig } from "@neon/config/v1";

export default defineConfig({
  // Declare your Neon services here
  auth: true,
  // Neon Free does not provision AI Gateway; add aiGateway: true after upgrading.
  functions: {
    hello: { name: "Hello World", source: "./hello.ts" },
  },
  buckets: {
    // Public blog images are loaded directly by readers' browsers.
    assets: { access: "public_read" },
  },
  // Branch policy: per-branch tuning
  branch: (branch) => {
    if (branch.isDefault) {
      // Default branch: no overrides, uses project defaults
      return {};
    }
    if (!branch.exists) {
      // New non-default branches: auto-expire
      // Run `neon checkout <name>` to create a new branch with these settings
      return { ttl: "7d" };
    }
    // Existing branch: no changes
    return {};
  },
});
