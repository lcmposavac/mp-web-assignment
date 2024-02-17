import express from "express";
import stoppable, { StoppableServer } from "stoppable";
import next from "next";
import morgan from "morgan";
import { healthCheck } from "./healthCheck";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const conf = require("#root/next.config");

class App {
  app = express();
  private server?: StoppableServer;
  configure = async () => {
    const dev = process.env.NODE_ENV !== "production";
    const nextapp = next({ dev, conf });
    const handle = nextapp.getRequestHandler();
    await nextapp.prepare();
    this.app.get("/healthz", async (req, res) => {
      const isHealthy = await healthCheck();
      if (isHealthy) {
        res.status(200).send("OK");
      } else {
        res.status(500).send("NOT-OK");
      }
    });
    this.app.use(
      morgan("combined", {
        skip: function (req) {
          return req.url?.startsWith("/_next");
        },
      })
    );
    this.app.all("*", (req, res) => {
      return handle(req, res);
    });
  };
  start = async (port: number) => {
    await this.configure();
    this.server = stoppable(
      this.app.listen(port, () => {
        console.info(`Server listening on port ${port}`);
      })
    );
    return;
  };
  stop = async () => {
    this.server?.stop(async (err, isStopped) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      if (isStopped) {
        console.info("Http server stopped.");
      } else {
        console.info("Http server not stopped yet!!");
      }
    });
  };
}
export { App };
