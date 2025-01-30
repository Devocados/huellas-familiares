import CreateButton from "@/components/buttons/createButton";
import DNDProvider from "@/components/familyCards/dndProvider";
import { FamilyTree } from "@/components/familyCards/familyTree";


export default function HomePage() {
  return (
    <div>
      <div className=" bg-green-500">
        <h1>Welcome to Huellas Familiares</h1>
      </div>
      <DNDProvider>
        <FamilyTree />
      </DNDProvider>
      <div className="mt-2 flex justify-center">
        <CreateButton />
      </div>
    </div>
  );
}
