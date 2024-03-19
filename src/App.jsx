// import React, { useState, useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Outlet,
//   Navigate,
// } from "react-router-dom";
// import SideNavber from "./components/SideNavber/SideNavber";
// import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
// import LoginFrom from "./components/LoginFrom/LoginFrom";
// import ForgetPassword from "./components/LoginFrom/ForgetPassword";
// import ConfirmOTP from "./components/LoginFrom/ConfirmOTP";
// import ConfirmPassword from "./components/LoginFrom/ConfirmPassword";
// import TopNavbar from "./components/TopNavbar/TopNavbar";
// import BroadcastScheduledAllCard from "./components/Broadcast/BroadcastScheduledAllCard";
// import ViewBroadcastScheduled from "./components/Broadcast/ViewBroadcastScheduled";
// import PageNotFound from "./components/404ErrorPageNotFound/PageNotFound";
// import ScholarshipAllCard from "./components/Scholarship/ScholarshipAllCard";
// import ViewScholarship from "./components/Scholarship/ViewScholarship";
// import CareerAdviceRequest from "./components/CareerAdvice/CareerAdviceRequest";
// import AddCareerAdvice from "./components/CareerAdvice/ViewCareerAdvice";
// import JobManagerAllCardSection from "./components/JobManager/JobManagerAllCardSection";
// import ViewJobDetails from "./components/JobManager/ViewJobDetails";
// import ViewPrivateJobDetails from "./components/JobManager/ViewPrivateJobDetails";
// import AllVideoSessionCard from "./components/VideoSession/AllVideoSessionCard";
// import EditCareerAdvice from "./components/CareerAdvice/EditCareerAdvice";
// import StudentProfile from "./components/FurtherEducation/StudentProfile";
// import SignUp from "./components/LoginFrom/SignUp";
// import StudentRegistrationForm from "./components/LoginFrom/StudentRegistrationForm";
// import RegistrationInformationForm from "./components/RegistrationForm/RegistrationInformationForm";
// import QualificationForm from "./components/RegistrationForm/QualificationForm";
// import BelowEighthForm from "./components/RegistrationForm/BelowEighthForm";
// import BelowTenthForm from "./components/RegistrationForm/BelowTenthForm";
// import ClassTwelfthForm from "./components/RegistrationForm/ClassTwelfthForm";
// import ClassTenthForm from "./components/RegistrationForm/ClassTenthForm";
// import UnderGraduationDiplomaForm from "./components/RegistrationForm/UnderGraduationDiplomaForm";
// import UnderGraduationForm from "./components/RegistrationForm/UnderGraduationForm";
// import PostGraduationForm from "./components/RegistrationForm/PostGraduationForm";
// import JobSeekerForm from "./components/RegistrationForm/JobSeekerForm";
// import HobbiesForm from "./components/RegistrationForm/HobbiesForm";

// function App() {


//   const PrivateRoute = ({ isAuthenticated, ...props }) => {
//     const token = localStorage.getItem("token");
//     return token ? (
//       <>
//         <SideNavber />
//         <Outlet />
//       </>
//     ) : (
//       <Navigate replace to="/login" />
//     );
//   };

