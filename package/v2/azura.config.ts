import { Config as AzuraConfig } from "./src/shared/config/config.module";

const config: AzuraConfig = {
  server: {
    port: 80,
    cluster: true,
  },
};

export default config;
