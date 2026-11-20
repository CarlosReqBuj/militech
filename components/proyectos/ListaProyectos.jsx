import { prisma } from "@/lib/prisma";
import { ListRojo } from "@/components/ListRojo";
import CardProyecto from "./CardProyecto";

export default async function ListaProyectos() {
    const proyectos = await prisma.proyecto.findMany({
        include: {
            departamento: { select: { nombre: true } },
            _count: { select: { empleados: true } },
        },
    });

    const data = proyectos.map((p) => ({
        id: p.id,
        codigo: p.codigo,
        nombre: p.nombre,
        descripcion: p.descripcion,
        estado: p.estado,
        nivelSecreto: p.nivelSecreto,
        presupuesto: Number(p.presupuesto),
        fechaInicio: p.fechaInicio.toLocaleDateString("es-ES"),
        departamento: p.departamento.nombre,
        empleados: p._count.empleados,
    }));

    return (
        <ListRojo
            prefix="proyectos"
            data={data}
            card={CardProyecto}
            sort="codigo"
            columns={[
                { name: "codigo", label: "Código" },
                { name: "nombre", label: "Nombre" },
                { name: "estado", label: "Estado" },
                { name: "nivelSecreto", label: "Nivel" },
                { name: "departamento", label: "Departamento" },
                { name: "presupuesto", label: "Presupuesto" },
            ]}
        />
    );
}