//   return (
//     <Router>
//       <div className="flex">
//         <ScrollToTop />
//         <Routes>
//           <Route path="/*" element={<PageNotFound />} />
//           <Route path="/login" element={ <LoginFrom />} />
//           <Route path="/sign-up" element={<SignUp />} />
//           <Route path="/forget-password" element={<ForgetPassword />} />
//           <Route path="/confirm-otp" element={<ConfirmOTP />} />
//           <Route path="/confirm-password" element={<ConfirmPassword />} />
//           <Route
//             path="/student-registration"
//             element={<StudentRegistrationForm />}
//           />
//           <Route
//             path="/student-registration-information-form"
//             element={<RegistrationInformationForm />}
//           />
//           <Route
//             path="/student-select-qualification"
//             element={<QualificationForm />}
//           />
//           <Route path="/student-below-eighth" element={<BelowEighthForm />} />
//           <Route path="/student-below-tenth" element={<BelowTenthForm />} />
//           <Route path="/student-class-tenth" element={<ClassTenthForm />} />
//           <Route
//             path="/student-class-twelfth"
//             element={<ClassTwelfthForm />}
//           />
//           <Route
//             path="/student-under-graduation-diploma"
//             element={<UnderGraduationDiplomaForm />}
//           />
//           <Route
//             path="/student-under-graduation"
//             element={<UnderGraduationForm />}
//           />
//           <Route
//             path="/student-post-graduation"
//             element={<PostGraduationForm />}
//           />
//           <Route path="/student-job-seeker" element={<JobSeekerForm />} />
//           <Route path="/student-hobbies" element={<HobbiesForm />} />
//           <Route path="/" element={<PrivateRoute isAuthenticated={""} />}>
//             <Route
//               path="/"
//               element={
//                 <>
//                   <div className="h-screen flex flex-col w-full">
//                     <div className="">
//                       <TopNavbar />
//                     </div>
//                     <div className="flex-1 p-7 scrollable-content ">
//                       <StudentProfile />
//                     </div>
//                   </div>
//                 </>
//               }
//             />
//           </Route>
//           <Route
//               path="/broadcast-scheduled-all-card"
//               element={<PrivateRoute isAuthenticated={""} />}
//             >
//               <Route
//                 path="/broadcast-scheduled-all-card"
//                 element={
//                   <>
//                     <div className="h-screen flex flex-col w-full">
//                       <div className="">
//                         <TopNavbar />
//                       </div>
//                       <div className="flex-1 p-7 scrollable-content second-main-container-contant-section">
//                         <BroadcastScheduledAllCard />
//                       </div>
//                     </div>
//                   </>
//                 }
//               />
//             </Route>
//             <Route
//               path="/view-broadcast-scheduled"
//               element={<PrivateRoute isAuthenticated={""} />}
//             >
//               <Route
//                 path="/view-broadcast-scheduled"
//                 element={
//                   <>
//                     <div className="h-screen flex flex-col w-full">
//                       <div className="">
//                         <TopNavbar />
//                       </div>
//                       <div className="flex-1 p-7 scrollable-content ">
//                         <ViewBroadcastScheduled />
//                       </div>
//                     </div>
//                   </>
//                 }
//               />
//             </Route>
//             <Route
//               path="/all-scholarship-cards"
//               element={<PrivateRoute isAuthenticated={""} />}
//             >
//               <Route
//                 path="/all-scholarship-cards"
//                 element={
//                   <>
//                     <div className="h-screen flex flex-col w-full">
//                       <div className="">
//                         <TopNavbar />
//                       </div>
//                       <div className="flex-1 p-7 scrollable-content second-main-container-contant-section ">
//                         <ScholarshipAllCard />
//                       </div>
//                     </div>
//                   </>
//                 }
//               />
//             </Route>
//             <Route
//               path="/view-scholarship"
//               element={<PrivateRoute isAuthenticated={""} />}
//             >
//               <Route
//                 path="/view-scholarship"
//                 element={
//                   <>
//                     <div className="h-screen flex flex-col w-full">
//                       <div className="">
//                         <TopNavbar />
//                       </div>
//                       <div className="flex-1 p-7 scrollable-content">
//                         <ViewScholarship />
//                       </div>
//                     </div>
//                   </>
//                 }
//               />
//             </Route>
//             <Route
//               path="/career-advice-request"
//               element={<PrivateRoute isAuthenticated={""} />}
//             >
//               <Route
//                 path="/career-advice-request"
//                 element={
//                   <>
//                     <div className="h-screen flex flex-col w-full">
//                       <div className="">
//                         <TopNavbar />
//                       </div>
//                       <div className="flex-1 p-7 scrollable-content second-main-container-contant-section ">
//                         <CareerAdviceRequest />
//                       </div>
//                     </div>
//                   </>
//                 }
//               />
//             </Route>
//             <Route
//               path="/add-career-advice"
//               element={<PrivateRoute isAuthenticated={""} />}
//             >
//               <Route
//                 path="/add-career-advice"
//                 element={
//                   <>
//                     <div className="h-screen flex flex-col w-full">
//                       <div className="">
//                         <TopNavbar />
//                       </div>
//                       <div className="flex-1 p-7 scrollable-content">
//                         <AddCareerAdvice />
//                       </div>
//                     </div>
//                   </>
//                 }
//               />
//             </Route>

//             <Route
//               path="/edit-career-advice"
//               element={<PrivateRoute isAuthenticated={""} />}
//             >
//               <Route
//                 path="/edit-career-advice"
//                 element={
//                   <>
//                     <div className="h-screen flex flex-col w-full">
//                       <div className="">
//                         <TopNavbar />
//                       </div>
//                       <div className="flex-1 p-7 scrollable-content">
//                         <EditCareerAdvice />
//                       </div>
//                     </div>
//                   </>
//                 }
//               />
//             </Route>

