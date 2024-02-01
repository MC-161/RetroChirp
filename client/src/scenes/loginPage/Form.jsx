import { useState } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  game: yup.string().required("Game is required"),
  platform: yup.string().required("Platform is required"),
  picture: yup.mixed().required("Profile picture is required"),
  twitter: yup.string().notRequired(),
  instagram: yup.string().notRequired(),
});

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const apiUrl = process.env.REACT_APP_API_URL;

  const register = async (values, onSubmitProps) => {
    const formData = new FormData();
    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("game", values.game);
    formData.append("platform", values.platform);
    formData.append("picture", values.picture); // Use 'picture' as the key
    formData.append("twitter", values.twitter || "");
    formData.append("instagram", values.instagram || "");

    try {
      const response = await fetch(`${apiUrl}/auth/register`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data) {
        setPageType("login");
        onSubmitProps.resetForm();
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        game: "",
        platform: "",
        picture: null,
        twitter: "",
        instagram: "",
      }}
      validationSchema={registerSchema}
      onSubmit={(values, onSubmitProps) => register(values, onSubmitProps)}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(2, minmax(0, 1fr))"
          >
            {/* First Name */}
            <TextField
              label="First Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.firstName}
              name="firstName"
              error={touched.firstName && Boolean(errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />
            {/* Last Name */}
            <TextField
              label="Last Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.lastName}
              name="lastName"
              error={touched.lastName && Boolean(errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
            {/* Email */}
            <TextField
              label="Email"
              type="email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
            {/* Password */}
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />
            {/* Game */}
            <TextField
              label="Game"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.game}
              name="game"
              error={touched.game && Boolean(errors.game)}
              helperText={touched.game && errors.game}
            />
            {/* Platform */}
            <TextField
              label="Platform"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.platform}
              name="platform"
              error={touched.platform && Boolean(errors.platform)}
              helperText={touched.platform && errors.platform}
            />
            {/* Twitter */}
            <TextField
              label="Twitter (optional)"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.twitter}
              name="twitter"
              error={touched.twitter && Boolean(errors.twitter)}
              helperText={touched.twitter && errors.twitter}
            />
            {/* Instagram */}
            <TextField
              label="Instagram (optional)"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.instagram}
              name="instagram"
              error={touched.instagram && Boolean(errors.instagram)}
              helperText={touched.instagram && errors.instagram}
            />
          </Box>

          {/* Dropzone for Profile Picture */}
          <Dropzone
            accept="image/jpeg, image/png"
            onDrop={(acceptedFiles) =>
              setFieldValue("picture", acceptedFiles[0])
            }
          >
            {({ getRootProps, getInputProps }) => (
              <Box {...getRootProps()} sx={{ outline: "none" }}>
                <input {...getInputProps()} />
                {values.picture ? (
                  <Typography>{values.picture.name}</Typography>
                ) : (
                  <Typography>
                    Drag 'n' drop a profile picture here, or click to select a
                    file
                  </Typography>
                )}
              </Box>
            )}
          </Dropzone>
          {/* Display validation errors for picture */}
          {touched.picture && errors.picture && (
            <Typography color="error">{errors.picture}</Typography>
          )}

          {/* Submit Button */}
          <Button type="submit">Register</Button>
        </form>
      )}
    </Formik>
  );
};

export default Form;
