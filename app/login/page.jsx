import Anterior from "@/components/BotonFlechaAnterior";
import BotonGenerico from "@/components/BotonGenerico";

const inputClase = `
    w-full rounded-lg border-2 border-yellow-300
    bg-neutral-900 px-4 py-3
    text-sm sm:text-base text-gray-200
    placeholder:text-gray-500
    outline-none transition-all duration-200
    focus:border-yellow-300
    focus:ring-2 focus:ring-yellow-300
`;

const labelClase = `
    flex flex-col gap-2
    text-sm sm:text-base font-medium
    text-gray-300
`;

export default function Login() {
    return (
        <main
            className="
            min-h-dvh bg-transparent
            p-3 sm:p-5 flex items-center justify-center"
        >
            <div
                className="
                relative flex-1 min-h-[calc(100dvh-1.5rem)]
                sm:min-h-[calc(100dvh-2.5rem)]
                flex flex-col items-center justify-center
                border-yellow-300 border-4
                rounded-xl p-6 sm:p-10
            "
            >
                <Anterior />

                <div
                    className="
                    flex flex-col items-center
                    text-center gap-3 mb-10
                "
                >
                    <h1
                        className="
                        text-3xl sm:text-5xl
                        font-bold text-yellow-300
                    "
                    >
                        Iniciar sesión
                    </h1>
                </div>

                <section
                    className="
                    w-full max-w-md
                    rounded-xl border-2
                    border-yellow-300
                    p-5 sm:p-8
                "
                >
                    <form className="flex flex-col gap-6">
                        <label className={labelClase}>
                            Usuario
                            <div className="relative">
                                <input
                                    name="usuario"
                                    type="text"
                                    required
                                    autoComplete="username"
                                    placeholder="Introduce tu usuario"
                                    className={inputClase}
                                />
                            </div>
                        </label>

                        <label className={labelClase}>
                            Contraseña
                            <div className="relative">
                                <input
                                    name="contrasena"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    placeholder="Introduce tu contraseña"
                                    className={inputClase}
                                />
                            </div>
                        </label>

                        <div className="pt-2">
                            <BotonGenerico type="submit" className="w-full">
                                Acceder
                            </BotonGenerico>
                        </div>
                    </form>
                </section>
            </div>
        </main>
    );
}
