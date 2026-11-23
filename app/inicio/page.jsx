import Anterior from "@/components/BotonFlechaAnterior";
import BotonGenerico from "@/components/BotonGenerico";
import Link from "next/link";

export default function Inicio() {
    const alto = "50px";
    const ancho = "400px";

    return (
        <div className="p-3 sm:p-5 min-h-dvh flex">
            <div
                className="
                relative 
                flex-1 
                flex 
                flex-col 
                items-center 
                p-6 
                pt-20 
                sm:p-10 
                sm:pt-10 
                border-yellow-300 
                border-4 
                rounded-xl 
                gap-10 
                sm:gap-20"
            >
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                    <Anterior />
                </div>
                <h1
                    className="
                    text-3xl 
                    sm:text-5xl 
                    lg:text-6xl 
                    font-bold 
                    text-yellow-300 
                    text-center"
                >
                    Bienvenido a{" "}
                    <Link
                        href="/apartados/proyectos"
                        className="cursor-default"
                    >
                        Militech
                    </Link>
                </h1>
                <div
                    className="
                    flex 
                    flex-1 
                    w-full 
                    flex-col 
                    md:flex-row 
                    items-center 
                    justify-center 
                    md:justify-around 
                    gap-6"
                >
                    <BotonGenerico
                        href="/apartados/departamentos"
                        alto={alto}
                        ancho={ancho}
                    >
                        Acceder a Departamentos
                    </BotonGenerico>
                    <BotonGenerico
                        href="/apartados/empleados"
                        alto={alto}
                        ancho={ancho}
                    >
                        Acceder a Empleados
                    </BotonGenerico>
                    <BotonGenerico
                        href="/apartados/vehiculos"
                        alto={alto}
                        ancho={ancho}
                    >
                        Acceder a Vehículos
                    </BotonGenerico>
                </div>
            </div>
        </div>
    );
}
