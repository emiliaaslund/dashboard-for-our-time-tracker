import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom";
import InvoicePage from "../pages/InvoicePage";
import { TaskProvider } from "../context/TaskContext";
import { TimeLogProvider } from "../context/TimeLogContext";
import { ProjectProvider } from "../context/ProjectContext";
//import mock api
import { setupServer } from "msw/node";
import { buildHandlers } from "../mocks/handlers";
import { InvoiceProvider } from "../context/InvoiceContext";

const server = setupServer(...buildHandlers());

beforeAll(() => server.listen());
afterAll(() => server.close());

describe("check if invoicepage loads correctly", () => {
  beforeEach(() => {
    render(
      <TimeLogProvider>
        <TaskProvider>
          <ProjectProvider>
            <InvoiceProvider>
              <InvoicePage />
            </InvoiceProvider>
          </ProjectProvider>
        </TaskProvider>
      </TimeLogProvider>
    );
  });

  //funkar
  test("render the invoice list", async () => {
    await screen.getByText(/InvoicePage/i);
    await expect(screen.getByText("Invoicepage")).toBeInTheDocument();
    const invoicelist = await screen.findAllByTestId("invoicelist");
    expect(invoicelist).toBeDefined();
    const testInvoice = await screen.findAllByTestId("testInvoice");
    expect(testInvoice).toHaveLength(4);
    expect(testInvoice).not.toHaveLength(3);
    const findInvoice = await screen.getAllByText("Testfaktura 1");
    expect(findInvoice).toHaveLength(1);
    // screen.debug();
  });

  //skapa faktura:
  // test("test to create a testinvoice", async () => {
  //   await expect(screen.getByText("Create a new invoice")).toBeInTheDocument();
  //   const inputName = await screen.findByTestId("inputName");
  //   fireEvent.click(inputName);

  //   await fireEvent.change(inputName, { target: { value: "TestClient" } });
  //   await expect(inputName).toHaveValue("TestClient");
  //   const selectP = (await screen.findByTestId("selectProject")).click();
  //   const chooseProject = (await screen.findByText("Test 3")).click();
  //   // const selectT = (await screen.findByTestId("selectBtn")).click();
  //   const btn = await screen.getByRole("button", {
  //     name: "Select projecttasks here",
  //     //   hidden: true,
  //   });
  //   await fireEvent.click(btn);

  //   screen.debug();
  //   // const selectTask = await screen.findAllByTestId("selectTask");
  //   // fireEvent.change(select);

  //   // await fireEvent.click(select);
  //   // const chooseProject = await screen.getByRole("combobox").click();
  //   // expect(chooseProject).toBeCalledTimes(1);
  // });
});
