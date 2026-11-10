import { prisma } from "@/lib/prisma";
import { List } from "@/components/simpleui";
import { CardDepartamento } from "@/components/CardDepartamento";

export default async function ListaDepartamentos() {
    const departamentos = await prisma.departamento.findMany({});

    return (
        <>
            <List
                card={CardDepartamento}
                data={departamentos}
                columns={[{ name: "nombre", label: "Nombre" }]}
                sort="nombre"
                direction="asc"
            >
                <div className="text-xl font-bold">Lista departamentos</div>
            </List>
        </>
    );
}
