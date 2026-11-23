"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/permissions";

function obtenerIdsVehiculos(formData) {
    const valores = formData.getAll("vehiculos");

    const ids = valores.map((valor) => Number(valor));

    if (
        ids.some((id) => !Number.isSafeInteger(id) || id <= 0) ||
        new Set(ids).size !== ids.length
    ) {
        throw new Error("La selección de vehículos no es válida");
    }

    return ids;
}

function obtenerDatosEmpleado(formData) {
    const nombre = formData.get("nombre")?.trim();
    const apellidos = formData.get("apellidos")?.trim();
    const alias = formData.get("alias")?.trim() || null;
    const email = formData.get("email")?.trim().toLowerCase();
    const salarioTexto = formData.get("salario");
    const departamentoId = Number(formData.get("departamentoId"));
    const cargoId = Number(formData.get("cargoId"));
    const activoTexto = formData.get("activo");

    const salario = Number(salarioTexto);

    if (!nombre || !apellidos || !email) {
        throw new Error("Completa los campos obligatorios");
    }

    if (!Number.isFinite(salario) || salario < 0) {
        throw new Error("El salario no es válido");
    }

    if (
        !Number.isSafeInteger(departamentoId) ||
        departamentoId <= 0 ||
        !Number.isSafeInteger(cargoId) ||
        cargoId <= 0
    ) {
        throw new Error("Selecciona un departamento y cargo válidos");
    }

    if (!["true", "false"].includes(activoTexto)) {
        throw new Error("El estado del empleado no es válido");
    }

    return {
        nombre,
        apellidos,
        alias,
        email,
        salario,
        activo: activoTexto === "true",
        departamentoId,
        cargoId,
    };
}

async function validarRelaciones(departamentoId, cargoId, vehiculosIds) {
    const [departamento, cargo, vehiculos] = await Promise.all([
        prisma.departamento.findUnique({
            where: { id: departamentoId },
            select: { id: true },
        }),

        prisma.cargo.findUnique({
            where: { id: cargoId },
            select: { id: true },
        }),

        prisma.vehiculo.findMany({
            where: {
                id: { in: vehiculosIds },
                departamentoId,
            },
            select: { id: true },
        }),
    ]);

    if (!departamento) {
        throw new Error("El departamento seleccionado no existe");
    }

    if (!cargo) {
        throw new Error("El cargo seleccionado no existe");
    }

    if (vehiculos.length !== vehiculosIds.length) {
        throw new Error(
            "Todos los vehículos deben pertenecer al departamento seleccionado",
        );
    }
}

export async function crearEmpleado(formData) {
    try {
        await requireAdmin();

        const datos = obtenerDatosEmpleado(formData);
        const vehiculosIds = obtenerIdsVehiculos(formData);

        await validarRelaciones(
            datos.departamentoId,
            datos.cargoId,
            vehiculosIds,
        );

        await prisma.empleado.create({
            data: {
                ...datos,
                vehiculos: {
                    connect: vehiculosIds.map((id) => ({ id })),
                },
            },
        });

        revalidatePath("/apartados/empleados");

        return { ok: true };
    } catch (error) {
        console.error("Error al crear empleado:", error);

        if (error.message === "UNAUTHORIZED") {
            return { error: "Debes iniciar sesión" };
        }

        if (error.message === "FORBIDDEN") {
            return { error: "No tienes permisos para crear empleados" };
        }

        if (error.code === "P2002") {
            return { error: "Ya existe un empleado con ese email" };
        }

        return {
            error: error.message || "No se pudo crear el empleado",
        };
    }
}

export async function actualizarEmpleado(id, formData) {
    try {
        await requireAdmin();

        id = Number(id);

        if (!Number.isSafeInteger(id) || id <= 0) {
            return { error: "Identificador de empleado no válido" };
        }

        const datos = obtenerDatosEmpleado(formData);
        const vehiculosIds = obtenerIdsVehiculos(formData);

        await validarRelaciones(
            datos.departamentoId,
            datos.cargoId,
            vehiculosIds,
        );

        await prisma.empleado.update({
            where: { id },
            data: {
                ...datos,
                vehiculos: {
                    set: vehiculosIds.map((vehiculoId) => ({
                        id: vehiculoId,
                    })),
                },
            },
        });

        revalidatePath("/apartados/empleados");
        revalidatePath(`/apartados/empleados/${id}`);

        return { ok: true };
    } catch (error) {
        console.error("Error al modificar empleado:", error);

        if (error.message === "UNAUTHORIZED") {
            return { error: "Debes iniciar sesión" };
        }

        if (error.message === "FORBIDDEN") {
            return { error: "No tienes permisos para modificar empleados" };
        }

        if (error.code === "P2002") {
            return { error: "Ya existe otro empleado con ese email" };
        }

        if (error.code === "P2025") {
            return { error: "El empleado ya no existe" };
        }

        return {
            error: error.message || "No se pudo modificar el empleado",
        };
    }
}

export async function eliminarEmpleado(id) {
    try {
        await requireAdmin();

        id = Number(id);

        if (!Number.isSafeInteger(id) || id <= 0) {
            return { error: "Identificador de empleado no válido" };
        }

        await prisma.empleado.delete({
            where: { id },
        });

        revalidatePath("/apartados/empleados");

        return { ok: true };
    } catch (error) {
        console.error("Error al eliminar empleado:", error);

        if (error.message === "UNAUTHORIZED") {
            return { error: "Debes iniciar sesión" };
        }

        if (error.message === "FORBIDDEN") {
            return { error: "No tienes permisos para eliminar empleados" };
        }

        if (error.code === "P2025") {
            return { error: "El empleado ya no existe" };
        }

        return { error: "No se pudo eliminar el empleado" };
    }
}
