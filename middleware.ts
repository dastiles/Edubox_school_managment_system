import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/register",
  },
});

export const config = {
  matcher: [
    "/",
    "/profile/:path*",
    "/students/:path*",
    "/teachers/:path*",
    "/event/:path*",
    "/department/:path*",
  ],
};
