import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL!);

redis.set("ping", "pong").then(() => {
  console.log("Redis is connected 🚀");
});
