import { NextRequest, NextResponse } from "next/server";

import { LINKS } from "./utils/config/links";

export function middleware(request: NextRequest) {
  const { url, cookies } = request;

  const isAuth = cookies.get("__Secure-next-auth.session-token")?.value;

  const isAuthPage = url.includes("/SignIn") || url.includes("/SignUp");
  const isAuthPage2 =
    url.includes("/UpdateQuiz") ||
    url.includes("/Result") ||
    url.includes("/Group") ||
    url.includes("/CreateQuiz") ||
    url.includes("/CreateGroup") ||
    url.includes("/QuizPass");

  console.log(!!isAuth, isAuthPage, isAuthPage2);
  if (isAuthPage2 && !!!isAuth) {
    return NextResponse.redirect(new URL(LINKS.Home, url));
  } else if (isAuthPage && !!isAuth) {
    return NextResponse.redirect(new URL(LINKS.Home, url));
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/SignIn/:path",
    "/SignUp/:path",
    "/UpdateQuiz/:path",
    "/Result/:path",
    "/Group/:path",
    "/CreateQuiz/:path",
    "/CreateGroup/:path",
    "/QuizPass/:path",
  ],
};
