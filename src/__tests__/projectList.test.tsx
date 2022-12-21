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
import Navbar from "../componets/Navbar";

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

  //funkar
  test("checks if there is a h1 in projectpage", () => {
    const title = screen.findByText("Projectpage", {});
    expect(title).toBeDefined();
    // screen.debug();
  });

  test("check if projectpage has a list with projects and correct listvalue", async () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const link = await screen.findByText("Projects");
    await expect(link).toBeDefined();
    await expect(screen.queryAllByRole("link")[1].getAttribute("href")).toBe(
      "/projects"
    );
    await fireEvent.click(link);

    await screen.getByText(/Projectpage/i);
    await expect(screen.getByText("Projectpage")).toBeInTheDocument();
    const projectlist = await screen.findAllByTestId("projectlist");
    expect(projectlist).toBeDefined();
    const project = await screen.findAllByTestId("project");
    expect(project).toHaveLength(3);
    expect(project).not.toHaveLength(1);
    const findProject = await screen.getAllByText("Test 2");
    expect(findProject).toHaveLength(1);
    // screen.debug();
  });

  //YEY funkar
  test("test too delete a project", async () => {
    const projectList = await screen.findAllByTestId("projectlist");
    expect(projectList).toBeDefined();
    const del = await screen.findAllByTestId("deletebtn");
    expect(del).toHaveLength(3);
    expect(del).not.toHaveLength(2);
    await fireEvent.click(del[2]);
  });
});
