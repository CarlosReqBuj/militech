import { prisma } from "@/lib/prisma";
import { List } from "@/components/simpleui";
import { CardEmpleado } from "@/components/CardEmpleado";

export default async function ListaEmpleados() {
    const empleadosDB = await prisma.empleado.findMany({});

    const empleados = empleadosDB.map((e) => ({
        ...e,
        salario: e.salario.toNumber(),
    }));

    return (
        <>
            <List
                card={CardEmpleado}
                data={empleados}
                columns={[
                    { name: "nombre", label: "Nombre" },
                    { name: "apellidos", label: "Apellidos" },
                    { name: "alias", label: "Alias" },
                    { name: "email", label: "Email" },
                ]}
                sort="nombre"
                direction="asc"
            >
                <div className="text-xl font-bold">Lista empleados</div>
            </List>
        </>
    );
}
