import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth/jwt";

export function proxy(request) {
    const { pathname, search } = request.nextUrl;

    const token = request.cookies.get("militech_session")?.value;
    const session = token ? verifyToken(token) : null;

    const isLogin = pathname === "/login";
    const isPublic = pathname === "/";

    // Si ya está autenticado e intenta entrar al login,
    // lo mandamos a inicio.
    if (session && isLogin) {
        return NextResponse.redirect(new URL("/inicio", request.url));
    }

    // Las rutas públicas no necesitan autenticación.
    if (isPublic || isLogin) {
        return NextResponse.next();
    }

    // Si no tiene una sesión válida, mandarlo al login
    // conservando la ruta que quería visitar.
    if (!session) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("callbackUrl", pathname + search);

        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
