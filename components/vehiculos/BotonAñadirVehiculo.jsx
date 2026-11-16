"use client";

import BotonGenerico from "@/components/BotonGenerico";

export default function BotonAñadirVehiculo() {
    function añadirVehiculo() {
        console.log("Añadir vehiculo");
        alert("Añadir vehiculo");
    }

    return (
        <BotonGenerico onClick={añadirVehiculo}>Añadir vehiculo</BotonGenerico>
    );
}
