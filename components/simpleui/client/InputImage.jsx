"use client";

import { useRef, useState } from "react";

const defaultImage =
    "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTIwIDEyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgZmlsbD0iI0VGRjFGMyIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMzMuMjUwMyAzOC40ODE2QzMzLjI2MDMgMzcuMDQ3MiAzNC40MTk5IDM1Ljg4NjQgMzUuODU0MyAzNS44NzVIODMuMTQ2M0M4NC41ODQ4IDM1Ljg3NSA4NS43NTAzIDM3LjA0MzEgODUuNzUwMyAzOC40ODE2VjgwLjUxODRDODUuNzQwMyA4MS45NTI4IDg0LjU4MDcgODMuMTEzNiA4My4xNDYzIDgzLjEyNUgzNS44NTQzQzM0LjQxNTggODMuMTIzNiAzMy4yNTAzIDgxLjk1NyAzMy4yNTAzIDgwLjUxODRWMzguNDgxNlpNODAuNTAwNiA0MS4xMjUxSDM4LjUwMDZWNzcuODc1MUw2Mi44OTIxIDUzLjQ3ODNDNjMuOTE3MiA1Mi40NTM2IDY1LjU3ODggNTIuNDUzNiA2Ni42MDM5IDUzLjQ3ODNMODAuNTAwNiA2Ny40MDEzVjQxLjEyNTFaTTQzLjc1IDUxLjYyNDlDNDMuNzUgNTQuNTI0NCA0Ni4xMDA1IDU2Ljg3NDkgNDkgNTYuODc0OUM1MS44OTk1IDU2Ljg3NDkgNTQuMjUgNTQuNTI0NCA1NC4yNSA1MS42MjQ5QzU0LjI1IDQ4LjcyNTQgNTEuODk5NSA0Ni4zNzQ5IDQ5IDQ2LjM3NDlDNDYuMTAwNSA0Ni4zNzQ5IDQzLjc1IDQ4LjcyNTQgNDMuNzUgNTEuNjI0OVoiIGZpbGw9IiM2ODc3ODciLz48L3N2Zz4=";

const MAX_SIZE = 1024 * 1024;

export function InputImage({
    label = "Fotografía del vehículo",
    name = "foto",
    value,
    width = 320,
    height = 200,
    disabled = false,
    className = "",
}) {
    const inputRef = useRef(null);
    const [preview, setPreview] = useState(value || defaultImage);

    function seleccionarArchivo(file) {
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Selecciona un archivo de imagen válido");
            return;
        }

        if (file.size > MAX_SIZE) {
            alert("La imagen no puede superar 1 MB");
            inputRef.current.value = "";
            return;
        }

        const reader = new FileReader();

        reader.onload = (e) => {
            setPreview(e.target.result);
        };

        reader.readAsDataURL(file);
    }

    function handleChange(e) {
        seleccionarArchivo(e.target.files?.[0]);
    }

    function handleDrop(e) {
        e.preventDefault();

        if (disabled) return;

        const file = e.dataTransfer.files?.[0];

        if (!file) return;

        seleccionarArchivo(file);

        // Guardar el archivo en el input para enviarlo con FormData
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        inputRef.current.files = dataTransfer.files;
    }

    return (
        <div className={`my-4 flex flex-col gap-2 ${className}`}>
            <span className="text-sm font-medium text-gray-300">{label}</span>

            <div
                className="relative inline-block w-fit cursor-pointer overflow-hidden rounded-xl border-2 border-dashed border-yellow-300/60 hover:border-yellow-300"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
            >
                <img
                    src={preview}
                    alt="Vista previa del vehículo"
                    width={width}
                    height={height}
                    onClick={() => !disabled && inputRef.current?.click()}
                    className="rounded-xl object-cover"
                    style={{
                        width,
                        height,
                        opacity: disabled ? 0.5 : 1,
                    }}
                />

                {!disabled && (
                    <div
                        onClick={() => inputRef.current?.click()}
                        className="absolute inset-0 flex items-center justify-center bg-black/40 text-center text-sm font-semibold text-white opacity-0 transition hover:opacity-100"
                    >
                        Cambiar fotografía
                    </div>
                )}

                <input
                    ref={inputRef}
                    type="file"
                    name={name}
                    accept="image/*"
                    disabled={disabled}
                    onChange={handleChange}
                    className="hidden"
                />
            </div>

            <p className="text-xs text-gray-500">
                Haz clic o arrastra una imagen aquí. Máximo 1 MB.
            </p>
        </div>
    );
}
