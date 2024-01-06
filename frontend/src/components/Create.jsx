import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import MyDatePickerField from "./forms/MyDatePickerField";
import MyMultilineTextField from "./forms/MyMultilineField";
import MySelectField from "./forms/MySelectField";
import MyTextField from "./forms/MyTextField";
import { useForm } from "react-hook-form";
import AxiosInstance from "./Axios";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Create = () => {
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
  //Form validation using Yup
  const schema = yup.object({
    name: yup.string().required("Name is a required field"),
    projectmanager: yup
      .string()
      .required("Project Manager is a required field"),
    status: yup.string().required("Status is a required field"),
    comments: yup.string(),
    start_date: yup.date().required("Start Date is a required field"),
    end_date: yup.date().required("End Date is a required field"),
  });

  const { handleSubmit, control } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema), //Resolving missing or if the form is valid on trying to submit.
  });

  const submission = (data) => {
    const StartDate = dayjs(data.start_date["$d"]).format("YYYY-MM-DD");
    const EndDate = dayjs(data.end_date["$d"]).format("YYYY-MM-DD");

    AxiosInstance.post(`project/`, {
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
              justifyContent: "space-between",
              width: "100%",
              backgroundColor: "#00003f",
              marginBottom: "10px",
            }}
          >
            <Typography sx={{ marginLeft: "20px", color: "#fff" }}>
              Create Records
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
              <MyTextField
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
                options={select_options}
                control={control}
                width={"30%"}
              />

              <MySelectField
                label="Project Manager"
                name="projectmanager"
                options={projectManager}
                control={control}
                width={"30%"}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                marginTop: "40px",
              }}
            >
              <Button variant="contained" type="submit" sx={{ width: "30%" }}>
                Submit
              </Button>
            </Box>
          </Box>
        </form>
      )}
    </div>
  );
};

export default Create;
