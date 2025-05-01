import React from "react";
import { useForm } from "react-hook-form";
import { Grid } from "@mui/material"; // For MUI Grid

// import { createCategory } from '@/src/store/feature/category/category.api';
import PrimaryButton from "../../components/shared/button/PrimaryButton";
import { useSelector } from "react-redux";
import { selectCategory } from "../../../store/feature/category/category.slice";
import InputField from "../../components/shared/form/input/InputField";

const CategoryForm = ({ onSubmitSuccess = () => {}, formData }) => {
  const { handleSubmit, control } = useForm({
    defaultValues: formData,
  });
  const { isLoading } = useSelector(selectCategory);

  const onSubmit = async (data) => {
    try {
      const payload = {
        name: data.name,
      };
      onSubmitSuccess(payload);
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        {/* Category Name Field */}
        <Grid size={12}>
          <InputField
            control={control}
            fullWidth
            label="Category Name"
            name="name"
            required
          />
        </Grid>

        {/* Submit and Cancel Buttons */}
        <Grid size={12}>
          <PrimaryButton type="submit">
            {isLoading ? "Submitting..." : "Submit"}
          </PrimaryButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default CategoryForm;
