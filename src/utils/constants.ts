import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

interface PublicConfig {
  API_ENDPOINT: string;
  NODE_ENV: string;
  USE_TEXT_QUERY: "true" | "false";
  USE_REMOTE_SERVER_FOR_DEV: "true" | "false";
}

export const getPublicConfig = (): PublicConfig => {
  return publicRuntimeConfig;
};
