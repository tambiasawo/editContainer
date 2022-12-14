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

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(2),
  age: Yup.number().max(120).required("Age is required"),
  website: Yup.string().required(),
  email: Yup.string().email().required(),
  dob: Yup.date()
    .min(new Date().toISOString().slice(0, 10))
    .required("Date is required"),
  location: Yup.boolean().required(),
});

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
    formik.setErrors({});
  };

  const handleClose = () => {
    //formik.setErrors({});
    //formik.resetForm({});
    setOpen(false);
  };

  //validateOnMount
  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      website: "",
      email: "",
      dob: "",
      location: "",
      company: "",
    },
    validationSchema,
    validateOnMount: false,
    onSubmit: (values, { resetForm }) => {
      console.log("formik.values");
      console.log({ values });
      setFormValues(values);
      resetForm({});
      handleClose();
    },
  });
  console.log(formik.values);
  console.log(formik.errors);

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
          <form onSubmit={formik.handleSubmit}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              variant="outlined"
              error={formik.touched.name && Boolean(formik.errors.name)}
              {...formik.getFieldProps("name")}
              helperText={
                formik.touched.name && formik.errors.name ? "wrong input" : ""
              }
            />
            <TextField
              autoFocus
              margin="dense"
              id="age"
              label="Age"
              type="number"
              error={formik.touched.age && Boolean(formik.errors.age)}
              variant="outlined"
              {...formik.getFieldProps("age")}
              helperText={formik.touched.age && formik.errors.age}
            />
            <TextField
              fullWidth
              autoFocus
              margin="dense"
              id="company"
              label="Company"
              type="string"
              error={formik.touched.age && Boolean(formik.errors.age)}
              variant="outlined"
              {...formik.getFieldProps("company")}
              helperText={formik.touched.company && formik.errors.company}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              error={formik.touched.email && Boolean(formik.errors.email)}
              variant="outlined"
              {...formik.getFieldProps("email")}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              autoFocus
              margin="dense"
              id="dob"
              type="date"
              fullWidth
              error={formik.touched.dob && Boolean(formik.errors.dob)}
              variant="outlined"
              {...formik.getFieldProps("dob")}
              helperText={formik.touched.dob && formik.errors.dob}
            />

            <TextField
              autoFocus
              margin="dense"
              id="website"
              label="Website URL"
              type="url"
              fullWidth
              error={formik.touched.website && Boolean(formik.errors.website)}
              variant="outlined"
              {...formik.getFieldProps("website")}
              helperText={formik.touched.website && formik.errors.website}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Do you live in Vancouver?"
              id="location"
              {...formik.getFieldProps("location")}
            />

            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button
                type="submit"
                disabled={!(formik.isValid && formik.dirty)}
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
