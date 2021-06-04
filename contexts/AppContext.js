import React, { useContext, createContext, useState, useEffect } from "react";
import { searchFetcher, removeFetcher, addFetcher } from "../hooks/fetchers";

//Context
export const AppContext = createContext(null);

//Provider
export const AppContextProvider = ({ children }) => {
  
  //MODAL VARIABLES
  const [tool, setTool] = useState({
    title: "",
    link: "",
    description: "",
    tags: [],
  });
  
  const [id, setId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [shouldShowModal, setShouldShowModal] = useState(false);
  const [allFieldValidated, setAllFieldValidated] = useState(false);
  
  const [tools, setTools] = useState([]);
  const [searchByTag, setSearchByTag] = useState(false);


  const toggleSearchByTag = () => {
    setSearchByTag(searchByTag === true ? false : true);
  };

  const showAddModal = () => {
    setIsAdding(true);
    setShouldShowModal(true);
  };

  const showRemoveModal = (id) => {
    setShouldShowModal(true);
    setIsAdding(false);
    setId(id);
  };

  useEffect(() => {
    const keyboardEvent = (e) => {
      switch (e.keyCode) {
        case 27:
          setShouldShowModal(false);
          break;

        case 13:
          shouldShowModal && allFieldValidated && setShouldShowModal(false);
          break;
      }
    };
    window.addEventListener("keydown", keyboardEvent);
    return () => window.removeEventListener("keydown", keyboardEvent);
  }, [shouldShowModal, setShouldShowModal]);

  //
  const values = React.useMemo(
    () => ({
      //states
      id,
      tool,
      tools,
      isAdding,
      shouldShowModal,
      allFieldValidated,
      // setstates
      setId,
      setTool,
      setTools,
      setIsAdding,
      setSearchByTag,
      setShouldShowModal,
      setShouldShowModal,
      setAllFieldValidated,

      //functions
      addFetcher,
      showAddModal,
      searchFetcher,
      removeFetcher,
      showRemoveModal,
      toggleSearchByTag,
    }),
    [id, isAdding, shouldShowModal, searchByTag, tools, tool, allFieldValidated]
  );

  // Interface donde será expuesto como proveedor y envolverá la App.
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

//
export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    console.error("Error deploying App Context!!!");
  }

  return context;
}

export default useAppContext;
