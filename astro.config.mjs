import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import lottie from "astro-integration-lottie";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [lottie(), react(), tailwind({
    applyBaseStyles: false
  })],
  adapter: node({
    mode: "standalone"
  })
});