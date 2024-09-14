import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);
const isRegistrations = createRouteMatcher(["/registrations"]);
const isFinance = createRouteMatcher(["/finance"]);

export default clerkMiddleware((auth, req) => {
  const role = auth().sessionClaims?.metadata.role;

  // Allow access to every one for public routes
  if (isPublicRoute(req)) {
    return;
  }

  // Allow access to admin for all routes
  if (role === "admin") {
    return;
  }

  // Allow only registrations for users with role registration
  if (isRegistrations(req) && role === "registration") {
    return;
  }

  // Allow only finance for users with role finance
  if (isFinance(req) && role === "finance") {
    return;
  }

  // Not found for everyone else
  auth().protect(() => {
    return false;
  });
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
