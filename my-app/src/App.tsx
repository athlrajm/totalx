// App.tsx

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { setUser, setLoading } from "./redux/reducers/authReducer";
import { auth } from "./firebase/firebase";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import PhoneVerification from "./components/PhoneVerification";
import OtpVerification from "./components/OtpVerification";
import CheckUserExistence from "./components/CheckUserExistence";
import Registration from "./components/Registration";
import Home from "./components/Home";

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(setUser(null));
      }
      dispatch(setLoading(false));
    });
    return () => unsubscribe(); // Cleanup function for useEffect
  }, [dispatch]);

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <Router>
      <div>
        {user && <button onClick={handleLogout}>Logout</button>}
        <Routes>
          <Route path="/phone-verification" element={<PhoneVerification />} />
          <Route path="/otp-verification" element={<OtpVerification />} />
          <Route path="/check-user" element={<CheckUserExistence />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={user ? <Navigate to="/home" /> : <Navigate to="/phone-verification" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