//             <Route
//               path="/job-manager"
//               element={<PrivateRoute isAuthenticated={""} />}
//             >
//               <Route
//                 path="/job-manager"
//                 element={
//                   <>
//                     <div className="h-screen flex flex-col w-full">
//                       <div className="">
//                         <TopNavbar />
//                       </div>
//                       <div className="flex-1 p-7 scrollable-content second-main-container-contant-section  ">
//                         <JobManagerAllCardSection />
//                       </div>
//                     </div>
//                   </>
//                 }
//               />
//             </Route>
//             <Route
//               path="/view-job-details"
//               element={<PrivateRoute isAuthenticated={""} />}
//             >
//               <Route
//                 path="/view-job-details"
//                 element={
//                   <>
//                     <div className="h-screen flex flex-col w-full">
//                       <div className="">
//                         <TopNavbar />
//                       </div>
//                       <div className="flex-1 p-7 scrollable-content  ">
//                         <ViewJobDetails />
//                       </div>
//                     </div>
//                   </>
//                 }
//               />
//             </Route>
//             <Route
//               path="/view-private-job-details"
//               element={<PrivateRoute isAuthenticated={""} />}
//             >
//               <Route
//                 path="/view-private-job-details"
//                 element={
//                   <>
//                     <div className="h-screen flex flex-col w-full">
//                       <div className="">
//                         <TopNavbar />
//                       </div>
//                       <div className="flex-1 p-7 scrollable-content  ">
//                         <ViewPrivateJobDetails />
//                       </div>
//                     </div>
//                   </>
//                 }
//               />
//             </Route>
//             <Route
//               path="/all-card-video-session"
//               element={<PrivateRoute isAuthenticated={""} />}
//             >
//               <Route
//                 path="/all-card-video-session"
//                 element={
//                   <>
//                     <div className="h-screen flex flex-col w-full">
//                       <div className="">
//                         <TopNavbar />
//                       </div>
//                       <div className="flex-1 p-7 scrollable-content  second-main-container-contant-section ">
//                         <AllVideoSessionCard />
//                       </div>
//                     </div>
//                   </>
//                 }
//               />
//             </Route>
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SideNavber from "./components/SideNavber/SideNavber";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import LoginFrom from "./components/LoginFrom/LoginFrom";
import ForgetPassword from "./components/LoginFrom/ForgetPassword";
import ConfirmOTP from "./components/LoginFrom/ConfirmOTP";
import ConfirmPassword from "./components/LoginFrom/ConfirmPassword";
import TopNavbar from "./components/TopNavbar/TopNavbar";
import BroadcastScheduledAllCard from "./components/Broadcast/BroadcastScheduledAllCard";
import ViewBroadcastScheduled from "./components/Broadcast/ViewBroadcastScheduled";
import PageNotFound from "./components/404ErrorPageNotFound/PageNotFound";
import ScholarshipAllCard from "./components/Scholarship/ScholarshipAllCard";
import ViewScholarship from "./components/Scholarship/ViewScholarship";
import CareerAdviceRequest from "./components/CareerAdvice/CareerAdviceRequest";
import AddCareerAdvice from "./components/CareerAdvice/ViewCareerAdvice";
import JobManagerAllCardSection from "./components/JobManager/JobManagerAllCardSection";
import ViewJobDetails from "./components/JobManager/ViewJobDetails";
import ViewPrivateJobDetails from "./components/JobManager/ViewPrivateJobDetails";
import AllVideoSessionCard from "./components/VideoSession/AllVideoSessionCard";
import EditCareerAdvice from "./components/CareerAdvice/EditCareerAdvice";
import StudentProfile from "./components/FurtherEducation/StudentProfile";
import SignUp from "./components/LoginFrom/SignUp";
import StudentRegistrationForm from "./components/LoginFrom/StudentRegistrationForm";
import RegistrationInformationForm from "./components/RegistrationForm/RegistrationInformationForm";
import QualificationForm from "./components/RegistrationForm/QualificationForm";
import BelowEighthForm from "./components/RegistrationForm/BelowEighthForm";
import BelowTenthForm from "./components/RegistrationForm/BelowTenthForm";
import ClassTwelfthForm from "./components/RegistrationForm/ClassTwelfthForm";
import ClassTenthForm from "./components/RegistrationForm/ClassTenthForm";
import UnderGraduationDiplomaForm from "./components/RegistrationForm/UnderGraduationDiplomaForm";
import UnderGraduationForm from "./components/RegistrationForm/UnderGraduationForm";
import PostGraduationForm from "./components/RegistrationForm/PostGraduationForm";
import JobSeekerForm from "./components/RegistrationForm/JobSeekerForm";
import HobbiesForm from "./components/RegistrationForm/HobbiesForm";

