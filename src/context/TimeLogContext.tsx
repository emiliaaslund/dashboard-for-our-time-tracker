import React, { createContext, useContext, useEffect, useState } from "react";
import { getTimeLogs } from "../api/api";

interface TimeLogCtxInterface {
  timeLogs: TimeLog[];
  getTimeLogData: (array: TimeLog[]) => void;
}

interface ProviderProps {
  children?: React.ReactNode;
}

// Del 1 - skapa context
const TimeLogContext = createContext<TimeLogCtxInterface | null>(null);

//Del 2 - skapa en provider
export const TimeLogProvider = ({ children }: ProviderProps) => {
  const [timeLogs, setTimeLogs] = useState<TimeLog[]>([]);

  const getTimeLogData = async () => {
    const data = await getTimeLogs();
    setTimeLogs(data);
    // console.log(timeLogs, "från timecontext");
  };

  useEffect(() => {
    getTimeLogData();
  }, []);

  return (
    <TimeLogContext.Provider value={{ timeLogs, getTimeLogData }}>
      {children}
    </TimeLogContext.Provider>
  );
};

export const useTimeLogContext = () => {
  const contextValue = useContext(TimeLogContext);
  if (!contextValue) {
    throw new Error("context is outside the provider");
  }
  return contextValue;
};
