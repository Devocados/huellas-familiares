"use client";
import React, { useEffect, useRef, useState } from "react";
import { FamilyCard } from "./familyCard";
import Xarrow, { Xwrapper } from "react-xarrows";

export interface FamilyMember {
  id: string;
  firstName: string;
  lastName: string;
  relation: string;
  image?: string;
  dob: string;
  dod?: string;
  spouse?: Spouse;
  children: FamilyMember[];
}
export interface Spouse {
  firstName: string;
  lastName: string;
  relation: string;
  dob: string;
  image?: string;
  dod?: string;
}

export const FamilyTree: React.FC = () => {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember>({
    id: "1",
    firstName: "Manuel",
    lastName: "Santos",
    relation: "Parent",
    dob: "01/01/1980",
    dod: "",
    spouse: {
      firstName: "Isabella",
      lastName: "Santos",
      relation: "Spouse",
      dob: "02/14/1982",
      dod: "",
    },
    children: [
      {
        id: "8",
        firstName: "Diego",
        lastName: "Santos",
        relation: "Child",
        dob: "06/15/2005",
        dod: "",
        spouse: {
          firstName: "Camila",
          lastName: "Gomez",
          relation: "Spouse",
          dob: "07/20/2006",
          dod: "",
        },
        children: [
          {
            id: "9",
            firstName: "Sofia",
            lastName: "Santos",
            relation: "Grandchild",
            dob: "01/10/2020",
            dod: "",
            children: [],
          },
          {
            id: "10",
            firstName: "Mateo",
            lastName: "Santos",
            relation: "Grandchild",
            dob: "02/20/2020",
            dod: "",
            children: [],
          },
          {
            id: "11",
            firstName: "Valentina",
            lastName: "Santos",
            relation: "Grandchild",
            dob: "03/30/2020",
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
        dob: "08/05/2007",
        dod: "",
        spouse: {
          firstName: "Lucia",
          lastName: "Lopez",
          relation: "Spouse",
          dob: "09/10/2008",
          dod: "",
        },
        children: [],
      },
      {
        id: "3",
        firstName: "Carmen",
        lastName: "Santos",
        relation: "Child",
        dob: "09/12/2010",
        dod: "",
        children: [
          {
            id: "4",
            firstName: "Nicolas",
            lastName: "Santos",
            relation: "Grandchild",
            dob: "04/15/2015",
            dod: "",
            children: [],
          },
          {
            id: "5",
            firstName: "Renata",
            lastName: "Santos",
            relation: "Grandchild",
            dob: "05/25/2016",
            dod: "",
            children: [],
          },
          {
            id: "6",
            firstName: "Alejandro",
            lastName: "Santos",
            relation: "Grandchild",
            dob: "06/30/2017",
            dod: "",
            children: [],
          },
        ],
      },
    ],
  });

  const refs = useRef<{ [key: string]: React.RefObject<HTMLDivElement> }>({});

  useEffect(() => {
    const populateRefs = (member: FamilyMember) => {
      refs.current[member.id] = refs.current[member.id] || React.createRef();
      member.children.forEach(populateRefs);
    };
    populateRefs(familyMembers);
  }, [familyMembers]);

  const handleDrop = (droppedId: string, onId: string) => {
    if (isDescendant(droppedId, onId)) {
      return;
    }
    const updatedMembers = updateFamilyTree(familyMembers, droppedId, onId);
    setFamilyMembers(updatedMembers);
  };

  const isDescendant = (parentId: string, id: string): boolean => {
    const targetMember = findMember(familyMembers, parentId);
    const checkDescendant = (member: FamilyMember): boolean => {
      if (member.id === id) return true;
      for (const child of member.children || []) {
        if (checkDescendant(child)) return true;
      }
      return false;
    };
    return targetMember ? checkDescendant(targetMember) : false;
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
        { ...droppedMember },
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
    const parentRef = refs.current[member.id];
    return (
      <div
        key={member.id}
        id={member.id}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "20px",
          position: "relative",
        }}
      >
        <div
          ref={parentRef}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <FamilyCard
            id={member.id}
            firstName={member.firstName}
            lastName={member.lastName}
            relation={member.relation}
            onDrop={handleDrop}
            dob={member.dob}
            dod={member.dod}
            image={member.image}
            spouse={member.spouse}
          />
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
                {/* Draw arrows between parent and child */}
                {/* <Xarrow
                    start={member.id} // Parent
                    end={child.id} // Child
                    startAnchor="top"
                    endAnchor="bottom"
                    path="smooth"
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
