interface Projects {
  name: string;
  id: string;
  hourlyPrice: number;
}

interface Tasks {
  id: string;
  name: string;
  projectId: string;
  date: string;
}

interface TimeLog {
  projectId: string;
  name: string;
  startTime: string;
  endTime: string;
  startDate: string;
  endDate: string;
  id: string;
}

interface Invoice {
  id: string;
  dueDate: string;
  paid: string;
  totalPrice?: number;
  clientName: string;
  projectName: string;
  tasks: string[];
}
