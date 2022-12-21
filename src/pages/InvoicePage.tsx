import React, { ChangeEventHandler, useEffect, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(duration);
dayjs.extend(customParseFormat);

import axios from "axios";
import { addInvoice, addPriceToProject } from "../api/api";
import { useInvoiceContext } from "../context/InvoiceContext";
import { useProjectContext } from "../context/ProjectContext";
import { useTaskContext } from "../context/TaskContext";
import { TimeLogProvider, useTimeLogContext } from "../context/TimeLogContext";
import { calcTotalTime } from "../util";

function InvoicePage() {
  //context
  const { projects, getProjectData } = useProjectContext();
  const { tasks, getTaskData } = useTaskContext();
  const { invoices, getInvoiceData } = useInvoiceContext();
  const { timeLogs, getTimeLogData } = useTimeLogContext();
  //states
  const [projectTask, setProjectTask] = useState<Tasks[]>([]);
  const [times, setTimes] = useState<TimeLog[]>([]);
  const [hourlyPrice, setHourlyPrice] = useState<number>(0);
  const [project, setProject] = useState({
    id: "",
    hourlyPrice: 0,
  });

  //tider
  const todaysDate = Date.now();
  const formatDate = dayjs(todaysDate).format();

  //staten för invoice
  const [invoice, setInvoice] = useState({
    id: "",
    createdDate: new Date(),
    dueDate: new Date(+todaysDate + 30 * 86400000).toISOString().slice(0, 10),
    clientName: "",
    projectName: "",
    tasks: "",
    totalPrice: 0,
    paid: "Ej Betald",
  });

  const handleChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setInvoice({ ...invoice, projectName: e.currentTarget.value });
    const findTask = tasks.filter(
      (task) => task.projectId === e.currentTarget.value
    );
    setProjectTask(findTask);
  };

  const deleteInvoice = async (id: string) => {
    const removeId = invoices.filter((invoice) => id === invoice.id);
    const { data } = await axios.delete(`http://localhost:3000/invoices/${id}`);
    // console.log(removeId, "removeid");
    getInvoiceData(invoices);
  };

  const handleProjectUpdate = async () => {
    const projectPrice = addPriceToProject(project.id, project.hourlyPrice);
    // console.log("pris skickat till project");
  };

  const createInvoice = async () => {
    const totalPrice =
      dayjs.duration(calcTotalTime(times)).asHours() * project.hourlyPrice;
    await addInvoice({ ...invoice, totalPrice });
    getInvoiceData(invoices);
  };

  return (
    <div className="container-sm">
      <h1 className="mb-4 mt-4 text-decoration-underline">Invoicepage</h1>
      <div className="row justify-content-md-center">
        <div className="col-sm-6">
          <div className="card shadow-sm mb-2">
            <div className="card-body">
              <h5 className="card-title">Antal fakturor: {invoices.length}</h5>
              <p className="card-text">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam
                commodi, veritatis facere voluptates reiciendis maiores enim
              </p>
            </div>
          </div>
        </div>

        <div className="col-sm-6">
          <div className="card shadow-sm mb-2">
            <div className="card-body">
              <h5 className="card-title">Lorem ipsum dolor sit amet.</h5>
              <p className="card-text">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi
                commodi, veritatis facere voluptates reiciendis maiores enim
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-12 center">
          <div className="card">
            <div className="card-body shadow-sm ">
              <h4 className="card-title" id="title">
                Create a new invoice
              </h4>
              <form
                className="row g-4"
                id="wrapper"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <div className="col-md-5">
                  <label className="form-label">Client name:</label>
                  <input
                    required
                    type="text"
                    data-testid={"inputName"}
                    value={invoice.clientName || ""}
                    className="form-control"
                    onChange={(e) =>
                      setInvoice({ ...invoice, clientName: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-5">
                  <label className="form-label">Project name:</label>
                  <select
                    className="form-select"
                    data-testid={"selectProject"}
                    required
                    value={project.id || ""}
                    onChange={(e: React.FormEvent<HTMLSelectElement>) => {
                      handleChange(e);
                      setProject({ ...project, id: e.currentTarget.value });
                    }}
                  >
                    <>
                      <option>Select project..</option>
                      {projects.map((project) => (
                        <option value={project.id} key={project.id}>
                          {project.name}
                        </option>
                      ))}
                    </>
                  </select>
                </div>
                <div className="col-md-5">
                  <label className="form-label">
                    You need to choose a project first:
                  </label>
                  <div className="input-group mb-3">
                    {!projectTask ? null : (
                      <div className="dropdown">
                        <button
                          className="btn btn-outline-primary dropdown-toggle"
                          type="button"
                          id="dropdownMenuButton1"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Select projecttasks here
                        </button>
                        <ul
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuButton1"
                        >
                          {projectTask.map((pt) => (
                            <li
                              className="ms-2 dropdown-item p-2"
                              key={pt.id}
                              data-testid={"bajs"}
                            >
                              {pt.name}
                              <button
                                key={pt.id}
                                className="ms-3 me-2 btn btn-success m-1"
                                onClick={() => {
                                  const filterTask = timeLogs.filter(
                                    (tasktime) => tasktime.name === pt.name
                                  );
                                  console.log(`du har valt task: ${pt.name}`);
                                  setTimes((current: any) => [
                                    ...current,
                                    ...filterTask,
                                  ]);
                                }}
                                data-testid={"bajskorv"}
                              >
                                <i
                                  className="bi bi-check2-square"
                                  // data-testid={"selectTask"}
                                  data-testid={"bajs"}
                                ></i>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-5">
                  <label className="form-label">Price / hour:</label>
                  <div className="input-group mb-3">
                    <input
                      type="number"
                      required
                      className="form-control"
                      value={project.hourlyPrice}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setProject({
                          ...project,
                          hourlyPrice: e.target.valueAsNumber,
                        })
                      }
                    />

                    <button
                      type="submit"
                      className="btn btn-outline-primary"
                      onClick={() => {
                        handleProjectUpdate();
                        setHourlyPrice(hourlyPrice);
                      }}
                    >
                      Add Price
                    </button>
                  </div>
                </div>

                <button
                  disabled={!project.hourlyPrice}
                  type="submit"
                  className="btn btn-primary text-center mb-4"
                  onClick={() => {
                    createInvoice();
                    setHourlyPrice(hourlyPrice);
                  }}
                  id="submit-btn"
                >
                  Create Invoice
                </button>
              </form>
            </div>
          </div>
          <div className="col-sm-12 mt-4">
            <h4 className="">Alla fakturor:</h4>
            <div className="table-responsive">
              <table className="table table-dark table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Client name:</th>
                    <th>Due Date: </th>
                    <th>Total Amount:</th>
                    <th>Status:</th>
                    <th>Actions:</th>
                  </tr>
                </thead>
                {invoices.map((invoice) => (
                  <tbody className="table-table align-middle" key={invoice.id}>
                    <tr data-testid={"invoicelist"}>
                      <td data-testid={"testInvoice"}>{invoice.clientName}</td>
                      <td>{invoice.dueDate}</td>
                      <td>{invoice.totalPrice}</td>
                      <td>{invoice.paid}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger m-1"
                          onClick={() => {
                            deleteInvoice(invoice.id);
                          }}
                        >
                          <i className="bi bi-trash3"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoicePage;
