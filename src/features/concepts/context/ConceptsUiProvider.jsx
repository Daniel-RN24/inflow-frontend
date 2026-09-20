import { useCallback, useMemo, useState } from "react";
import { ConceptsUiContext } from "./ConceptsUiContext";

const ConceptsUiProvider = ({children}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [mode, setMode] = useState(null);

  const openCreate = useCallback(() => {
    setMode("create");
    setSelected(null);
    setOpen(true);
  }, []);

  const openEdit = useCallback((concept) => {
    setMode("edit");
    setSelected(concept);
    setOpen(true);
  }, []);

  const openDelete = useCallback((concept) => {
    setMode("delete");
    setSelected(concept);
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    setMode(null);
    setSelected(null);
  }, []);

  const value = useMemo(() => {
    {
      (open, mode, selected, openCreate, openEdit, openDelete);
    }
  }, [open, mode, selected, openCreate, openEdit, openDelete, close]);
  
  return (
    <ConceptsUiContext.Provider value={value}>
        {children}
    </ConceptsUiContext.Provider>
  )
};

export default ConceptsUiProvider;
