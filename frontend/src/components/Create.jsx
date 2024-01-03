import React from "react";
import { Box, Button, Typography } from "@mui/material";
import MyDatePickerField from "./forms/MyDatePickerField";
import MyMultilineTextField from "./forms/MyMultilineField";
import MySelectField from "./forms/MySelectField";
import MyTextFields from "./forms/MyTextField";
import { useForm } from "react-hook-form";
import AxiosInstance from "./Axios";
import dayjs from 'dayjs';
import {useNavigate} from 'react-router-dom'

const Create = () => {

  const navigate = useNavigate()

  const defaultValues = {
    name: '',
    comments: '',
    status: '',
  }
  const { handleSubmit, reset, setValue, control } = useForm({defaultValues:defaultValues});

  const submission = (data) => {

    const StartDate = dayjs(data.start_date['$d']).format('YYYY-MM-DD')
    const EndDate = dayjs(data.end_date['$d']).format('YYYY-MM-DD')

    AxiosInstance.post(
      `project/`, {
        name: data.name,
        status: data.status,
        comments: data.comments,
        start_date: StartDate,
        end_date: EndDate,
      }
    )
    .then((res) =>{
      navigate(`/`)
    })
  }


  return (
    <div>
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
            />
            <Box sx={{ width: "30%" }}>
              <Button variant="contained" type="submit" sx={{width:'100%'}}>Submit</Button>
            </Box>
          </Box>
        </Box>
      </form>
    </div>
  );
};

export default Create;