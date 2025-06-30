import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const redis = new Redis(process.env.REDIS_URL!);

async function testRedis() {
  try {
    await redis.set("test-key", "CodeMentorAI 🚀");
    const value = await redis.get("test-key");
    console.log("✅ Redis connected successfully!");
    console.log("Returned value:", value);
    process.exit(0);
  } catch (err) {
    console.error("❌ Redis connection failed:", err);
    process.exit(1);
  }
}

testRedis();
