import dayjs from "dayjs";

import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

//context
import { useProjectContext } from "../context/ProjectContext";
import { useTaskContext } from "../context/TaskContext";
import { useTimeLogContext } from "../context/TimeLogContext";
import { useInvoiceContext } from "../context/InvoiceContext";
import { calcTotalTime } from "../util";

function Home() {
  const { projects, getProjectData } = useProjectContext();
  const { tasks, getTaskData } = useTaskContext();
  const { timeLogs, getTimeLogData } = useTimeLogContext();
  const { invoices, getInvoiceData } = useInvoiceContext();

  const todaysDate = new Date();
  const oldDate = new Date(new Date().setDate(new Date().getDate() - 30));

  const filteredTimeLog = timeLogs.filter((time) =>
    dayjs(oldDate).isBefore(time.startDate)
  );

  //året nu-30 dagar pga dueDate (+30)
  const currentYear = Date.now() - 28944000000;
  const previousYear = currentYear - 1;

  const filterInvoicesByYear = invoices.filter((invoice) =>
    dayjs(invoice.dueDate).isAfter(previousYear)
  );
  // console.log(filterInvoicesByYear, "inom ett år");

  //Räkna ut totalbeloppet inom ett år:
  const totalPrice = filterInvoicesByYear
    .map((invoice) => {
      const total: any = invoice.totalPrice;
      return total;
    })
    .reduce((prev, curr) => prev + curr, 0);

  const totalTime = calcTotalTime(filteredTimeLog);
  // console.log(totalTime, "hela arrayen");

  const formattedTime = dayjs.duration(totalTime).format("HH:mm:ss");

  return (
    <div className="container-sm ">
      <h1 className="mb-4 mt-4 text-decoration-underline">Overview</h1>
      <div className="row">
        <div className="col-sm-4">
          <div className="card shadow-sm mb-2 ">
            <div className="card-body">
              <h5 className="card-title">Antal project: {projects.length}</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="/projects" className="btn btn-outline-primary">
                Läs mer
              </a>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="card shadow-sm mb-2 ">
            <div className="card-body">
              <h5 className="card-title">Antal tasks: {tasks.length}</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="/projects" className="btn btn-outline-primary">
                Läs mer
              </a>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="card shadow-sm mb-2 ">
            <div className="card-body">
              <h5 className="card-title">Antal fakturor: {invoices.length}</h5>

              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="/invoices" className="btn btn-outline-primary">
                Läs mer
              </a>
            </div>
          </div>
        </div>

        <div className="col-sm-6 mt-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">
                Totaltid / 30 dagar: {formattedTime}
              </h5>
              <p className="card-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aspernatur similique delectus cumque blanditiis aut obcaecati?
              </p>
            </div>
          </div>
        </div>
        <div className="col-sm-6 mt-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">
                Totalbelopp för året:{" "}
                {totalPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")} SEK
              </h5>
              <p className="card-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aspernatur similique delectus cumque blanditiis aut obcaecati?
              </p>
            </div>
          </div>
        </div>
        <div className="col-sm-12 mt-5">
          <h4>Tid som loggats senaste 30 dagar:</h4>
          <div className="table-responsive">
            <table className="table table-dark table-striped table-bordered">
              <thead>
                <tr>
                  <th>Task:</th>
                  <th>Start Time:</th>
                  <th>End Time:</th>
                  <th>Start date:</th>
                  <th>End date:</th>
                </tr>
              </thead>
              {filteredTimeLog.map((timelog) => (
                <tbody className="table-table align-middle" key={timelog.id}>
                  <tr>
                    <td>{timelog.name}</td>
                    <td>{timelog.startTime}</td>
                    <td>{timelog.endTime}</td>
                    <td>{timelog.startDate}</td>
                    <td>{timelog.endDate}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
