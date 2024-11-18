"use client";
import React, { useState } from "react";
import { FamilyMember } from "../familyCards/familyTree";

const CreateMemberForm = () => {
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

  const [formData, setFormData] = useState({
    parentId: "",
    firstName: "",
    lastName: "",
    dob: "",
    dod: "",
    hasSpouse: false,
    spouseName: "",
    spouseDob: "",
    spouseDod: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox" || type === "radio") {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const getAllFamilyMembers = (members: FamilyMember): FamilyMember[] => {
    let allMembers: FamilyMember[] = [];

    const addMemberToList = (member: FamilyMember) => {
      allMembers.push(member);

      member.children.forEach((child) => {
        addMemberToList(child);
      });
    };
    addMemberToList(members);

    return allMembers;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  const allFamilyMembers = getAllFamilyMembers(familyMembers);
  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="max-w-sm w-full">
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Select Parent
          </label>
          <select
            name="parentId"
            value={formData.parentId}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          >
            <option value="">-- Select Parent --</option>
            {allFamilyMembers.map((member) => (
              <option key={member.id} value={member.id}>
                {member.firstName} {member.lastName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Family Member Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Family Member DOB
          </label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Family Member DOD (optional)
          </label>
          <input
            type="date"
            name="dod"
            value={formData.dod}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Does this family member have a spouse?
          </label>
          <div className="flex items-center mb-4">
            <input
              type="radio"
              name="hasSpouse"
              value="yes"
              checked={formData.hasSpouse}
              onChange={() => setFormData({ ...formData, hasSpouse: true })}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Yes
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="radio"
              name="hasSpouse"
              value="no"
              checked={!formData.hasSpouse}
              onChange={() => setFormData({ ...formData, hasSpouse: false })}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              No
            </label>
          </div>
        </div>
        \{" "}
        {formData.hasSpouse && (
          <>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Spouse Name
              </label>
              <input
                type="text"
                name="spouseName"
                value={formData.spouseName}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Spouse DOB
              </label>
              <input
                type="date"
                name="spouseDob"
                value={formData.spouseDob}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Spouse DOD (optional)
              </label>
              <input
                type="date"
                name="spouseDod"
                value={formData.spouseDod}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateMemberForm;
