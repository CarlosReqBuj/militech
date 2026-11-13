"use client";

import BotonGenerico from "@/components/BotonGenerico";

export default function BotonAñadirEmpleado() {
    function añadirEmpleado() {
        console.log("Añadir empleado");
        alert("Añadir empleado");
    }

    return (
        <BotonGenerico onClick={añadirEmpleado}>Añadir empleado</BotonGenerico>
    );
}
