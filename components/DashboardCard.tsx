import Link from "next/link";

interface DashboardCardProps {
  id: string;
  name: string;
  description: string;
  navTo: string;
  isNew?: boolean;
  isProject?: boolean;
}
export const DashboardCard: React.FC<DashboardCardProps> = ({
  id,
  name,
  description,
  navTo,
  isNew,
  isProject = true,
}) => {
  if (isNew)
    return (
      <Link
        className="p-4 m-2 min-w-max flex flex-col bg-violet-400 rounded-xl sm:w-64 hover:cursor-pointer hover:shadow-md hover:shadow-violet-400 hover:scale-105 transition duration-300 ease-in-out"
        href={isProject ? `/projects/new` : `/catalogs/new`}
      >
        <h3 className="text-white text-lg font-bold">
          + Nuovo {isProject ? "Progetto" : "Catalogo"}
        </h3>
        <p className="text-white text-sm mb-4">
          Crea un nuovo {isProject ? "Progetto" : "Catalogo"}
        </p>
      </Link>
    );
  return (
    <Link
      className="p-4 m-2 flex flex-col bg-white rounded-xl w-64 hover:cursor-pointer hover:shadow-md hover:shadow-violet-400 hover:scale-105 transition duration-300 ease-in-out"
      href={navTo as string}
    >
      <h3 className="text-black text-lg font-bold">{name}</h3>
      <p className="text-sm text-gray-500 mb-4">{description}</p>
    </Link>
  );
};