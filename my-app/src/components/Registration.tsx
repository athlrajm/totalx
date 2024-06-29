import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setLoading, setError } from "../redux/reducers/authReducer";
import { firestore, auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
  });

  const onSubmit = async (values: { name: string; email: string }) => {
    dispatch(setLoading(true));
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const { uid } = currentUser;
        const userRef = firestore.collection("users").doc(uid);
        
        await userRef.set({
          name: values.name,
          email: values.email,
          phoneNumber: currentUser.phoneNumber || "", // Access phoneNumber if available
        });

        navigate("/home");
      } else {
        throw new Error("User not authenticated.");
      }
    } catch (error: any) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <h1>Registration</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form>
          <div>
            <label htmlFor="name">Name</label>
            <Field type="text" id="name" name="name" />
            <ErrorMessage name="name" component="div" />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage name="email" component="div" />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
          {error && <div>{error}</div>}
        </Form>
      </Formik>
    </div>
  );
};

export default Registration;
