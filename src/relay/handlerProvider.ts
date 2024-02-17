import ConnectionHandler from "relay-connection-handler-plus";

export const handlerProvider = (handle: string) => {
  switch (handle) {
    case "connection":
      return ConnectionHandler;
    default:
      return null;
  }
};
