import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setOtp, setLoading, setError, setUser } from "../redux/reducers/authReducer";
import { auth } from "../firebase/firebase";

const OtpVerification = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const initialValues = {
    otp: "",
  };

  const validationSchema = Yup.object({
    otp: Yup.string()
      .matches(/^\d{6}$/, "OTP is not valid")
      .required("OTP is required"),
  });

  const onSubmit = async (values: { otp: string }) => {
    dispatch(setLoading(true));
    try {
      const confirmationResult = (auth as any).confirmationResult;
      const result = await confirmationResult.confirm(values.otp);
      dispatch(setUser(result.user));
    } catch (error: any) { // Explicitly type 'error' to 'any'
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <h1>OTP Verification</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form>
          <div>
            <label htmlFor="otp">OTP</label>
            <Field type="text" id="otp" name="otp" />
            <ErrorMessage name="otp" component="div" />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
          {error && <div>{error}</div>}
        </Form>
      </Formik>
    </div>
  );
};

export default OtpVerification;
