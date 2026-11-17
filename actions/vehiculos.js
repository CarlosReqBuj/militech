"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function crearVehiculo(formData) {
    try {
        const matricula = formData.get("matricula")?.trim().toUpperCase();

        const existente = await prisma.vehiculo.findUnique({
            where: { matricula },
        });

        if (existente) {
            return {
                error: "Ya existe un vehículo con esa matrícula",
            };
        }

        await prisma.vehiculo.create({
            data: {
                matricula,
                marca: formData.get("marca"),
                modelo: formData.get("modelo"),
                tipo: formData.get("tipo"),
                operativo: formData.get("operativo") === "on",
                foto: formData.get("foto") || null,
                departamentoId: Number(formData.get("departamentoId")),
            },
        });

        revalidatePath("/apartados/vehiculos");
        return { ok: true };
    } catch (e) {
        console.error("Error al crear vehículo:", e);

        if (e.code === "P2002") {
            return { error: "Ya existe un vehículo con esa matrícula" };
        }

        return { error: `${e.code ?? "ERROR"}: ${e.message}` };
    }
}

export async function eliminarVehiculo(id) {
    try {
        await prisma.vehiculo.delete({
            where: { id: Number(id) },
        });

        revalidatePath("/apartados/vehiculos");
        return { ok: true };
    } catch (e) {
        console.error("Error al eliminar vehículo:", e);

        if (e.code === "P2025") {
            return { error: "El vehículo ya no existe" };
        }

        return { error: "No se pudo eliminar el vehículo" };
    }
}

export async function actualizarVehiculo(id, formData) {
    try {
        const matricula = formData.get("matricula")?.trim().toUpperCase();

        const existente = await prisma.vehiculo.findFirst({
            where: {
                matricula,
                NOT: {
                    id: Number(id),
                },
            },
        });

        if (existente) {
            return {
                error: "Ya existe otro vehículo con esa matrícula",
            };
        }

        await prisma.vehiculo.update({
            where: { id: Number(id) },
            data: {
                matricula,
                marca: formData.get("marca"),
                modelo: formData.get("modelo"),
                tipo: formData.get("tipo"),
                operativo: formData.get("operativo") === "on",
                foto: formData.get("foto") || null,
                departamentoId: Number(formData.get("departamentoId")),
            },
        });

        revalidatePath("/apartados/vehiculos");
        revalidatePath(`/apartados/vehiculos/${id}`);

        return { ok: true };
    } catch (e) {
        console.error("Error al modificar vehículo:", e);

        if (e.code === "P2002") {
            return { error: "Ya existe otro vehículo con esa matrícula" };
        }

        if (e.code === "P2025") {
            return { error: "El vehículo ya no existe" };
        }

        return { error: "No se pudo modificar el vehículo" };
    }
}
