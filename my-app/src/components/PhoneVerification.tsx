import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setPhoneNumber, setLoading, setError } from "../redux/reducers/authReducer";
import { auth } from "../firebase/firebase";

const PhoneVerification = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const initialValues = {
    phoneNumber: "",
  };

  const validationSchema = Yup.object({
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, "Phone number is not valid")
      .required("Phone number is required"),
  });

  const onSubmit = async (values: { phoneNumber: string }) => {
    dispatch(setLoading(true));
    try {
      const appVerifier = new (window as any).firebase.auth.RecaptchaVerifier("recaptcha-container");
      await auth.signInWithPhoneNumber(values.phoneNumber, appVerifier);
      dispatch(setPhoneNumber(values.phoneNumber));
    } catch (error: any) { // Explicitly type 'error' to 'any'
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <h1>Phone Verification</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form>
          <div>
            <label htmlFor="phoneNumber">Phone Number</label>
            <Field type="text" id="phoneNumber" name="phoneNumber" />
            <ErrorMessage name="phoneNumber" component="div" />
          </div>
          <div id="recaptcha-container"></div>
          <button type="submit" disabled={loading}>
            {loading ? "Verifying..." : "Verify"}
          </button>
          {error && <div>{error}</div>}
        </Form>
      </Formik>
    </div>
  );
};

export default PhoneVerification;
