import React, { createContext, useContext, useEffect, useState } from "react";
import { getInvoices } from "../api/api";

interface InvoiceCtxInterface {
  invoices: Invoice[];
  getInvoiceData: (array: Invoice[]) => void;
  setInvoices: React.Dispatch<React.SetStateAction<Invoice[]>>;
}

interface ProviderProps {
  children?: React.ReactNode;
}

// Del 1 - skapa context
const InvoiceContext = createContext<InvoiceCtxInterface | null>(null);

//Del 2 - skapa en provider
export const InvoiceProvider = ({ children }: ProviderProps) => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  const getInvoiceData = async () => {
    const data = await getInvoices();
    setInvoices(data);
    // console.log(Invoices, "från timecontext");
  };

  useEffect(() => {
    getInvoiceData();
  }, []);

  return (
    <InvoiceContext.Provider value={{ invoices, getInvoiceData, setInvoices }}>
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoiceContext = () => {
  const contextValue = useContext(InvoiceContext);
  if (!contextValue) {
    throw new Error("context is outside the provider");
  }
  return contextValue;
};
