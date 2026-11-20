import AnteriorRojo from "@/components/BotonFlechaAnteriorRojo";

export default function Inicio() {
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
                border-red-600 
                border-4 
                rounded-xl 
                gap-10 
                sm:gap-20"
            >
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                    <AnteriorRojo />
                </div>
                <h1
                    className="
                    text-3xl 
                    sm:text-5xl 
                    lg:text-6xl 
                    font-bold 
                    text-red-600 
                    text-center"
                >
                    Proyectos
                </h1>
            </div>
        </div>
    );
}
