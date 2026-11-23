import { NextResponse } from "next/server";

export function proxy(request) {
    const { pathname } = request.nextUrl;

    // Rutas públicas
    const publicRoutes = ["/", "/login"];

    const isPublic = publicRoutes.includes(pathname);

    // Comprobar token
    const token = request.cookies.get("token")?.value;

    // Si no hay token y no está en login
    if (!token && !isPublic) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
