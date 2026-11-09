import Anterior from "@/components/BotonFlechaAnterior";
import BotonGenerico from "@/components/BotonGenerico";

export default function Inicio() {
    return (
        <div className="p-5 min-h-screen flex">
            <div className="relative flex-1 flex flex-col items-center p-10 border-yellow-300 border-4 rounded-xl gap-20">
                <div className="absolute top-6 left-6">
                    <Anterior />
                </div>
                <h1 className="text-6xl font-bold text-yellow-300">
                    Bienvenido a Militech
                </h1>
                <div className="flex flex-1 w-full items-center justify-around">
                    <BotonGenerico href="/apartados/departamentos">
                        Acceder a Departamentos
                    </BotonGenerico>
                    <BotonGenerico href="/apartados/empleados">
                        Acceder a Empleados
                    </BotonGenerico>
                    <BotonGenerico href="/apartados/vehiculos">
                        Acceder a Vehículos
                    </BotonGenerico>
                </div>
            </div>
        </div>
    );
}
