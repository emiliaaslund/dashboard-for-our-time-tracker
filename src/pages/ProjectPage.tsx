import axios from "axios";

//context
import { useProjectContext } from "../context/ProjectContext";
import { useTaskContext } from "../context/TaskContext";
import { useTimeLogContext } from "../context/TimeLogContext";

type Props = {};

function ProjectPage({}: Props) {
  const { projects, getProjectData } = useProjectContext();
  const { tasks, getTaskData } = useTaskContext();
  const { timeLogs, getTimeLogData } = useTimeLogContext();

  // PROJECT ***********

  const deleteProject = async (id: any) => {
    const removeId = projects.filter((project) => id === project.id);
    const { data } = await axios.delete(`http://localhost:3000/projects/${id}`);
    console.log(removeId, "removeid");
    getProjectData(projects);
  };

  //TASKS ********************

  const deleteTask = async (id: any) => {
    const removeId = tasks.filter((task) => id === task.id);
    const { data } = await axios.delete(`http://localhost:3000/tasks/${id}`);
    console.log(removeId, "removeid");
    getTaskData(tasks);
  };

  //TIMELOGS***************

  const deleteTimeLog = async (id: any) => {
    const removeId = timeLogs.filter((timelog) => id === timelog.id);
    const { data } = await axios.delete(`http://localhost:3000/timelogs/${id}`);
    console.log(removeId, "removeid");
    getTimeLogData(timeLogs);
  };

  return (
    <div>
      <div className="container-sm">
        <h1 className="mb-4 mt-4 text-decoration-underline">Projectpage</h1>
        <div className="row">
          <div className="col-sm-4">
            <div className="card shadow-sm mb-2">
              <div className="card-body">
                <h5 className="card-title">Project</h5>
                <p className="card-text">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Quisquam labore, illum facere dolorum beatae quam?
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card shadow-sm mb-2">
              <div className="card-body">
                <h5 className="card-title">Tasks</h5>
                <p className="card-text">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Quisquam labore, illum facere dolorum beatae quam?
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card shadow-sm mb-2">
              <div className="card-body">
                <h5 className="card-title">Timelogs</h5>
                <p className="card-text">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Quisquam labore, illum facere dolorum beatae quam?
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row g-8 mt-4 container-fluid-mx-0">
          {/* TASKLISTA */}
          <div className="col-sm-6">
            <h4>Alla tasks: </h4>
            <table className="table table-dark table-striped table-bordered">
              <thead className="">
                <tr>
                  <th>Task:</th>
                  <th>Project Name:</th>
                  <th>Actions:</th>
                </tr>
              </thead>
              {tasks.map((task) => (
                <tbody className="table-table align-middle" key={task.id}>
                  {projects
                    .filter((project) => project.id === task.projectId)

                    .map((project) => (
                      <tr key={project.id}>
                        <td>{task.name}</td>
                        <td>{project.name}</td>

                        <td>
                          <button
                            type="button"
                            className="btn btn-danger m-1"
                            onClick={() => {
                              deleteTask(task.id);
                            }}
                          >
                            <i className="bi bi-trash3"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              ))}
            </table>
          </div>
          <div className="col-sm-6">
            {/* PROJEKTLISTA */}
            <h4>Alla Project:</h4>
            <div className="table-responsive">
              <table className="table table-dark table-striped table-bordered ">
                <thead>
                  <tr>
                    <th>Name:</th>
                    <th>Antal tasks:</th>
                    <th>Actions:</th>
                  </tr>
                </thead>
                {projects.map((project) => {
                  const filtredTasks = tasks.filter(
                    (task) => task.projectId === project.id
                  );
                  return (
                    <tbody
                      className="table-table align-middle"
                      key={project.id}
                    >
                      <tr>
                        <td>{project.name}</td>
                        <td>{filtredTasks.length}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-danger m-1"
                            key={project.id}
                            onClick={() => {
                              deleteProject(project.id);
                            }}
                          >
                            <i className="bi bi-trash3"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </div>
          </div>
          {/* TIMELOGS */}
          <div className="col-sm-12">
            <h4>Alla timelogs: </h4>
            <div className="table-responsive">
              <table className="table table-dark table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Task:</th>
                    <th>Start Time:</th>
                    <th>End Time:</th>
                    <th>Start date:</th>
                    <th>End date:</th>
                    <th>Actions:</th>
                  </tr>
                </thead>
                {timeLogs.map((timelog) => (
                  <tbody className="table-table align-middle" key={timelog.id}>
                    <tr>
                      <td>{timelog.name}</td>
                      <td>{timelog.startTime}</td>
                      <td>{timelog.endTime}</td>
                      <td>{timelog.startDate}</td>
                      <td>{timelog.endDate}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger m-1"
                          onClick={() => {
                            deleteTimeLog(timelog.id);
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

export default ProjectPage;
