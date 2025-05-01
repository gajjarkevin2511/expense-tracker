import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectExpense } from "../../../store/feature/expense/expense.slice";
import BasicModal from "../../components/shared/modal/Modal";
import ReusableTable from "../../components/shared/table/Table";
import ExpenseForm from "./ExpenseForm";
import PrimaryButtonComponent from "../../components/shared/button/PrimaryButton";
import EditIconButton from "../../components/shared/button/EditIconButton";
import DeleteIconButton from "../../components/shared/button/DeleteIconButton";

import {
  createExpense,
  deleteExpense,
  getExpense,
  updateExpense,
} from "../../../store/feature/expense/expense.api";
import dayjs from "dayjs";

const ExpensePage = () => {
  const [expenseData, setExpenseData] = useState(null);

  const { expenses } = useSelector(selectExpense);

  const dispatch = useDispatch();
  const handleRemoveExpense = (expenseId) => {
    dispatch(deleteExpense({ expenseId }));
  };
  const columns = [
    {
      key: "user",
      title: "Expense By",
      align: "left",
      render: (row) => row.User.name,
    },
    {
      key: "category",
      title: "Category",
      align: "left",
      render: (row) => row.Category.name,
    },
    {
      key: "date",
      title: "Expense Date",
      align: "left",
      render: (row) => dayjs(row.date).format("DD/MM/YYYY"),
    },
    { key: "amount", title: "Amount", align: "right" },
    {
      key: "Action",
      title: "Action",
      align: "center",
      render: (row) => (
        <Box
          sx={{
            display: "flex",
            gap: "8px",
            justifyContent: "center",
          }}
        >
          <EditIconButton
            onClick={(e) => {
              e.stopPropagation();
              setExpenseData(row);
            }}
          />
          <DeleteIconButton
            onClick={(e) => {
              e.stopPropagation();
              handleRemoveExpense(row.id);
            }}
          />
        </Box>
      ),
    },
  ];

  const handleCreateOrUpdateExpense = async (data) => {
    try {
      if (expenseData.id) {
        // Update expense logic
        await dispatch(
          updateExpense({ expenseId: expenseData.id, payload: data })
        ).unwrap();
      } else {
        // Create expense logic
        await dispatch(createExpense(data)).unwrap();
      }
      setExpenseData(null);
    } catch (error) {}
  };
  useEffect(() => {
    dispatch(getExpense());
  }, []);

  return (
    <>
      <div style={{ padding: "20px" }}>
        {/* Section 1: Title and Add Expense Button */}
        <Grid
          container
          mb={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="h4">Expense Management</Typography>
          </Grid>
          <Grid item>
            <PrimaryButtonComponent
              variant="contained"
              color="primary"
              onClick={() => setExpenseData({})}
            >
              Create Expense
            </PrimaryButtonComponent>
          </Grid>
        </Grid>

        {/* Section 2: Table */}
        <ReusableTable columns={columns} data={expenses} />
      </div>
      <BasicModal
        label="Create Expense"
        open={expenseData}
        handleClose={() => setExpenseData(null)}
      >
        <ExpenseForm
          formData={expenseData}
          onSubmitSuccess={handleCreateOrUpdateExpense}
        />
      </BasicModal>
    </>
  );
};

export default ExpensePage;
