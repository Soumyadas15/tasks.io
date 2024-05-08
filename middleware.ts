import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import {
    DEFAULT_LOGIN_REDIRECT,
    DEFAULT_LOGOUT_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    publicRoutes
} from '@/routes'
import { NextResponse } from "next/server";


const { auth } = NextAuth(authConfig)
 
//@ts-ignore
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if(isApiAuthRoute){
    return null;
  }

//   if(isAuthRoute){
//     if(isLoggedIn){
//         return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
//     }
//     return null;
//   }

//   if(!isLoggedIn && !isPublicRoute){
//         const loginURL = new URL("/auth/login", req.url);
//         loginURL.searchParams.set('reload', 'true');
//         return NextResponse.rewrite(loginURL);
//   }


})
 
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}