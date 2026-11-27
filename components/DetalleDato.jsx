const temas = {
    amarillo: {
        contenedor:
            "border-yellow-300 bg-zinc-900 shadow-yellow-300/10 hover:border-yellow-200 hover:shadow-yellow-300/30",
        etiqueta: "text-yellow-300",
        valor: "text-gray-100",
    },
    rojo: {
        contenedor:
            "border-red-600 bg-zinc-900 shadow-red-600/10 hover:border-red-500 hover:shadow-red-600/50",
        etiqueta: "text-red-500",
        valor: "text-gray-100",
    },
};

const estados = {
    correcto: "text-emerald-300",
    alerta: "text-amber-300",
    error: "text-rose-300",
};

export default function DetalleDato({
    etiqueta,
    children,
    tema = "amarillo",
    estado,
}) {
    const estilo = temas[tema] ?? temas.amarillo;

    return (
        <div
            className={`min-w-0 rounded-xl border-2 p-3 shadow-lg transition duration-200 hover:-translate-y-1 sm:p-4 ${estilo.contenedor}`}
        >
            <dt
                className={`text-[0.65rem] font-bold uppercase tracking-[0.16em] sm:text-xs ${estilo.etiqueta}`}
            >
                {etiqueta}
            </dt>
            <dd
                className={`mt-1 break-words text-sm font-medium sm:text-base ${estados[estado] ?? estilo.valor}`}
            >
                {children ?? "Sin información"}
            </dd>
        </div>
    );
}
