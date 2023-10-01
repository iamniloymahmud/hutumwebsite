import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  useTheme,
  Alert,
  Snackbar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { DatePicker } from "@mui/x-date-pickers";
import { LoadingButton } from "@mui/lab";
import moment from "moment";
import { useSendPhotoMutation } from "../../redux/endPoints/image/image";
import { useSendEmailMutation } from "../../redux/endPoints/mail/mail";

const MailHome = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [sendEmail, { data, isLoading, error, isSuccess }] =
    useSendEmailMutation();
  const handleSubmit = (e) => {
    e.preventDefault();
    sendEmail(email);
    // console.log(file,name,roll,caption,description,place,date);
  };

  useEffect(() => {
    if (isSuccess) {
      setOpen(true);
      setEmail("");
    }
  }, [isSuccess]);
  console.log(error);
  return (
    <Container
      mx={"auto"}
      sx={{
        alignItems: "center",
        flexDirection: "column",
        display: "flex",
        my: "4.5rem",
        py: "2rem",
      }}
    >
      <Header title={"Add Your KUET Mail to HUTUM Server"} />
      <Box
        component="form"
        onSubmit={(e) => handleSubmit(e)}
        sx={{
          "& .MuiTextField-root": { width: "320px" },
          display: "flex",
          flexDirection: "column",
          borderRadius: "0.55rem",
          pt: 2,
          alignItems: "center",
        }}
        noValidate
        autoComplete="off"
        gap={1.75}
      >
        {/* Email */}
        <TextField
          required
          label="Enter KUET Mail"
          error={error?.data?.email}
          color={"primary"}
          helperText={
            error?.data?.email?.msg
              ? error?.data?.email?.msg
              : data?.email?.msg
              ? data?.email?.msg
              : "Ex: name*******@stud.kuet.ac.bd"
          }
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputLabelProps={{
            style: {
              color: theme.palette.text.primary,
              fontSize: "17px",
              borderColor: theme.palette.text.primary,
            },
          }}
        />
        <LoadingButton
          loading={isLoading}
          type="submit"
          color="success"
          variant="contained"
        >
          Submit
        </LoadingButton>
      </Box>
    </Container>
  );
};

export default MailHome;
