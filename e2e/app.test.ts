import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://127.0.0.1:5173/");
  await page.getByRole("link", { name: " Home" }).click();

  await page.getByRole("heading", { name: "Overview" }).click();
  await page.waitForTimeout(3000);
  await page
    .getByRole("heading", { name: "Tid som loggats senaste 30 dagar:" })
    .click();

  await page.getByRole("link", { name: " Projects" }).click();
  await page.waitForTimeout(3000);
  await page.getByRole("heading", { name: "Alla tasks:" }).click();
  await page
    .getByRole("row", { name: "Uppgift 2 Projekt 2 " })
    .getByTestId("testTask")
    .click();
  await page.getByRole("heading", { name: "Alla Project:" }).click();
  await page
    .getByRole("row", { name: "Söndag 20/11 1 " })
    .getByTestId("project")
    .click();
  await page.getByRole("heading", { name: "Alla timelogs:" }).click();
  await page.getByRole("cell", { name: "Städa hela dagen lång" }).click();
  await page.getByRole("link", { name: " Invoices" }).click();
  await page.waitForTimeout(3000);
  await page.getByRole("heading", { name: "Invoicepage" }).click();
  await page.getByRole("heading", { name: "Create a new invoice" }).click();
  await page.getByTestId("inputName").click();
  await page.getByTestId("inputName").fill("TestNamn");
  await page.waitForTimeout(2000);
  await page
    .getByTestId("selectProject")
    .selectOption("4793c03c-bcfe-4728-ae3b-fc4e6e001788");
  await page.waitForTimeout(2000);
  await page.getByRole("button", { name: "Select projecttasks here" }).click();
  await page.waitForTimeout(2000);
  await page
    .getByRole("listitem")
    .filter({ hasText: "KOLLA F1 <3" })
    .getByRole("button", { name: "" })
    .click();
  await page.waitForTimeout(2000);
  await page.getByRole("spinbutton").click();
  await page.getByRole("button", { name: "Add Price" }).click();
  await page.getByRole("spinbutton").fill("50");
  await page.waitForTimeout(2000);
  await page.getByRole("button", { name: "Add Price" }).click();
  await page.waitForTimeout(2000);
  await page.getByRole("button", { name: "Create Invoice" }).click();
  await page.getByRole("heading", { name: "Alla fakturor:" }).click();
  await page.waitForTimeout(2000);
  await page.getByRole("cell", { name: "TestNamn" }).click();
  await page.waitForTimeout(2000);
  await page
    .getByRole("row", {
      name: "TestNamn 2023-01-20 281.68055555555554 Ej Betald ",
    })
    .getByRole("button", { name: "" })
    .click();
});
