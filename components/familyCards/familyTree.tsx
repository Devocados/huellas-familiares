"use client";
import React, { useState } from "react";
import { FamilyCard } from "./familyCard";

interface FamilyMember {
  id: string;
  firstName: string;
  lastName: string;
  relation: string;
  image?: string;
  dob: string;
  dod?: string;
  spouse?: {
    id: string;
    firstName: string;
    lastName: string;
    relation: string;
    dob: string;
    dod?: string;
    image?:string;
  };
  children: FamilyMember[];
}

export const FamilyTree: React.FC = () => {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember>({
    id: "1",
    firstName: "Manuel",
    lastName: "Santos",
    relation: "Parent",
    dob: "1980-01-01",
    dod: "",
    spouse: {
        id: "12",
      firstName: "Isabella",
      lastName: "Santos",
      relation: "Spouse",
      dob: "1982-02-14",
      dod: "",
    },
    children: [
      {
        id: "8",
        firstName: "Diego",
        lastName: "Santos",
        relation: "Child",
        dob: "2005-06-15",
        dod: "",
        spouse: {
         id: "13",
          firstName: "Camila",
          lastName: "Gomez",
          relation: "Spouse",
          dob: "2006-07-20",
          dod: "",
        },
        children: [
          {
            id: "9",
            firstName: "Sofia",
            lastName: "Santos",
            relation: "Grandchild",
            dob: "2020-01-10",
            dod: "",
            children: [],
          },
          {
            id: "10",
            firstName: "Mateo",
            lastName: "Santos",
            relation: "Grandchild",
            dob: "2020-02-20",
            dod: "",
            children: [],
          },
          {
            id: "11",
            firstName: "Valentina",
            lastName: "Santos",
            relation: "Grandchild",
            dob: "2020-03-30",
            dod: "",
            children: [],
          },
        ],
      },
      {
        id: "2",
        firstName: "Alejandro",
        lastName: "Santos",
        relation: "Child",
        dob: "2007-08-05",
        dod: "",
        spouse: {
            id: "14",
          firstName: "Lucia",
          lastName: "Lopez",
          relation: "Spouse",
          dob: "2008-09-10",
          dod: "",
        },
        children: [],
      },
      {
        id: "3",
        firstName: "Carmen",
        lastName: "Santos",
        relation: "Child",
        dob: "2010-09-12",
        dod: "",
        children: [
          {
            id: "4",
            firstName: "Nicolas",
            lastName: "Santos",
            relation: "Grandchild",
            dob: "2015-04-15",
            dod: "",
            children: [],
          },
          {
            id: "5",
            firstName: "Renata",
            lastName: "Santos",
            relation: "Grandchild",
            dob: "2016-05-25",
            dod: "",
            children: [],
          },
          {
            id: "6",
            firstName: "Diego",
            lastName: "Santos",
            relation: "Grandchild",
            dob: "2017-06-30",
            dod: "",
            children: [],
          },
        ],
      },
    ],
  });
  const handleDrop = (droppedId: string, onId: string) => {
    const updatedMembers = updateFamilyTree(familyMembers, droppedId, onId);

    setFamilyMembers(updatedMembers);
  };

  const updateFamilyTree = (
    members: FamilyMember,
    droppedId: string,
    onId: string
  ) => {
    const updatedMembers = JSON.parse(JSON.stringify(members));

    const droppedMember = findMember(updatedMembers, droppedId);
    const targetMember = findMember(updatedMembers, onId);

    if (droppedMember && targetMember) {
      const previousParent = findParent(updatedMembers, droppedId);
      if (previousParent) {
        previousParent.children = previousParent.children.filter(
          (child) => child.id !== droppedId
        );
      }
      const updatedDroppedMember = { ...droppedMember };

    targetMember.children = [
      ...(targetMember.children || []),
      { ...droppedMember, spouse: undefined }, 
    ];
    }
    return updatedMembers;
  };

  const findParent = (
    member: FamilyMember,
    childId: string
  ): FamilyMember | null => {
    for (const child of member.children || []) {
      if (child.id === childId) return member;
      const foundParent = findParent(child, childId);
      if (foundParent) return foundParent;
    }
    return null;
  };

  const findMember = (
    member: FamilyMember,
    id: string
  ): FamilyMember | null => {
    if (member.id === id) return member;
    for (const child of member.children || []) {
      const found = findMember(child, id);
      if (found) return found;
    }
    return null;
  };

  const renderFamilyTree = (member: FamilyMember) => {
    return (
      <div
        key={member.id}
        id={member.id}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "20px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <FamilyCard
            id={member.id}
            firstName={member.firstName}
            lastName={member.lastName}
            relation={member.relation}
            onDrop={handleDrop}
            dob={member.dob}
            dod={member.dod}
            image={member.image}
          />
          {member.spouse && (
            <FamilyCard
              id={member.spouse.id}
              firstName={member.spouse.firstName}
              lastName={member.spouse.lastName}
              relation={member.spouse.relation}
              onDrop={handleDrop}
              dob={member.spouse.dob}
              dod={member.spouse.dod}
              image={member.spouse.image}
            />
          )}
        </div>

        {member.children && member.children.length > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            {member.children.map((child) => (
              <div key={child.id} style={{ position: "relative" }}>
                {renderFamilyTree(child)}

                {/* Draw line between parent and child */}
                {/* <Xarrow
                  start={member.id} 
                  end={child.id}
                  color="blue" 
                  strokeWidth={2} 
                /> */}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="relative" style={{ padding: "20px" }}>
      {renderFamilyTree(familyMembers)}
    </div>
  );
};
