import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Grid, MenuItem } from "@mui/material"; // For MUI Grid and MenuItem
import PrimaryButton from "../../components/shared/button/PrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import { selectExpense } from "../../../store/feature/expense/expense.slice";
import InputField from "../../components/shared/form/input/InputField";
import SearchableInput from "../../components/shared/searchable-input/SearchableInput";
import { getCategory } from "../../../store/feature/category/category.api";
import { getUsers } from "../../../store/feature/user/user.api";
import { selectCategory } from "../../../store/feature/category/category.slice";
import { selectUser } from "../../../store/feature/user/user.slice";
import dayjs from "dayjs";

const ExpenseForm = ({ onSubmitSuccess = () => {}, formData }) => {
  const dispatch = useDispatch();
  console.log(formData,"formData")
  const { handleSubmit, control } = useForm({
    defaultValues: {
      ...formData,
      date: formData?.date ? dayjs(formData.date).format("YYYY-MM-DD") : "",
    },
  });
  const { isLoading } = useSelector(selectExpense);
  const { categories } = useSelector(selectCategory);
  const { users } = useSelector(selectUser);
  console.log("users", users);
  console.log("categories", categories);

  const onSubmit = async (data) => {
    try {
      const payload = {
        userId: data.userId,
        categoryId: data.categoryId,
        date: data.date,
        amount: data.amount,
        description: data.description,
      };
      onSubmitSuccess(payload);
    } catch (error) {
      console.error("Error creating expense:", error);
    }
  };

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getUsers());
  }, []);

  const categoryOptions = categories.map((category) => ({
    label: category.name,
    id: category.id,
  }));
  const userOptions = users.map((user) => ({
    label: user.name,
    id: user.id,
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        {/* User ID Field */}
        <Grid item size={6}>
          <SearchableInput
            control={control}
            fullWidth
            label="User"
            name="userId"
            type="number"
            required
            data={userOptions}
          />
        </Grid>

        {/* Category ID Field */}
        <Grid item size={6}>
          <SearchableInput
            control={control}
            fullWidth
            label="Category"
            name="categoryId"
            required
            data={categoryOptions}
          />
        </Grid>

        {/* Date Field */}
        <Grid item size={6}>
          <InputField
            control={control}
            fullWidth
            label="Expense Date"
            name="date"
            type="date"
            InputLabelProps={{ shrink: true }}
            required
          />
        </Grid>

        {/* Amount Field */}
        <Grid item size={6}>
          <InputField
            control={control}
            fullWidth
            label="Amount"
            name="amount"
            type="number"
            required
          />
        </Grid>

        {/* Description Field */}
        <Grid item size={12}>
          <InputField
            control={control}
            fullWidth
            label="Description"
            name="description"
            multiline
            rows={3}
            required
          />
        </Grid>

        {/* Submit Button */}
        <Grid item size={6}>
          <PrimaryButton type="submit">
            {isLoading ? "Submitting..." : "Submit"}
          </PrimaryButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default ExpenseForm;
