export default function TarjetaEntidad({
    titulo,
    subtitulo,
    etiqueta,
    detalles = [],
}) {
    return (
        <article className="flex min-w-0 flex-col gap-3 rounded-xl border-4 border-yellow-300 bg-zinc-900 p-5 text-white shadow-sm">
            {etiqueta && (
                <span className="self-start rounded-full border-2 border-yellow-300 px-3 py-1 text-xs font-bold uppercase tracking-wide text-yellow-300">
                    {etiqueta}
                </span>
            )}

            <h3 className="text-2xl font-bold text-yellow-300">{titulo}</h3>

            {subtitulo && <p className="text-sm text-zinc-300">{subtitulo}</p>}

            {detalles.length > 0 && (
                <dl className="mt-3 grid gap-2">
                    {detalles.map(({ etiqueta, valor }) => (
                        <div
                            key={etiqueta}
                            className="flex justify-between gap-4 border-b border-zinc-700 py-2 text-sm"
                        >
                            <dt className="font-medium text-zinc-400">
                                {etiqueta}
                            </dt>

                            <dd className="text-right font-semibold text-white">
                                {valor ?? "—"}
                            </dd>
                        </div>
                    ))}
                </dl>
            )}
        </article>
    );
}
