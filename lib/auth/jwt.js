import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("Falta configurar JWT_SECRET");
}

export function createToken(user) {
    return jwt.sign(
        {
            userId: user.id,
            username: user.username,
            role: user.role,
        },
        JWT_SECRET,
        {
            expiresIn: "2h",
            algorithm: "HS256",
        },
    );
}

export function verifyToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET, {
            algorithms: ["HS256"],
        });
    } catch {
        return null;
    }
}
