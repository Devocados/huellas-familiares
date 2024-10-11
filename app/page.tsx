import CreateButton from "@/components/buttons/createButton";
import DNDProvider from "@/components/familyCards/dndProvider";
import { FamilyTree } from "@/components/familyCards/familyTree";


export default function HomePage() {
  return (
    <div>
      <h1>Welcome to Huellas Familiares</h1>
      <DNDProvider>
        <FamilyTree />
      </DNDProvider>
      <div className="mt-2 flex justify-center">
        <CreateButton />
      </div>
    </div>
  );
}
