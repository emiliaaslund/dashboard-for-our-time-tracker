import { rest } from "msw";

export const buildHandlers = () => {
  return [
    rest.get("http://localhost:3000/projects", (req, res, ctx) => {
      return res(
        ctx.json([
          {
            id: "4793c03c-bcfe-4728-ae3b-fc4e6e001788",
            name: "Test 1",
            price: 20,
          },
          {
            id: "e8ab4166-4394-447b-9286-8d4b4144419b",
            name: "Test 2",
            price: 100,
          },
          {
            id: "d0ececfc-eb4a-431a-b4ac-46c1e9bbfb59",
            name: "Test 3",
            price: 13,
          },
        ])
      );
    }),
    rest.delete(`http://localhost:3000/projects/:id`, (req, res, ctx) => {
      return res(
        ctx.json([
          {
            id: "4793c03c-bcfe-4728-ae3b-fc4e6e001788",
            name: "Test 1",
            price: 20,
          },
          {
            id: "e8ab4166-4394-447b-9286-8d4b4144419b",
            name: "Test 2",
            price: 100,
          },
          {
            id: "d0ececfc-eb4a-431a-b4ac-46c1e9bbfb59",
            name: "Test 3",
            price: 13,
          },
        ])
      );
    }),
    rest.get("http://localhost:3000/tasks", (req, res, ctx) => {
      return res(
        ctx.json([
          {
            id: "2090d435-be54-4e0f-8e85-cd3448919a8a",
            name: "Test",
            projectId: "4793c03c-bcfe-4728-ae3b-fc4e6e001788",
            date: "2022-11-20",
          },
          {
            id: "0bfd5a46-fc02-4664-b59d-fc4c2d9310d0",
            name: "Test2",
            projectId: "d0ececfc-eb4a-431a-b4ac-46c1e9bbfb59",
            date: "2022-11-25",
          },
        ])
      );
    }),
    rest.delete("http://localhost:3000/tasks/:id", (req, res, ctx) => {
      return res(
        ctx.json([
          {
            id: "2090d435-be54-4e0f-8e85-cd3448919a8a",
            name: "KOLLA F1 <3",
            projectId: "4793c03c-bcfe-4728-ae3b-fc4e6e001788",
            date: "2022-11-20",
          },
          {
            id: "0bfd5a46-fc02-4664-b59d-fc4c2d9310d0",
            name: "Uppgift 2",
            projectId: "d0ececfc-eb4a-431a-b4ac-46c1e9bbfb59",
            date: "2022-11-25",
          },
        ])
      );
    }),

    rest.get("http://localhost:3000/invoices", (req, res, ctx) => {
      return res(
        ctx.json([
          {
            id: 1,
            createdDate: "2022-11-25T20:59:35.984Z",
            dueDate: "2021-11-24",
            clientName: "Testfaktura 1",
            projectName: "4793c03c-bcfe-4728-ae3b-fc4e6e001788",
            tasks: "",
            totalPrice: 2500.6944444444443,
            paid: "Ej Betald",
          },
          {
            id: 3,
            createdDate: "2022-11-25T20:59:35.984Z",
            dueDate: "2022-12-25",
            clientName: "Testfaktura 2",
            projectName: "e8ab4166-4394-447b-9286-8d4b4144419b",
            tasks: "",
            totalPrice: 300.02777777777777,
            paid: "Ej Betald",
          },
          {
            id: 4,
            createdDate: "2022-11-25T21:10:48.334Z",
            dueDate: "2022-12-25",
            clientName: "Testfaktura 3",
            projectName: "d0ececfc-eb4a-431a-b4ac-46c1e9bbfb59",
            tasks: "",
            totalPrice: 1667.2222222222222,
            paid: "Ej Betald",
          },
          {
            id: 5,
            createdDate: "2022-12-15T16:47:30.056Z",
            dueDate: "2023-01-14",
            clientName: "Testfaktura 4",
            projectName: "d0ececfc-eb4a-431a-b4ac-46c1e9bbfb59",
            tasks: "",
            totalPrice: 10.836944444444445,
            paid: "Ej Betald",
          },
        ])
      );
    }),
    rest.post("http://localhost:3000/invoices", (req, res, ctx) => {
      return res(
        ctx.json([
          {
            id: 1,
            createdDate: "2022-11-25T20:59:35.984Z",
            dueDate: "2021-11-24",
            clientName: "Testfaktura 1",
            projectName: "4793c03c-bcfe-4728-ae3b-fc4e6e001788",
            tasks: "",
            totalPrice: 2500.6944444444443,
            paid: "Ej Betald",
          },
        ])
      );
    }),
  ];
};
