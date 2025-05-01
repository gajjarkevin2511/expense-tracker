import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../store/feature/user/user.slice";
import BasicModal from "../../components/shared/modal/Modal";
import ReusableTable from "../../components/shared/table/Table";
import UserForm from "./UserForm";
import PrimaryButtonComponent from "../../components/shared/button/PrimaryButton";
import EditIconButton from "../../components/shared/button/EditIconButton";
import DeleteIconButton from "../../components/shared/button/DeleteIconButton";

import {
  createUser,
  deleteUser,
  getUsers,
} from "../../../store/feature/user/user.api";
import { updateUser } from "../../../store/feature/user/user.api";

const UsersPage = () => {
  const [userData, setUserData] = useState(null);

  const { users } = useSelector(selectUser);

  const dispatch = useDispatch();

  const handleRemoveUser = (userId) => {
    dispatch(deleteUser({ userId }));
  };

  const columns = [
    { key: "name", title: "User Name", align: "left" },
    { key: "email", title: "Email", align: "left" },
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
              setUserData(row);
            }}
          />
          <DeleteIconButton
            onClick={(e) => {
              e.stopPropagation();
              handleRemoveUser(row.id);
            }}
          />
        </Box>
      ),
    },
  ];

  const handleCreateOrUpdateUser = async (data) => {
    try {
      if (userData?.id) {
        // Update user logic
        await dispatch(
          updateUser({ userId: userData.id, payload: data })
        ).unwrap();
      } else {
        // Create user logic
        await dispatch(createUser(data)).unwrap();
      }
      setUserData(null);
    } catch (error) {
      console.error("Error creating/updating user:", error);
    }
  };

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <>
      <div style={{ padding: "20px" }}>
        {/* Section 1: Title and Add User Button */}
        <Grid
          container
          mb={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="h4">User Management</Typography>
          </Grid>
          <Grid item>
            <PrimaryButtonComponent
              variant="contained"
              color="primary"
              onClick={() => setUserData({})}
            >
              Create User
            </PrimaryButtonComponent>
          </Grid>
        </Grid>

        {/* Section 2: Table */}
        <ReusableTable columns={columns} data={users} />
      </div>
      <BasicModal
        label="Create User"
        open={userData}
        handleClose={() => setUserData(null)}
      >
        <UserForm
          formData={userData}
          onSubmitSuccess={handleCreateOrUpdateUser}
        />
      </BasicModal>
    </>
  );
};

export default UsersPage;
