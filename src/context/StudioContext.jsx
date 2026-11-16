import { createContext, useContext, useEffect, useState } from "react";
import { loadClasses } from "../api/classesApi.js";

const StudioContext = createContext(null);
const PLAN_KEY = "mms.plan";

function readSavedPlan() {
  try {
    const saved = JSON.parse(localStorage.getItem(PLAN_KEY));
    if (!Array.isArray(saved)) {
      return [];
    }
    return saved.filter((entry) => typeof entry.id === "string" && Number.isInteger(entry.attendees));
  } catch {
    return [];
  }
}

export function StudioProvider({ children }) {
  const [classes, setClasses] = useState([]);
  const [status, setStatus] = useState("loading");
  const [loadCount, setLoadCount] = useState(0);
  const [plan, setPlan] = useState(readSavedPlan);
  const [booking, setBooking] = useState(null);

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

  useEffect(() => {
    localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
  }, [plan]);

  function reload() {
    setLoadCount((count) => count + 1);
  }

  function addToPlan(id, attendees) {
    setPlan((oldPlan) => {
      const exists = oldPlan.some((entry) => entry.id === id);
      if (exists) {
        return oldPlan.map((entry) => (entry.id === id ? { ...entry, attendees } : entry));
      }
      return [...oldPlan, { id, attendees }];
    });
  }

  function removeFromPlan(id) {
    setPlan((oldPlan) => oldPlan.filter((entry) => entry.id !== id));
  }

  function clearPlan() {
    setPlan([]);
  }

  const value = {
    classes,
    status,
    reload,
    plan,
    addToPlan,
    removeFromPlan,
    clearPlan,
    booking,
    setBooking,
  };

  return <StudioContext.Provider value={value}>{children}</StudioContext.Provider>;
}

export function useStudio() {
  return useContext(StudioContext);
}
