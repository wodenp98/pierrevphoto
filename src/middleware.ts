export { default } from "next-auth/middleware";

export const config = { matcher: ["/compte", "/sucess/:path*"] };
