import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  useTheme,
  Alert,
  Snackbar,
  LinearProgress
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { DatePicker } from "@mui/x-date-pickers";
import { LoadingButton } from "@mui/lab";
import moment from "moment";
import { useSendPhotoMutation } from "../../redux/endPoints/image/image";
import { useSelector } from "react-redux";

const UploadPhoto = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const progress = useSelector(state => state?.image?.progress);
  const [sendPhoto, {data, isLoading, isError, error, isSuccess}] = useSendPhotoMutation();
  const [file, setFile] = useState('');
  const [name,setName] = useState('');
  const [roll, setRoll] = useState('');
  const [caption, setCaption] = useState('');
  const [description, setDescription] = useState('');
  const [place, setPlace] = useState('');
  const [date,setDate] = useState(moment(new Date().toISOString()));
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', name);
    form.append('file', file);
    form.append('roll', roll);
    form.append('caption', caption);
    form.append('description', description);
    form.append('place', place);
    form.append('date', date.toISOString());
    sendPhoto({
      url: import.meta.env.VITE_APP_API,
      data: form,
    });
    // console.log(file,name,roll,caption,description,place,date);
  }  

  useEffect(() => {
    if(isSuccess){
      setOpen(true);
      setName('');
      setFile('');
      setRoll('');
      setCaption('');
      setDescription('');
      setPlace('');
    }
  }, [isSuccess]);
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
      <Header title={"Submit Your Photo to HUTUM"} />
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
        {/* Name */}
        <TextField
          required
          label="Full Name"
          error={error?.data?.name}
          helperText={error?.data?.name ? error?.data?.name?.msg :"Certificate Name"}
          value={name}
          onChange={(e) => setName(e.target.value)}
          InputLabelProps={{
            style: {
              color: theme.palette.text.primary,
              fontSize: "17px",
              borderColor: theme.palette.text.primary,
            },
          }}
        />
        {/* Roll */}
        <TextField
          required
          value={roll}
          onChange={(e) => setRoll(e.target.value)}
          label="Roll Number"
          type="number"
          error={error?.data?.roll}
          helperText={error?.data?.roll ? error?.data?.roll?.msg :"KUET Roll Number"}
          InputLabelProps={{
            style: {
              color: theme.palette.text.primary,
              fontSize: "17px",
              borderColor: theme.palette.text.primary,
            },
          }}
        />
        {/* Caption */}
        <TextField
          required
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          label="Caption"
          error={error?.data?.caption}
          helperText={error?.data?.caption ? error?.data?.caption?.msg :"Your caption of the photo"}
          InputLabelProps={{
            style: {
              color: theme.palette.text.primary,
              fontSize: "17px",
              borderColor: theme.palette.text.primary,
            },
          }}
        />
        {/* Description */}
        <TextField
          label="Feelings"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={error?.data?.description}
          helperText={error?.data?.description ? error?.data?.description?.msg :"Express why you captured that moment"}
          InputLabelProps={{
            style: {
              color: theme.palette.text.primary,
              fontSize: "17px",
              borderColor: theme.palette.text.primary,
            },
          }}
        />
        {/* Place */}
        <TextField
          label="Place"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          error={error?.data?.place}
          helperText={error?.data?.place ? error?.data?.place?.msg :"Where did you capture this photo"}
          required
          InputLabelProps={{
            style: {
              color: theme.palette.text.primary,
              fontSize: "17px",
              borderColor: theme.palette.text.primary,
            },
          }}
        />
        {/* Date Picker */}
        <DatePicker
          value={date}
          onChange={(newValue) => setDate(newValue)}  
          sx={{
            label: {
              color: theme.palette.text.primary,
              fontSize: "17px",
              borderColor: theme.palette.text.primary,
            },
            svg: {
              color: "#ff1a1a",
            },
          }}
          label="Capture Date"
        />
        <Box width={"320px"}>
          <Button
            sx={{ width: "100%", borderColor: error?.data?.file ? 'red' : theme.palette.text.primary }}
            variant="outlined"
            component="label"
          >
            <Typography color={error?.data?.file ? 'red' : theme.palette.text.primary}>
              Upload Photo
            </Typography>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              accept="image/*"
              hidden
            />
          </Button>
          {file && <Typography textAlign={"right"}>{file?.name}</Typography>}
          {error?.data?.file && <Typography textAlign={"left"} color={'red'}>{error?.data?.file?.msg}</Typography>}
        </Box>
        <LoadingButton loading={isLoading} type="submit" color="success" variant="contained" >
          Submit
        </LoadingButton>
        <Box width={'100%'}>
          {progress && <LinearProgress variant="determinate" color="success" value={progress} />}
          {progress && <Typography textAlign={'center'}>Uploading {progress}%</Typography>}
        </Box>
      </Box>
      <Snackbar open={open} autoHideDuration={10000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%' }}>
          {data?.msg}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UploadPhoto;
