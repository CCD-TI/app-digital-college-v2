// BottomSheetContext.tsx
import BottomSheetMethods from "@gorhom/bottom-sheet";
import React, { createContext, ReactNode, useContext, useRef } from "react";

interface BottomSheetContextType {
  bottomSheetRef: React.RefObject<BottomSheetMethods | null>;
}

const BottomSheetContext = createContext<BottomSheetContextType | null>(null);

export const BottomSheetProvider = ({ children }: { children: ReactNode }) => {
  const bottomSheetRef = useRef<BottomSheetMethods>(null);

  return (
    <BottomSheetContext.Provider value={{ bottomSheetRef }}>
      {children}
    </BottomSheetContext.Provider>
  );
};

export const useBottomSheet = (): BottomSheetContextType => {
  const context = useContext(BottomSheetContext);
  if (!context) {
    throw new Error(
      "useBottomSheet debe usarse dentro de un BottomSheetProvider"
    );
  }
  return context;
};
