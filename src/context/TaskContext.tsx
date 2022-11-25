import React, { createContext, useContext, useEffect, useState } from "react";
import { getTasks } from "../api/api";

interface TaskCtxInterface {
  tasks: Tasks[];
  getTaskData: (array: Tasks[]) => void;
}

interface ProviderProps {
  children?: React.ReactNode;
}

// Del 1 - skapa context
const TaskContext = createContext<TaskCtxInterface | null>(null);

//Del 2 - skapa en provider
export const TaskProvider = ({ children }: ProviderProps) => {
  const [tasks, setTasks] = useState<Tasks[]>([]);

  const getTaskData = async () => {
    const data = await getTasks();
    setTasks(data);
    // console.log(tasks, "från taskcontext");
  };

  useEffect(() => {
    getTaskData();
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, getTaskData }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const contextValue = useContext(TaskContext);
  if (!contextValue) {
    throw new Error("context is outside the provider");
  }
  return contextValue;
};
