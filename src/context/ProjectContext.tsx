import React, { createContext, useContext, useEffect, useState } from "react";
import { getProjects } from "../api/api";

interface ProjectCtxInterface {
  projects: Projects[];
  getProjectData: (array: Projects[]) => void;
}

interface ProviderProps {
  children?: React.ReactNode;
}

// Del 1 - skapa context
const ProjectContext = createContext<ProjectCtxInterface | null>(null);

//Del 2 - skapa en provider
export const ProjectProvider = ({ children }: ProviderProps) => {
  const [projects, setProjects] = useState<Projects[]>([]);

  const getProjectData = async () => {
    const data = await getProjects();
    setProjects(data);
    // console.log(projects, "från projectcontext");
  };

  useEffect(() => {
    getProjectData();
  }, []);

  return (
    <ProjectContext.Provider value={{ projects, getProjectData }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => {
  const contextValue = useContext(ProjectContext);
  if (!contextValue) {
    throw new Error("context is outside the provider");
  }
  return contextValue;
};
