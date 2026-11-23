import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/auth/session";

export async function POST(request) {
    try {
        const body = await request.json();

        const username = body.username?.trim();
        const password = body.password;

        // Validar los datos recibidos
        if (
            typeof username !== "string" ||
            typeof password !== "string" ||
            !username ||
            !password ||
            username.length > 100 ||
            password.length > 200
        ) {
            return NextResponse.json(
                { error: "Usuario o contraseña incorrectos" },
                { status: 400 },
            );
        }

        // Buscar el usuario en la base de datos
        const user = await prisma.user.findUnique({
            where: {
                username,
            },
        });

        // Comprobar que existe y está activo
        if (!user || !user.activo) {
            return NextResponse.json(
                { error: "Usuario o contraseña incorrectos" },
                { status: 401 },
            );
        }

        // Comprobar la contraseña
        const passwordCorrecta = await bcrypt.compare(
            password,
            user.passwordHash,
        );

        if (!passwordCorrecta) {
            return NextResponse.json(
                { error: "Usuario o contraseña incorrectos" },
                { status: 401 },
            );
        }

        // Crear la sesión JWT
        await createSession(user);

        // Determinar la página de destino según el rol
        const redirectTo = user.role === "ADMIN" ? "/inicio" : "/inicio";

        return NextResponse.json({
            success: true,
            redirectTo,
            user: {
                username: user.username,
                nombre: user.nombre,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Error en login:", error);

        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 },
        );
    }
}
