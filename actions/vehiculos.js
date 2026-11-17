"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import path from "node:path";

async function imageUpload(file) {
    try {
        const buffer = Buffer.from(await file.arrayBuffer());

        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    invalidate: true,
                    asset_folder: "vehiculos",
                    public_id: path.parse(file.name).name,
                    width: 512,
                    height: 512,
                    crop: "fill",
                    gravity: "auto",
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                },
            );

            stream.end(buffer);
        });

        console.log("URL de Cloudinary:", result.secure_url);

        return result.secure_url;
    } catch (error) {
        console.error("Error al subir imagen:", error);
        return null;
    }
}

// Crear vehículo
export async function crearVehiculo(prevState, formData) {
    try {
        const matricula = formData.get("matricula")?.trim().toUpperCase();

        const existente = await prisma.vehiculo.findUnique({
            where: { matricula },
        });

        if (existente) {
            return { error: "Ya existe un vehículo con esa matrícula" };
        }

        let foto = formData.get("foto");

        if (foto && foto.size > 0) {
            foto = await imageUpload(foto);

            if (!foto) {
                return { error: "No se pudo subir la fotografía" };
            }
        } else {
            foto = null;
        }

        await prisma.vehiculo.create({
            data: {
                matricula,
                marca: formData.get("marca"),
                modelo: formData.get("modelo"),
                tipo: formData.get("tipo"),
                operativo: formData.get("operativo") === "on",
                foto,
                departamentoId: Number(formData.get("departamentoId")),
            },
        });

        revalidatePath("/apartados/vehiculos");

        return {
            type: "success",
            message: "Vehículo registrado correctamente",
        };
    } catch (e) {
        console.error("Error al crear vehículo:", e);

        if (e.code === "P2002") {
            return { error: "Ya existe un vehículo con esa matrícula" };
        }

        return { error: "No se pudo registrar el vehículo" };
    }
}

// Eliminar vehículo
export async function eliminarVehiculo(prevState, formData) {
    try {
        const id = Number(formData.get("id"));

        await prisma.vehiculo.delete({
            where: { id },
        });

        revalidatePath("/apartados/vehiculos");

        return {
            type: "success",
            message: "Vehículo eliminado correctamente",
        };
    } catch (e) {
        console.error("Error al eliminar vehículo:", e);

        if (e.code === "P2025") {
            return { error: "El vehículo ya no existe" };
        }

        return { error: "No se pudo eliminar el vehículo" };
    }
}

// Actualizar vehículo

export async function actualizarVehiculo(id, formData) {
    try {
        id = Number(id);

        const matricula = formData.get("matricula")?.trim().toUpperCase();

        // Comprobar que la matrícula no pertenece a otro vehículo
        const existente = await prisma.vehiculo.findFirst({
            where: {
                matricula,
                id: {
                    not: id,
                },
            },
        });

        if (existente) {
            return {
                error: "Ya existe otro vehículo con esa matrícula",
            };
        }

        let foto = formData.get("foto");

        // Subir únicamente si se ha seleccionado una fotografía nueva
        if (foto && foto.size > 0) {
            if (!foto.type.startsWith("image/")) {
                return { error: "El archivo debe ser una imagen" };
            }

            if (foto.size > 1024 * 1024) {
                return { error: "La imagen no puede superar 1 MB" };
            }

            foto = await imageUpload(foto);

            if (!foto) {
                return {
                    error: "No se pudo subir la fotografía",
                };
            }
        } else {
            foto = undefined;
        }

        await prisma.vehiculo.update({
            where: { id },
            data: {
                matricula,
                marca: formData.get("marca"),
                modelo: formData.get("modelo"),
                tipo: formData.get("tipo"),
                operativo: formData.get("operativo") === "on",
                ...(foto !== undefined && { foto }),
                departamentoId: Number(formData.get("departamentoId")),
            },
        });

        revalidatePath("/apartados/vehiculos");
        revalidatePath(`/apartados/vehiculos/${id}`);

        return {
            type: "success",
            message: "Vehículo actualizado correctamente",
        };
    } catch (e) {
        console.error("Error al actualizar vehículo:", e);

        if (e.code === "P2002") {
            return {
                error: "Ya existe otro vehículo con esa matrícula",
            };
        }

        if (e.code === "P2025") {
            return { error: "El vehículo ya no existe" };
        }

        return { error: "No se pudo modificar el vehículo" };
    }
}
