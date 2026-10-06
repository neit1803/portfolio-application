"use client";

import { createContext, useContext, type Dispatch, type SetStateAction } from "react";

export const SkillSelectionContext = createContext<{
  selectedSkillId: string | null;
  setSelectedSkillId: Dispatch<SetStateAction<string | null>>;
} | null>(null);

export function useSkillSelection() {
  const context = useContext(SkillSelectionContext);
  if (!context) throw new Error("Skill selection must be inside ScrollExperience");
  return context;
}
