import Link from "next/link";
import BotonGenerico from "@/components/botonGenerico";

export default function Home() {
    return (
        <div
            className="
            flex 
            min-h-screen 
            items-center 
            justify-center"
        >
            <div className="flex flex-col items-center">
                <h1
                    className="
                    text-8xl p-6 
                    text-yellow-300 
                    font 
                    font-semibold"
                >
                    Militech
                </h1>
                <BotonGenerico href="/inicio">Entrar</BotonGenerico>
            </div>
        </div>
    );
}
