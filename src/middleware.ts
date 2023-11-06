export { default } from "next-auth/middleware";

export const config = { matcher: ["/compte", "/sucess/:path*"] };

// import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

// import { Ratelimit } from "@upstash/ratelimit";
// import { Redis } from "@upstash/redis";

// const redis = new Redis({
//   url: process.env.UPSTASH_REDIS_REST_URL!,
//   token: process.env.UPSTASH_REDIS_REST_TOKEN!,
// });

// const ratelimit = new Ratelimit({
//   redis: redis,
//   limiter: Ratelimit.slidingWindow(5, "10 s"),
// });

// export default async function middleware(
//   request: NextRequest,
//   event: NextFetchEvent
// ): Promise<Response | undefined> {
//   const ip = request.ip ?? "127.0.0.1";
//   const { success, pending, limit, reset, remaining } = await ratelimit.limit(
//     ip
//   );

//   if (!success) {
//     const now = Date.now();
//     const retryAfter = Math.floor((reset - now) / 1000);
//     return NextResponse.redirect(new URL("/request-limit", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: "/",
// };
