import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Layout from "../Layout";
import UsersPage from "./Users/UsersPage";
import CategoryPage from "./Category/CategoryPage";
import ExpensePage from "./Expense/ExpensePage";
import StatisticsPage from "./Statistics/StatisticsPage";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/statistics" />,
      },
      {
        path: "statistics",
        element: <StatisticsPage />,
      },
      {
        path: "expense",
        element: <ExpensePage />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "category",
        element: <CategoryPage />,
      },
    ],
  },
];

const AppRoutes = () => useRoutes(routes);

export default AppRoutes;
