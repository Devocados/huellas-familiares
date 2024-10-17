"use client";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ReactNode } from "react";

interface DNDProviderProps {
  children: ReactNode;
}

export default function DNDProvider({ children }: DNDProviderProps) {
  return <DndProvider backend={HTML5Backend}>{children}</DndProvider>;
}
