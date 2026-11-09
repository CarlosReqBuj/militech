"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export default function MensajeFlotante({ mensaje }) {
    useEffect(() => {
        if (mensaje) toast.success(mensaje, { id: mensaje });
    }, [mensaje]);

    return null;
}
