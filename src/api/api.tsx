import axios from "axios";

export const getProjects = async (): Promise<Projects[]> => {
  const data = await axios("http://localhost:3000/projects");
  // console.log(data.data, "all data hämtad");
  return data.data;
};

export const getTasks = async (): Promise<Tasks[]> => {
  const data = await axios("http://localhost:3000/tasks");
  // console.log(data.data, "tasks hämtad");
  return data.data;
};

export const getTimeLogs = async (): Promise<TimeLog[]> => {
  const data = await axios("http://localhost:3000/timelogs");
  // console.log(data.data, "timelogs hämtad");
  return data.data;
};

export const getInvoices = async (): Promise<Invoice[]> => {
  const data = await axios("http://localhost:3000/invoices");
  // console.log(data.data, "all data hämtad");
  return data.data;
};

export const addInvoice = async (invoice: any) => {
  const res = await axios.request({
    method: "post",
    url: "http://localhost:3000/invoices",
    data: {
      id: invoice.id,
      createdDate: invoice.createdDate,
      dueDate: invoice.dueDate,
      clientName: invoice.clientName,
      projectName: invoice.projectName,
      tasks: invoice.tasks,
      totalPrice: invoice.totalPrice,
      paid: invoice.paid,
    },
  });
  // console.log("faktura skapad");
  return;
};

export const addPriceToProject = async (
  id: string,
  totalPrice: number
): Promise<Projects> => {
  try {
    const data = await axios.patch(`http://localhost:3000/projects/${id}`, {
      price: totalPrice,
    });
    console.log(`${totalPrice} is added to project ${id}`);
    return data.data;
  } catch (err) {
    throw { message: "Error", status: 404 };
  }
};
