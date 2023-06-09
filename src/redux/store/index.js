import { configureStore } from "@reduxjs/toolkit";
import borrowerSlice from "../slices/borrowerSlice";
import debtStateSlice from "../slices/debtStateSlice";
import creditState from "../slices/creditState";
import chartSlice from "../slices/chartSlice";
import  profileStateSlice  from "../slices/profileSlice";

export default configureStore({
  reducer: {
    borrowers: borrowerSlice,
    debtState: debtStateSlice,
    creditState: creditState,
    chart: chartSlice,
    profile: profileStateSlice,
  },
});
