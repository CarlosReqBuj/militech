"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function crearEmpleado(formData) {
    try {
        const vehiculosIds = formData.getAll("vehiculos").map(Number);
        const departamentoId = Number(formData.get("departamentoId"));

        const vehiculos = await prisma.vehiculo.findMany({
            where: {
                id: { in: vehiculosIds },
                departamentoId,
            },
            select: { id: true },
        });

        if (vehiculos.length !== new Set(vehiculosIds).size) {
            return {
                error: "Hay vehículos que no pertenecen a este departamento",
            };
        }

        await prisma.empleado.create({
            data: {
                nombre: formData.get("nombre"),
                apellidos: formData.get("apellidos"),
                alias: formData.get("alias") || null,
                email: formData.get("email"),
                salario: Number(formData.get("salario")),
                activo: formData.get("activo") === "true",
                departamentoId,
                cargoId: Number(formData.get("cargoId")),

                vehiculos: {
                    connect: vehiculos.map((v) => ({ id: v.id })),
                },
            },
        });

        revalidatePath("/apartados/empleados");
        return { ok: true };
    } catch (e) {
        console.error("Error al crear empleado:", e);

        if (e.code === "P2002") {
            return { error: "Ya existe un empleado con ese email" };
        }

        return { error: "No se pudo crear el empleado" };
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
        const departamentoId = Number(formData.get("departamentoId"));

        // Filtrar vehículos del mismo departamento
        const vehiculos = await prisma.vehiculo.findMany({
            where: {
                id: { in: vehiculosIds },
                departamentoId,
            },
            select: { id: true },
        });

        if (vehiculos.length !== new Set(vehiculosIds).size) {
            return {
                error: "Hay vehículos que no pertenecen a este departamento",
            };
        }

        await prisma.empleado.update({
            where: { id: Number(id) },
            data: {
                nombre: formData.get("nombre"),
                apellidos: formData.get("apellidos"),
                alias: formData.get("alias") || null,
                email: formData.get("email"),
                salario: Number(formData.get("salario")),
                activo: formData.get("activo") === "true",
                departamentoId,
                cargoId: Number(formData.get("cargoId")),

                vehiculos: {
                    set: vehiculos.map((v) => ({ id: v.id })),
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
            return {
                error: "El empleado o alguno de los registros relacionados no existe",
            };
        }

        return { error: "No se pudo modificar el empleado" };
    }
}
