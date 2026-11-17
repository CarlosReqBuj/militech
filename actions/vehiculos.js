"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import path from "node:path";

// ==========================================
// SUBIR IMAGEN A CLOUDINARY
// ==========================================

async function imageUpload(file) {
    try {
        const buffer = Buffer.from(await file.arrayBuffer());

        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    asset_folder: "vehiculos",
                    public_id: `${Date.now()}-${path.parse(file.name).name}`,
                    transformation: [
                        {
                            width: 512,
                            height: 512,
                            crop: "fill",
                            gravity: "auto",
                        },
                    ],
                    invalidate: true,
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                },
            );

            stream.end(buffer);
        });

        return result.secure_url;
    } catch (error) {
        console.error("Error Cloudinary:", error);
        return null;
    }
}

// ==========================================
// VALIDAR FOTOGRAFÍA
// ==========================================

function validarImagen(file) {
    if (!file || file.size === 0) {
        return null;
    }

    if (!file.type.startsWith("image/")) {
        return "El archivo debe ser una imagen";
    }

    if (file.size > 1024 * 1024) {
        return "La imagen no puede superar 1 MB";
    }

    return true;
}

// ==========================================
// CREAR VEHÍCULO
// ==========================================

export async function crearVehiculo(prevState, formData) {
    try {
        const matricula = formData.get("matricula")?.trim().toUpperCase();

        const marca = formData.get("marca")?.trim();
        const modelo = formData.get("modelo")?.trim();
        const tipo = formData.get("tipo")?.trim();

        const departamentoId = Number(formData.get("departamentoId"));

        const operativo = formData.get("operativo") === "on";

        // Validar campos
        if (!matricula || !marca || !modelo || !tipo) {
            return {
                error: "Todos los campos obligatorios deben estar completos",
            };
        }

        if (!Number.isInteger(departamentoId) || departamentoId <= 0) {
            return {
                error: "Selecciona un departamento válido",
            };
        }

        // Comprobar matrícula
        const existente = await prisma.vehiculo.findUnique({
            where: { matricula },
        });

        if (existente) {
            return {
                error: "Ya existe un vehículo con esa matrícula",
            };
        }

        // Procesar fotografía
        let foto = formData.get("foto");

        const validacion = validarImagen(foto);

        if (typeof validacion === "string") {
            return { error: validacion };
        }

        if (validacion === true) {
            foto = await imageUpload(foto);

            if (!foto) {
                return {
                    error: "No se pudo subir la fotografía",
                };
            }
        } else {
            foto = null;
        }

        // Crear vehículo
        const vehiculo = await prisma.vehiculo.create({
            data: {
                matricula,
                marca,
                modelo,
                tipo,
                operativo,
                foto,
                departamentoId,
            },
        });

        console.log("Vehículo creado correctamente:", vehiculo.id);

        revalidatePath("/apartados/vehiculos");

        return {
            type: "success",
            message: "Vehículo registrado correctamente",
        };
    } catch (error) {
        console.error("Error al crear vehículo:", error);

        if (error.code === "P2002") {
            return {
                error: "Ya existe un vehículo con esa matrícula",
            };
        }

        if (error.code === "P2003") {
            return {
                error: "El departamento seleccionado no existe",
            };
        }

        return {
            error: "No se pudo registrar el vehículo. Comprueba los datos.",
        };
    }
}

// ==========================================
// ELIMINAR VEHÍCULO
// ==========================================

export async function eliminarVehiculo(id) {
    try {
        id = Number(id);

        if (!Number.isInteger(id) || id <= 0) {
            return {
                error: "Identificador de vehículo no válido",
            };
        }

        // Comprobar que existe
        const vehiculo = await prisma.vehiculo.findUnique({
            where: { id },
        });

        if (!vehiculo) {
            return {
                error: "El vehículo no existe",
            };
        }

        // Eliminar vehículo
        await prisma.vehiculo.delete({
            where: { id },
        });

        revalidatePath("/apartados/vehiculos");

        return {
            type: "success",
            message: "Vehículo eliminado correctamente",
        };
    } catch (error) {
        console.error("Error al eliminar vehículo:", error);

        if (error.code === "P2025") {
            return {
                error: "El vehículo ya no existe",
            };
        }

        if (error.code === "P2003") {
            return {
                error: "No se puede eliminar el vehículo porque tiene registros relacionados",
            };
        }

        return {
            error: "No se pudo eliminar el vehículo",
        };
    }
}

// ==========================================
// ACTUALIZAR VEHÍCULO
// ==========================================

export async function actualizarVehiculo(id, formData) {
    try {
        id = Number(id);

        if (!Number.isInteger(id) || id <= 0) {
            return {
                error: "Identificador de vehículo no válido",
            };
        }

        const matricula = formData.get("matricula")?.trim().toUpperCase();

        const marca = formData.get("marca")?.trim();
        const modelo = formData.get("modelo")?.trim();
        const tipo = formData.get("tipo")?.trim();

        const departamentoId = Number(formData.get("departamentoId"));

        const operativo = formData.get("operativo") === "on";

        // Validar campos
        if (!matricula || !marca || !modelo || !tipo) {
            return {
                error: "Todos los campos obligatorios deben estar completos",
            };
        }

        if (!Number.isInteger(departamentoId) || departamentoId <= 0) {
            return {
                error: "Selecciona un departamento válido",
            };
        }

        // Comprobar que existe el vehículo
        const vehiculoActual = await prisma.vehiculo.findUnique({
            where: { id },
        });

        if (!vehiculoActual) {
            return {
                error: "El vehículo no existe",
            };
        }

        // Comprobar matrícula duplicada
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

        // Procesar fotografía
        let foto = formData.get("foto");

        const validacion = validarImagen(foto);

        if (typeof validacion === "string") {
            return { error: validacion };
        }

        if (validacion === true) {
            foto = await imageUpload(foto);

            if (!foto) {
                return {
                    error: "No se pudo subir la fotografía",
                };
            }
        } else {
            // Mantener la fotografía anterior
            foto = vehiculoActual.foto;
        }

        // Actualizar vehículo
        await prisma.vehiculo.update({
            where: { id },
            data: {
                matricula,
                marca,
                modelo,
                tipo,
                operativo,
                foto,
                departamentoId,
            },
        });

        revalidatePath("/apartados/vehiculos");
        revalidatePath(`/apartados/vehiculos/${id}`);

        return {
            type: "success",
            message: "Vehículo actualizado correctamente",
        };
    } catch (error) {
        console.error("Error al actualizar vehículo:", error);

        if (error.code === "P2002") {
            return {
                error: "Ya existe otro vehículo con esa matrícula",
            };
        }

        if (error.code === "P2003") {
            return {
                error: "El departamento seleccionado no existe",
            };
        }

        if (error.code === "P2025") {
            return {
                error: "El vehículo ya no existe",
            };
        }

        return {
            error: "No se pudo modificar el vehículo",
        };
    }
}
