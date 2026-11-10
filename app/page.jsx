import BotonGenerico from "@/components/BotonGenerico";

export default function Home() {
    return (
        <div
            className="
            flex 
            min-h-dvh 
            items-center 
            justify-center 
            px-4"
        >
            <div className="flex flex-col items-center">
                <h1
                    className="
                    text-5xl 
                    sm:text-7xl 
                    lg:text-8xl 
                    p-4 
                    sm:p-6 
                    text-yellow-300 
                    font-semibold 
                    text-center 
                    break-words"
                >
                    Militech
                </h1>
                <BotonGenerico href="/inicio">Entrar</BotonGenerico>
            </div>
        </div>
    );
}
