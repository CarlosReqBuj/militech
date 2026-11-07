import Anterior from "@/components/botonFlechaAnterior";

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
                <div className="flex flex-1 w-full justify-around">
                    <button
                        className="
                        w-56
                        h-20
                        text-2xl
                        bg-yellow-300
                        hover:bg-yellow-200 
                        rounded-lg 
                        text-black 
                        font-semibold 
                        transition-all 
                        duration-200 
                        hover:shadow-lg hover:shadow-yellow-300/50 active:scale-90"
                    >
                        Acceder a Departamentos
                    </button>
                    <button
                        className="
                        w-56
                        h-20
                        text-2xl
                        bg-yellow-300
                        hover:bg-yellow-200 
                        rounded-lg 
                        text-black 
                        font-semibold 
                        transition-all 
                        duration-200 
                        hover:shadow-lg hover:shadow-yellow-300/50 active:scale-90"
                    >
                        Acceder a Empelados
                    </button>
                    <button
                        className="
                        w-56
                        h-20
                        text-2xl
                        bg-yellow-300
                        hover:bg-yellow-200 
                        rounded-lg 
                        text-black 
                        font-semibold 
                        transition-all 
                        duration-200 
                        hover:shadow-lg hover:shadow-yellow-300/50 active:scale-90"
                    >
                        Acceder a Vehiculos
                    </button>
                </div>
            </div>
        </div>
    );
}
