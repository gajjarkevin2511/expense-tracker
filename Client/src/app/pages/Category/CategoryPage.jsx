import React, { useEffect, useState } from "react";
import { Box,  Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectCategory } from "../../../store/feature/category/category.slice";
import BasicModal from "../../components/shared/modal/Modal";
import ReusableTable from "../../components/shared/table/Table";
import CategoryForm from "./CategoryForm";
import PrimaryButtonComponent from "../../components/shared/button/PrimaryButton";
import EditIconButton from "../../components/shared/button/EditIconButton";
import DeleteIconButton from "../../components/shared/button/DeleteIconButton";

import {
  createCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} from "../../../store/feature/category/category.api";

const CategoryPage = () => {
  const [categoryData, setCategoryData] = useState(null);

  const { categories } = useSelector(selectCategory);

  const dispatch = useDispatch();
  const handleRemoveCategory = (categoryId) => {
    dispatch(deleteCategory({categoryId}));
  };
  const columns = [
    { key: "name", title: "Category Name", align: "left" },
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
              setCategoryData(row)
            }}
          />
          <DeleteIconButton
            onClick={(e) => {
              e.stopPropagation();
              handleRemoveCategory(row.id);

            }}
          />
        </Box>
      ),
    },
  ];

  const handleCreateOrUpdateCategory = async (data) => {
    try {
      if (categoryData.id) {
        // Update category logic
        await dispatch(updateCategory({ categoryId :categoryData.id, payload :data})).unwrap();
      } else {
        // Create category logic
        await dispatch(createCategory(data)).unwrap();
      }
      setCategoryData(null);
    } catch (error) {}
  };
  useEffect(() => {
    dispatch(getCategory());
  }, []);

  return (
    <>
      <div style={{ padding: "20px" }}>
        {/* Section 1: Title and Add Category Button */}
        <Grid
          container
          mb={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="h4">Category Management</Typography>
          </Grid>
          <Grid item>
            <PrimaryButtonComponent
              variant="contained"
              color="primary"
              onClick={() => setCategoryData({})}
            >
              Create Category
            </PrimaryButtonComponent>
          </Grid>
        </Grid>

        {/* Section 2: Table */}
        <ReusableTable columns={columns} data={categories} />
      </div>
      <BasicModal
        label="Create category"
        open={categoryData}
        handleClose={() => setCategoryData(null)}
      >
        <CategoryForm formData={categoryData} onSubmitSuccess={handleCreateOrUpdateCategory} />
      </BasicModal>
    </>
  );
};

export default CategoryPage;
