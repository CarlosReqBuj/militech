import Link from "next/link";

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
                <Link href={"/inicio"}>
                    <button
                        className="
                        w-48
                        h-14
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
                        Entrar
                    </button>
                </Link>
            </div>
        </div>
    );
}
