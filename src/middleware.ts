export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/users/:path*"],
};

// matcher: ['/users/:path*', '/api/:path*'],
