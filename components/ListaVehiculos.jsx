import { prisma } from "@/lib/prisma";
import { CardVehiculo } from "@/components/CardVehiculo";
import { List } from "@/components/simpleui";

export default async function ListaVehiculos({ departamentoId, empleadoId }) {
    const vehiculos = await prisma.vehiculo.findMany({
        where: {
            departamentoId,
            empleados: empleadoId ? { some: { id: empleadoId } } : undefined,
        },
    });

    return (
        <>
            <List
                card={CardVehiculo}
                data={vehiculos}
                columns={[
                    { name: "matricula", label: "Matricula" },
                    { name: "marca", label: "Marca" },
                    { name: "modelo", label: "Modelo" },
                ]}
                sort="matricula"
                direction="asc"
            >
                <div className="text-xl font-bold">Lista vehiculos</div>
            </List>
        </>
    );
}
