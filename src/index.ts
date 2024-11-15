import { cors } from "@elysiajs/cors";
import { jwt } from "@elysiajs/jwt";
import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { db } from "./db";
import logixlysia from "logixlysia";

const app = new Elysia()
  .use(
    swagger({
      path: "/swagger",
    })
  )
  .use(cors())
  .use(jwt({ secret: process.env.SECRET as string }))
  .use(
    logixlysia({
      config: {
        showStartupMessage: true,
        startupMessageFormat: "simple",
        timestamp: {
          translateTime: "yyyy-mm-dd HH:MM:ss",
        },
        ip: true,
        logFilePath: "./logs/example.log",
        customLogFormat:
          "🦊 {now} {level} {duration} {method} {pathname} {status} {message} {ip} {epoch}",
      },
    })
  )
  .get("/hallo", () => "Haloo");

await db.$connect();
console.log("🗄️ Database was connected!");

app.listen(process.env.PORT as string, () =>
  console.log(`🦊 Server started at ${app.server?.url.origin}`)
);
