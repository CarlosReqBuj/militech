"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function crearEmpleado(formData) {
    try {
        const vehiculosIds = formData.getAll("vehiculos").map(Number);

        const idsValidos = vehiculos
            .filter(
                (v) =>
                    v.departamentoId === departamentoId &&
                    vehiculosIds.includes(v.id),
            )
            .map((v) => ({ id: v.id }));

        await prisma.empleado.create({
            data: {
                nombre: formData.get("nombre"),
                apellidos: formData.get("apellidos"),
                alias: formData.get("alias") || null,
                email: formData.get("email"),
                salario: formData.get("salario"),
                activo: formData.get("activo") === "true",
                departamentoId: Number(formData.get("departamentoId")),
                cargoId: Number(formData.get("cargoId")),

                vehiculos: {
                    connect: vehiculosIds,
                },
            },
        });

        revalidatePath("/apartados/empleados");
        return { ok: true };
    } catch (e) {
        console.error("Error al crear empleado:", e);
        return { error: `${e.code ?? "ERROR"}: ${e.message}` };
    }
}

export async function eliminarEmpleado(id) {
    try {
        await prisma.empleado.delete({
            where: { id: Number(id) },
        });

        revalidatePath("/apartados/empleados");
        return { ok: true };
    } catch (e) {
        console.error("Error al eliminar empleado:", e);

        if (e.code === "P2025") {
            return { error: "El empleado ya no existe" };
        }
        return { error: "No se pudo eliminar el empleado" };
    }
}

export async function actualizarEmpleado(id, formData) {
    try {
        const vehiculosIds = formData.getAll("vehiculos").map(Number);

        const idsValidos = vehiculos
            .filter(
                (v) =>
                    v.departamentoId === departamentoId &&
                    vehiculosIds.includes(v.id),
            )
            .map((v) => ({ id: v.id }));

        await prisma.empleado.update({
            where: { id: Number(id) },
            data: {
                nombre: formData.get("nombre"),
                apellidos: formData.get("apellidos"),
                alias: formData.get("alias") || null,
                email: formData.get("email"),
                salario: Number(formData.get("salario")),
                activo: formData.get("activo") === "true",
                departamentoId: Number(formData.get("departamentoId")),
                cargoId: Number(formData.get("cargoId")),

                vehiculos: {
                    set: vehiculosIds,
                },
            },
        });

        revalidatePath("/apartados/empleados");
        revalidatePath(`/apartados/empleados/${id}`);

        return { ok: true };
    } catch (e) {
        console.error("Error al modificar empleado:", e);

        if (e.code === "P2002") {
            return { error: "Ya existe otro empleado con ese email" };
        }

        if (e.code === "P2025") {
            return { error: "El empleado ya no existe" };
        }

        return { error: "No se pudo modificar el empleado" };
    }
}
