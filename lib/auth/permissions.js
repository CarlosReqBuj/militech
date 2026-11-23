import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth/session";

// Obtener el usuario autenticado y comprobar que sigue activo
export async function getCurrentUser() {
    const session = await getSession();

    if (!session) {
        return null;
    }

    const user = await prisma.user.findUnique({
        where: {
            id: session.userId,
        },
        select: {
            id: true,
            username: true,
            nombre: true,
            role: true,
            activo: true,
        },
    });

    if (!user || !user.activo) {
        return null;
    }

    return user;
}

// Exigir que exista un usuario autenticado
export async function requireUser() {
    const user = await getCurrentUser();

    if (!user) {
        throw new Error("UNAUTHORIZED");
    }

    return user;
}

// Exigir que el usuario sea administrador
export async function requireAdmin() {
    const user = await requireUser();

    if (user.role !== "ADMIN") {
        throw new Error("FORBIDDEN");
    }

    return user;
}
