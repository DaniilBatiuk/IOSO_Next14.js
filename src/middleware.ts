import { NextRequest, NextResponse } from "next/server";

import { LINKS } from "./utils/config/links";

export function middleware(request: NextRequest) {
  const { url, cookies } = request;

  const isAuth = cookies.get("next-auth.session-token")?.value;

  const isAuthPage = url.includes("/SignIn") || url.includes("/SignUp");

  if (isAuthPage && isAuth) {
    return NextResponse.redirect(new URL(LINKS.Home, url));
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/SignIn/:path", "/SignUp/:path"],
};
