import jwt from "jsonwebtoken";

const JWT_ISSUER = "militech";
const JWT_AUDIENCE = "militech-app";
const JWT_EXPIRES_IN = "2h";

// Obtener y validar el secreto
function getJwtSecret() {
    const secret = process.env.JWT_SECRET;

    if (!secret || secret.length < 32) {
        throw new Error("JWT_SECRET no está configurado correctamente");
    }

    return secret;
}

// Generar un JWT
export function createToken(user) {
    if (!user || !Number.isSafeInteger(user.id) || user.id <= 0) {
        throw new Error("Identificador de usuario inválido");
    }

    if (!["ADMIN", "EMPLEADO"].includes(user.role)) {
        throw new Error("Rol de usuario inválido");
    }

    if (!user.username || typeof user.username !== "string") {
        throw new Error("Nombre de usuario inválido");
    }

    const payload = {
        username: user.username,
        role: user.role,
    };

    return jwt.sign(payload, getJwtSecret(), {
        algorithm: "HS256",
        expiresIn: JWT_EXPIRES_IN,
        issuer: JWT_ISSUER,
        audience: JWT_AUDIENCE,
        subject: String(user.id),
    });
}

// Verificar un JWT
export function verifyToken(token) {
    try {
        if (typeof token !== "string" || !token) {
            return null;
        }

        const decoded = jwt.verify(token, getJwtSecret(), {
            algorithms: ["HS256"],
            issuer: JWT_ISSUER,
            audience: JWT_AUDIENCE,
        });

        // Comprobar que el contenido sea válido
        if (
            typeof decoded === "string" ||
            !Number.isSafeInteger(Number(decoded.sub)) ||
            Number(decoded.sub) <= 0 ||
            typeof decoded.username !== "string" ||
            !["ADMIN", "EMPLEADO"].includes(decoded.role) ||
            typeof decoded.exp !== "number"
        ) {
            return null;
        }

        return {
            userId: Number(decoded.sub),
            username: decoded.username,
            role: decoded.role,
            exp: decoded.exp,
        };
    } catch {
        // Token incorrecto, manipulado o caducado
        return null;
    }
}
