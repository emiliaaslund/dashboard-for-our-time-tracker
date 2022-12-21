import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { ProjectProvider } from "../context/ProjectContext";
import { BrowserRouter } from "react-router-dom";

import "@testing-library/jest-dom";
import ProjectPage from "../pages/ProjectPage";
import { TaskProvider } from "../context/TaskContext";
import { TimeLogProvider } from "../context/TimeLogContext";

//import mock api
import { setupServer } from "msw/node";
import { buildHandlers } from "../mocks/handlers";

const server = setupServer(...buildHandlers());
console.log(buildHandlers);

beforeAll(() => server.listen());
afterAll(() => server.close());

describe("check if projectpage loads correctly", () => {
  beforeEach(() => {
    render(
      <TimeLogProvider>
        <TaskProvider>
          <ProjectProvider>
            <ProjectPage />
          </ProjectProvider>
        </TaskProvider>
      </TimeLogProvider>
    );
  });

  //visar
  test("test if tasklist renders correctly", async () => {
    await screen.getByText(/Projectpage/i);
    await expect(screen.getByText("Projectpage")).toBeInTheDocument();
    const projectlist = await screen.findAllByTestId("tasklist");
    expect(projectlist).toBeDefined();
    const testTask = await screen.findAllByTestId("testTask");
    expect(testTask).toHaveLength(2);
    expect(testTask).not.toHaveLength(1);
    const findTask = await screen.findAllByText("Test 2");
    expect(findTask).toHaveLength(1);
  });

  //delete
  test("test too delete a task", async () => {
    const taskList = await screen.findAllByTestId("tasklist");
    expect(taskList).toBeDefined();
    const del = await screen.findAllByTestId("deleteTaskBtn");
    expect(del).toHaveLength(2);
    expect(del).not.toHaveLength(3);
    await fireEvent.click(del[1]);
  });
});
