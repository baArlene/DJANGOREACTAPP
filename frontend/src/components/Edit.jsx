import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import MyDatePickerField from "./forms/MyDatePickerField";
import MyMultilineTextField from "./forms/MyMultilineField";
import MySelectField from "./forms/MySelectField";
import MyTextFields from "./forms/MyTextField";
import { useForm } from "react-hook-form";
import AxiosInstance from "./Axios";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const MyParam = useParams();
  const MyId = MyParam.id;

  const [projectManager, setProjectManager] = useState();
  const [loading, setLoading] = useState(true);

  const select_options = [
    { id: "", name: "None" },
    { id: "Open", name: "Open" },
    { id: "In Progress", name: "In Progress" },
    { id: "Completed", name: "Completed" },
  ];

  const GetData = () => {
    AxiosInstance.get(`projectmanager/`).then((res) => {
      setProjectManager(res.data);
      console.log(res.data);
    });

    AxiosInstance.get(`project/${MyId}`).then((res) => {
      console.log(res.data);
      setValue("name", res.data.name);
      setValue("status", res.data.status);
      setValue("projectmanager", res.data.projectmanager);
      setValue("comments", res.data.comments);
      setValue("start_date", dayjs(res.data.start_date));
      setValue("end_date", dayjs(res.data.end_date));
      setLoading(false);
    });
  };

  useEffect(() => {
    GetData();
  }, []);

  const navigate = useNavigate();

  const defaultValues = {
    name: "",
    comments: "",
    status: "",
  };
  const { handleSubmit, reset, setValue, control } = useForm({
    defaultValues: defaultValues,
  });

  const submission = (data) => {
    const StartDate = dayjs(data.start_date["$d"]).format("YYYY-MM-DD");
    const EndDate = dayjs(data.end_date["$d"]).format("YYYY-MM-DD");

    AxiosInstance.put(`project/${MyId}/`, {
      name: data.name,
      projectmanager: data.projectmanager,
      status: data.status,
      comments: data.comments,
      start_date: StartDate,
      end_date: EndDate,
    }).then((res) => {
      navigate(`/`);
    });
  };

  return (
    <div>
      {loading ? (
        <p>Loading Data......</p>
      ) : (
        <form onSubmit={handleSubmit(submission)}>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              backgroundColor: "#00003f",
              marginBottom: "10px",
            }}
          >
            <Typography sx={{ marginLeft: "20px", color: "#fff" }}>
              Edit Project:
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              width: "100%",
              boxShadow: 3,
              padding: 4,
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                marginBottom: "40px",
              }}
            >
              <MyTextFields
                label="Name"
                name="name"
                control={control}
                placeholder="Project Name"
                width={"30%"}
              />

              <MyDatePickerField
                label="Start Date"
                name="start_date"
                control={control}
                width={"30%"}
              />

              <MyDatePickerField
                label="End Date"
                name="end_date"
                control={control}
                width={"30%"}
              />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <MyMultilineTextField
                label="Comments"
                name="comments"
                control={control}
                placeholder="Provide Comments"
                width={"30%"}
              />

              <MySelectField
                label="Status"
                name="status"
                control={control}
                width={"30%"}
                options={select_options}
              />

              <MySelectField
                label="Project Manager"
                name="projectmanager"
                control={control}
                width={"30%"}
                options={projectManager}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                marginTop: "40px",
              }}
            >
              <Button variant="contained" type="submit" sx={{ width: "100%" }}>
                Update
              </Button>
            </Box>
          </Box>
        </form>
      )}
    </div>
  );
};

export default Edit;
