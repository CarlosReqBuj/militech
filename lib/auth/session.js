import { cookies } from "next/headers";
import { createToken, verifyToken } from "./jwt";

const COOKIE_NAME = "militech_session";

const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 2,
};

// Crear sesión
export async function createSession(user) {
    const token = createToken(user);
    const cookieStore = await cookies();

    cookieStore.set(COOKIE_NAME, token, COOKIE_OPTIONS);
}

// Obtener sesión
export async function getSession() {
    const cookieStore = await cookies();

    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) return null;

    const session = verifyToken(token);

    if (!session) {
        return null;
    }

    return session;
}

// Eliminar sesión
export async function deleteSession() {
    const cookieStore = await cookies();

    cookieStore.delete(COOKIE_NAME);
}
