import React from "react";
import { useForm } from "react-hook-form";
import { Grid } from "@mui/material"; // For MUI Grid
import PrimaryButton from "../../components/shared/button/PrimaryButton";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/feature/user/user.slice";
import InputField from "../../components/shared/form/input/InputField";

const UserForm = ({ onSubmitSuccess = () => {}, formData }) => {
  const { handleSubmit, control } = useForm({
    defaultValues: formData,
  });
  const { isLoading } = useSelector(selectUser);

  const onSubmit = async (data) => {
    try {
      const payload = {
        name: data.name,
        email: data.email,
        status: data.status,
      };
      onSubmitSuccess(payload);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        {/* User Name Field */}
        <Grid item size={12}>
          <InputField
            control={control}
            fullWidth
            label="User Name"
            name="name"
            required
          />
        </Grid>

        {/* Email Field */}
        <Grid item size={12}>
          <InputField
            control={control}
            fullWidth
            label="Email"
            name="email"
            required
          />
        </Grid>
        <Grid item size={12}>
          <InputField
            control={control}
            fullWidth
            label="Status"
            name="status"
            required
          />
        </Grid>

        {/* Submit and Cancel Buttons */}
        <Grid item size={12}>
          <PrimaryButton type="submit">
            {isLoading ? "Submitting..." : "Submit"}
          </PrimaryButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default UserForm;