export const metadata = {
    title: "Sin conexión | Militech",
};

export default function OfflinePage() {
    return (
        <main className="flex min-h-dvh flex-col items-center justify-center gap-3 px-6 text-center">
            <h1 className="text-3xl font-semibold text-yellow-300">Sin conexión</h1>
            <p>No se puede cargar esta página ahora. Comprueba tu conexión e inténtalo de nuevo.</p>
        </main>
    );
}
