import Anterior from "@/components/BotonFlechaAnterior";
import BotonGenerico from "@/components/BotonGenerico";
import Link from "next/link";

export default function Inicio() {
    return (
        <div className="min-h-dvh p-3 sm:p-5 flex">
            <div
                className="
                    relative
                    flex-1
                    flex
                    flex-col
                    items-center
                    p-4
                    pt-20
                    sm:p-10
                    border-yellow-300
                    border-4
                    rounded-xl
                    gap-8
                    sm:gap-12
                "
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
                        text-center
                    "
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
                        gap-5
                        md:gap-6
                    "
                >
                    <BotonGenerico
                        href="/apartados/departamentos"
                        alto="50px"
                        ancho="min(100%, 400px)"
                    >
                        Acceder a Departamentos
                    </BotonGenerico>

                    <BotonGenerico
                        href="/apartados/empleados"
                        alto="50px"
                        ancho="min(100%, 400px)"
                    >
                        Acceder a Empleados
                    </BotonGenerico>

                    <BotonGenerico
                        href="/apartados/vehiculos"
                        alto="50px"
                        ancho="min(100%, 400px)"
                    >
                        Acceder a Vehículos
                    </BotonGenerico>
                </div>
            </div>
        </div>
    );
}
