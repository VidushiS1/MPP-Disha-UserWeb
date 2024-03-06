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
import getInstituteManagerDataByIdReducer from "../features/InstituteManager/getInstituteManagerDataByIdSlice";
import getGovSectorListReducer from "../features/JobManager/getGovSectorListSlice"
import getPrivateSectorListReducer from "../features/JobManager/getPrivateSectorListSlice"
import getGovAgencyListDataReducer from "../features/JobManager/getGovAgencyListDataSlice";
import getSlotTimeDataListReducer from "../features/CareerAdvice/getSlotTimeDataListSlice";
import getCareerAdviceAgendaListReducer from "../features/CareerAdvice/getCareerAdviceAgendaListSlice";
import getCareerAdviceListDataReducer from "../features/CareerAdvice/getCareerAdviceListDataSlice";
import getBroadcastListDataReducer from "../features/Broadcast/getBroadcastListDataSlice";

import DisciplineManagerListDataReducer from "../features/FurtherEducation/getDisciplineManagerListDataSlice";
import getSubjectDataListReducer from "../features/FurtherEducation/getSubjectDataListSlice";
import getCourseListDataReducer from "../features/FurtherEducation/getCourseListDataSlice"
import getCourseTypeDataReducer from "../features/FurtherEducation/getCourseTypeDataSlice"
import InstituteManagerListDataReducer from "../features/FurtherEducation/getInstituteManagerListDataSlice"
import GetCityListReducer from "../features/FurtherEducation/GetCityListSlice";
import getFilterResultDataReducer from "../features/FurtherEducation/getFilterResultDataSlice"

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
  getGovSectorList: getGovSectorListReducer,
  getPrivateSectorList: getPrivateSectorListReducer,
  getGovAgencyListData:getGovAgencyListDataReducer,
  getSlotTimeDataList:getSlotTimeDataListReducer,
  getCareerAdviceAgendaList:getCareerAdviceAgendaListReducer,
  getCareerAdviceListData:getCareerAdviceListDataReducer,
  getBroadcastListData:getBroadcastListDataReducer,
  
  DisciplineManagerListData:DisciplineManagerListDataReducer,
  getSubjectDataList:getSubjectDataListReducer,
  getCourseListData:getCourseListDataReducer,
  getCourseTypeData:getCourseTypeDataReducer,
  GetCityList:GetCityListReducer,
  getFilterResultData:getFilterResultDataReducer,
  

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
