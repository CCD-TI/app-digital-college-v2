// BottomSheetContext.tsx
import React, { createContext, useContext, useRef, ReactNode } from "react";
import BottomSheetMethods from "@gorhom/bottom-sheet";

interface BottomSheetContextType {
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
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