function App() {
  const routes = [
    { path: "/", element: <PrivateRoute isAuthenticated={""} />, children: [
      { path: "/", element: <StudentProfile /> }
    ]},
    { path: "/broadcast-scheduled-all-card", element: <PrivateRoute isAuthenticated={""} />, children: [
      { path: "/", element: <BroadcastScheduledAllCard /> }
    ]},
    { path: "/view-broadcast-scheduled", element: <PrivateRoute isAuthenticated={""} />, children: [
      { path: "/", element: <ViewBroadcastScheduled /> }
    ]},
    { path: "/all-scholarship-cards", element: <PrivateRoute isAuthenticated={""} />, children: [
      { path: "/", element: <ScholarshipAllCard /> }
    ]},
    { path: "/view-scholarship", element: <PrivateRoute isAuthenticated={""} />, children: [
      { path: "/", element: <ViewScholarship /> }
    ]},
    { path: "/career-advice-request", element: <PrivateRoute isAuthenticated={""} />, children: [
      { path: "/", element: <CareerAdviceRequest /> }
    ]},
    { path: "/add-career-advice", element: <PrivateRoute isAuthenticated={""} />, children: [
      { path: "/", element: <AddCareerAdvice /> }
    ]},
    { path: "/edit-career-advice", element: <PrivateRoute isAuthenticated={""} />, children: [
      { path: "/", element: <EditCareerAdvice /> }
    ]},
    { path: "/job-manager", element: <PrivateRoute isAuthenticated={""} />, children: [
      { path: "/", element: <JobManagerAllCardSection /> }
    ]},
    { path: "/view-job-details", element: <PrivateRoute isAuthenticated={""} />, children: [
      { path: "/", element: <ViewJobDetails /> }
    ]},
    { path: "/view-private-job-details", element: <PrivateRoute isAuthenticated={""} />, children: [
      { path: "/", element: <ViewPrivateJobDetails /> }
    ]},
    { path: "/all-card-video-session", element: <PrivateRoute isAuthenticated={""} />, children: [
      { path: "/", element: <AllVideoSessionCard /> }
    ]},
    { path: "/login", element: <LoginFrom /> },
    { path: "/sign-up", element: <SignUp /> },
    { path: "/forget-password", element: <ForgetPassword /> },
    { path: "/confirm-otp", element: <ConfirmOTP /> },
    { path: "/confirm-password", element: <ConfirmPassword /> },
    { path: "/student-registration", element: <StudentRegistrationForm /> },
    { path: "/student-registration-information-form", element: <RegistrationInformationForm /> },
    { path: "/student-select-qualification", element: <QualificationForm /> },
    { path: "/student-below-eighth", element: <BelowEighthForm /> },
    { path: "/student-below-tenth", element: <BelowTenthForm /> },
    { path: "/student-class-tenth", element: <ClassTenthForm /> },
    { path: "/student-class-twelfth", element: <ClassTwelfthForm /> },
    { path: "/student-under-graduation-diploma", element: <UnderGraduationDiplomaForm /> },
    { path: "/student-under-graduation", element: <UnderGraduationForm /> },
    { path: "/student-post-graduation", element: <PostGraduationForm /> },
    { path: "/student-job-seeker", element: <JobSeekerForm /> },
    { path: "/student-hobbies", element: <HobbiesForm /> },
    { path: "*", element: <PageNotFound /> }
  ];

  const PrivateRoute = ({ isAuthenticated, ...props }) => {
    const token = localStorage.getItem("token");
    return token ? (
      <>
        <SideNavber />
        <Outlet />
      </>
    ) : (
      <Navigate replace to="/login" />
    );
  };

  return (
    <Router>
      <div className="flex">
        <ScrollToTop />
        <Routes>
          {routes.map(({ path, element, children }, index) => (
            <Route key={index} path={path} element={element}>
              {children && children.map(({ path, element }, index) => (
                <Route key={index} path={path} element={element} />
              ))}
            </Route>
          ))}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
