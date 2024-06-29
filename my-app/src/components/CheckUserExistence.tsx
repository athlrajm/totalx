import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setLoading } from "../redux/reducers/authReducer";
import { firestore, auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

const CheckUserExistence = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      dispatch(setLoading(true));
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const { uid } = currentUser;
          const userRef = firestore.collection("users").doc(uid);
          const doc = await userRef.get();
          if (doc.exists) {
            navigate("/home");
          } else {
            navigate("/register");
          }
        } else {
          throw new Error("User not authenticated.");
        }
      } catch (error: any) {
        console.error("Error checking user existence:", error);
       
      } finally {
        dispatch(setLoading(false));
      }
    };

    checkUser();
  }, [dispatch, navigate]);

  return (
    <div>
      <h1>Checking User Existence...</h1>
      
    </div>
  );
};

export default CheckUserExistence;
