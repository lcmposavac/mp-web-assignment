const state = { isShutdown: false };

process.on("SIGTERM", () => {
  state.isShutdown = true;
});

const assertEnv = (envNames: string[]) => {
  let success = true;
  for (const envName of envNames) {
    if (!process.env[envName]) {
      success = false;
      console.error(`${envName} environment variable in not present`);
    }
  }
  return success;
};

export const healthCheck = async (): Promise<boolean> => {
  if (state.isShutdown) {
    return false;
  }
  if (!assertEnv(["API_ENDPOINT"])) {
    return false;
  }
  return true;
};
