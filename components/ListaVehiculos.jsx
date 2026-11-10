import { prisma } from "@/lib/prisma";
import { CardVehiculo } from "@/components/CardVehiculo";
import { List } from "@/components/simpleui";

export default async function ListaVehiculos() {
    const vehiculos = await prisma.vehiculo.findMany({});

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
                <div className="text-xl font-bold">Lista empleados</div>
            </List>
        </>
    );
}
