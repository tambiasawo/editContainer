import { useForm } from "react-hook-form";
import * as React from "react";
import styles from "../styles/Dialog.module.scss";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormControlLabel, Checkbox } from "@mui/material";
type userFormData = {
  id: number;
  name: string;
  age: number;
  date: Date;
  location: boolean;
  email: string;
  website: string;
  company: string;
};
interface Props {
  sendFormData: (newRow: FormData) => void;
}

export default function FormDialog({ sendFormData }: Props) {
  const [open, setOpen] = React.useState(false);
  const [formValues, setFormValues] = React.useState({});

  React.useEffect(() => {
    sendData();
  }, [formValues]);

  const sendData = () => {
    if (formValues && Object.keys(formValues).length > 0) {
      let id = Math.floor(Math.random() * 1000);

      const newRowValues: any = {
        ...formValues,
        id,
      };

      sendFormData(newRowValues);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const schema = Yup.object().shape({
    name: Yup.string().label("Name").min(2),
    age: Yup.number().max(120).required("Age is required"),
    website: Yup.string().required(),
    company: Yup.string().required(),
    email: Yup.string().email().required(""),
    dob: Yup.date()
      .min(new Date().toISOString().slice(0, 10))
      .required("Date is required"),
    location: Yup.boolean(),
  });
  const {
    register,
    handleSubmit,
    watch,
    getFieldState,
    formState: { errors, isDirty, touchedFields,isValid },
    getValues,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      age: "",
      email: "",
      website: "",
      company: "",
      location: false,
      dob: "",
    },
    mode: "onChange",
  });
  const submitHandler = (data: FormData) => {
    console.log(data);
    setFormValues(data);

    handleClose();
  };

  console.log(getFieldState("name"));
  console.log(touchedFields);
  return (
    <div className={styles.container}>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Row
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Row</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <form onSubmit={handleSubmit(submitHandler)}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              variant="outlined"
              error={!!errors.name}
              {...register("name", { required: true })}
              helperText={errors.name && errors.name?.message}
            />
            <TextField
              autoFocus
              margin="dense"
              id="age"
              label="Age"
              type="number"
              error={!!errors.age}
              variant="outlined"
              {...register("age", { required: true })}
              helperText={errors.age && "Pls enter your age"}
            />
            <TextField
              fullWidth
              autoFocus
              margin="dense"
              id="company"
              label="Company"
              type="string"
              error={!!errors.company}
              variant="outlined"
              {...register("company", { required: true })}
              helperText={errors.company && "Pls enter your company"}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              error={!!errors.email}
              variant="outlined"
              {...register("email", { required: true })}
              helperText={errors.email && "Pls enter your email address"}
            />
            <TextField
              autoFocus
              margin="dense"
              id="dob"
              type="date"
              fullWidth
              error={!!errors.dob}
              variant="outlined"
              {...register("dob", { required: true })}
              helperText={errors.dob && "Pls enter your dob"}
            />

            <TextField
              autoFocus
              margin="dense"
              id="website"
              label="Website URL"
              type="url"
              fullWidth
              error={!!errors.website}
              variant="outlined"
              {...register("website", { required: true })}
              helperText={errors.website && "Pls enter your name"}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Do you live in Vancouver?"
              id="location"
              {...register("location")}
            />

            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button
                type="submit"
                disabled={!isValid || !isDirty}
              >
                Add
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
