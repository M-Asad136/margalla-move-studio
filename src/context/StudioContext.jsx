import { createContext, useContext, useEffect, useState } from "react";
import { loadClasses } from "../api/classesApi.js";

const StudioContext = createContext(null);

export function StudioProvider({ children }) {
  const [classes, setClasses] = useState([]);
  const [status, setStatus] = useState("loading");
  const [loadCount, setLoadCount] = useState(0);

  useEffect(() => {
    let ignore = false;
    setStatus("loading");

    loadClasses()
      .then((data) => {
        if (!ignore) {
          setClasses(data);
          setStatus("ready");
        }
      })
      .catch(() => {
        if (!ignore) {
          setStatus("error");
        }
      });

    return () => {
      ignore = true;
    };
  }, [loadCount]);

  function reload() {
    setLoadCount((count) => count + 1);
  }

  const value = { classes, status, reload };

  return <StudioContext.Provider value={value}>{children}</StudioContext.Provider>;
}

export function useStudio() {
  return useContext(StudioContext);
}
