import { createContext, useContext, useState } from "react";
import { getPondData, pondNames } from "../data/ponds";

var PondContext = createContext(null);

export function PondProvider({ children }) {
  var [selectedPond, setSelectedPond] = useState(pondNames[0]);
  var data = getPondData(selectedPond);
  return (
    <PondContext.Provider value={{ selectedPond, setSelectedPond, pondNames, data }}>
      {children}
    </PondContext.Provider>
  );
}

export function usePond() {
  var ctx = useContext(PondContext);
  if (!ctx) throw new Error("usePond must be used within PondProvider");
  return ctx;
}
