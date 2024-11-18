"use client";
import Image from "next/image";
import { useDrag, useDrop } from "react-dnd";
import { Spouse } from "./familyTree";

const ItemTypes = {
  CARD: "card",
};

interface FamilyCardProps {
  id: string;
  firstName: string;
  lastName: string;
  relation: string;
  dob: string;
  dod?: string;
  image?: string;
  spouse?: Spouse;

  onDrop: (droppedId: string, onId: string) => void;
}

export const FamilyCard: React.FC<FamilyCardProps> = ({
  id,
  firstName,
  lastName,
  relation,
  dob,
  dod,
  image,
  spouse,
  onDrop,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item: { id: string }) => {
      onDrop(item.id, id);
    },
  });

  const ref = (node: HTMLDivElement | null) => {
    if (node) {
      drag(node);
      drop(node);
    }
  };

  return (
    <div
      ref={ref}
      className={` flex gap-2 ${isDragging ? "opacity-50" : "opacity-100"}`}
    >
      <div className="bg-[#e9e5d5] cursor-move rounded-lg shadow-md p-4 transition-all duration-200 ease-in-out transform">
        <div className="w-full flex items-center justify-center pb-4">
          <Image
            src={image ? image : "/person-placeholder.png"}
            alt={`${firstName} ${lastName}`}
            width={500}
            height={500}
            className="w-16 h-16 rounded-none object-cover"
          />
        </div>
        <h3 className="text-lg font-semibold">{`${firstName} ${lastName}`}</h3>
        <p className="text-gray-600">{relation}</p>
        <p className="text-sm text-gray-500">DOB: {dob}</p>
        {dod && <p className="text-sm text-gray-500">DOD: {dod}</p>}
      </div>
      {spouse && (
        <div className="bg-[#e9e5d5] cursor-move rounded-lg shadow-md p-4 transition-all duration-200 ease-in-out transform">
          <div className="w-full flex items-center justify-center pb-4">
            <Image
              src={spouse.image ? spouse.image : "/person-placeholder.png"}
              alt={`${spouse.firstName} ${spouse.lastName}`}
              width={500}
              height={500}
              className="w-16 h-16 rounded-none object-cover"
            />
          </div>
          <h3 className="text-lg font-semibold">{`${spouse.firstName} ${spouse.lastName}`}</h3>
          <p className="text-gray-600">{spouse.relation}</p>
          <p className="text-sm text-gray-500">DOB: {spouse.dob}</p>
          {spouse.dod && (
            <p className="text-sm text-gray-500">DOD: {spouse.dod}</p>
          )}
        </div>
      )}
    </div>
  );
};

