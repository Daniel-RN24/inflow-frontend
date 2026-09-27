import { useContext } from "react";
import { ConceptsUiContext } from "../context/ConceptsUiContext";

export function useConcepts() {
  const context = useContext(ConceptsUiContext);

  if (!context) {
    throw new Error(
      "UseConcepts debe usarse dentro de un <ConceptsProvider>",
    );
  }

  return context;
}
