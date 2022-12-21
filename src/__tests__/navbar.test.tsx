import React from "react";
import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import Navbar from "../componets/Navbar";
import { BrowserRouter } from "react-router-dom";

describe("check if navbar components loads correctly", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
  });

  afterEach(cleanup);

  test("checks if there is a link in the navbar with name timer", () => {
    const link = screen.findByText("Invoices");
    expect(link).toBeDefined();
  });

  test("test if navbar have 3 links", async () => {
    screen.debug();
    const link = await screen.queryAllByRole("link");
    expect(link.length).toEqual(3);
  });

  test("check if the overview icon works", async () => {
    const icon = await screen.queryByTestId("PageviewIcon");
    expect(icon).toBeDefined();
  });
});
