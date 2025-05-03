import React, { useEffect, useState } from "react";
import { Box, Divider, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getPercentage,
  getPrediction,
  getTopDaysByExpenditure,
} from "../../../store/feature/statistics/statistics.api";
import ReusableTable from "../../components/shared/table/Table";
import SearchableInput from "../../components/shared/searchable-input/SearchableInput";
import {
  clearState,
  selectStatistics,
} from "../../../store/feature/statistics/statistics.slice";
import { selectUser } from "../../../store/feature/user/user.slice";
import { useForm } from "react-hook-form";
import { getUsers } from "../../../store/feature/user/user.api";

const StatisticsPage = () => {
  const dispatch = useDispatch();
  const { top3Days, percentage, prediction } = useSelector(selectStatistics);
  const { users } = useSelector(selectUser);
  const { control, watch } = useForm();
  const userId = watch("userId");
  console.log({ top3Days, percentage, prediction });
  useEffect(() => {
    if (userId) {
      dispatch(getTopDaysByExpenditure({ userId: userId }));
      dispatch(getPrediction({ userId: userId }));
      dispatch(getPercentage({ userId: userId }));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    dispatch(clearState());
    dispatch(getUsers());
  }, [dispatch]);
  const columns = [
    { key: "day", title: "Day", align: "left" },
    { key: "totalExpenditure", title: "Total Expenditure", align: "right" },
  ];
  const percentageColumns = [
    { key: "fromMonth", title: "From month", align: "left" },
    { key: "toMonth", title: "To month ", align: "right" },
    { key: "percentageChange", title: "Percentage changes", align: "right" },
  ];

  const userOptions = users.map((e) => {
    return { label: e.name, id: e.id };
  });

  return (
    <>
      <Grid container rowSpacing={3} style={{ padding: "20px" }}>
        {/* Section 1: Title */}
        <Grid
          container
          size={12}
          mb={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid size={6}>
            <SearchableInput
              placeholder="Select User"
              name="userId"
              label="Select User"
              data={userOptions}
              control={control}
            />
            <Typography mt={2} >
              Select a user to view their statistics
            </Typography>
          </Grid>
        </Grid>
        {userId && (
          <>
            <Grid size={12}>
              <Typography fontWeight={900} variant="h6">
                Prediction: ({prediction?.predictedNextMonthExpenditure} Rs.)
              </Typography>
            </Grid>
            <Grid size={12}>
              <Typography variant="h6">
                Statistics - Top 3 Days by Expenditure
              </Typography>
            </Grid>
            {/* Section 2: Table */}
            <ReusableTable
              label="top 3 days"
              columns={columns}
              data={top3Days}
            />
            <Grid size={12}>
              <Typography variant="h6">
                Statistics - Percentage Change
              </Typography>
            </Grid>
            <ReusableTable
              label="top 3 days"
              columns={percentageColumns}
              data={percentage}
            />
          </>
        )}
      </Grid>
    </>
  );
};

export default StatisticsPage;
