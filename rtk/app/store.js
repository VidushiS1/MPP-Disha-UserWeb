import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import loginFormDataReducer from "../features/LoginForm/LoginSlice";
import getZoomAccessTokenReducer from "../features/ZoomApi/getZoomAccessTokenSlice";
import getZoomMeetingListDataReducer from "../features/ZoomApi/getZoomMeetingListDataSlice";
import getProfileDataReducer from "../features/Profile/getProfileDataSlice";
import getZoomMeetingDataByIdReducer from "../features/ZoomApi/getZoomMeetingDataByIdSlice";
import getCategoryListReducer from "../features/Scholarship/getCategoryListSlice";
import getNationalScholarshipListDataReducer from "../features/Scholarship/getNationalScholarshipListDataSlice";
import getScholarshipDataByIdReducer from "../features/Scholarship/getScholarshipDataByIdSlice";
import getStateScholarshipListDataReducer from "../features/Scholarship/getStateScholarshipListDataSlice";
import getCareerAdviceRequestListReducer from "../features/CareerAdvice/getCareerAdviceRequestListSlice";
import getCareerAdviceRequestByIdReducer from "../features/CareerAdvice/getCareerAdviceRequestByIdSlice";
import getGovJobsListDataReducer from "../features/JobManager/getGovJobsListDataSlice";
import getPrivateJobsListDataReducer from "../features/JobManager/getPrivateJobsListDataSlice";
import getGovJobsListDataByIdReducer from "../features/JobManager/getGovJobsListDataByIdSlice";
import getPrivateJobsListDataByIdReducer from "../features/JobManager/getPrivateJobsListDataByIdSlice";
import InstituteManagerListDataReducer from "../features/InstituteManager/getInstituteManagerListDataSlice";
import getInstituteManagerDataByIdReducer from "../features/InstituteManager/getInstituteManagerDataByIdSlice";


const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: [],
};

const reducer = combineReducers({
  loginFormData: loginFormDataReducer,
  getZoomAccessToken: getZoomAccessTokenReducer,
  getZoomMeetingListData: getZoomMeetingListDataReducer,
  getProfileData: getProfileDataReducer,
  getZoomMeetingDataById: getZoomMeetingDataByIdReducer,
  getCategoryList: getCategoryListReducer,
  getNationalScholarshipListData: getNationalScholarshipListDataReducer,
  getScholarshipDataById: getScholarshipDataByIdReducer,
  getStateScholarshipListData: getStateScholarshipListDataReducer,
  getCareerAdviceRequestList: getCareerAdviceRequestListReducer,
  getCareerAdviceRequestById: getCareerAdviceRequestByIdReducer,
  getPrivateJobsListData: getPrivateJobsListDataReducer,
  getGovJobsListData: getGovJobsListDataReducer,
  getPrivateJobsListDataById: getPrivateJobsListDataByIdReducer,
  getGovJobsListDataById: getGovJobsListDataByIdReducer,
  InstituteManagerListData: InstituteManagerListDataReducer,
  getInstituteManagerDataById: getInstituteManagerDataByIdReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

// export const store = configureStore({
//   reducer: persistedReducer,
// });

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
