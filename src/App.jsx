import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
// import SideNavber from "./components/SideNavbar/SideNavber";
// import TopNavbar from "./components/TopNavbar/TopNavbar";
// import LoginFrom from "./components/LoginFrom/LoginFrom";
// import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
  useNavigate,
} from "react-router-dom";
import SideNavber from "./components/SideNavber/SideNavber";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import LoginFrom from "./components/LoginFrom/LoginFrom";
import ForgetPassword from "./components/LoginFrom/ForgetPassword";
import ConfirmOTP from "./components/LoginFrom/ConfirmOTP";
import ConfirmPassword from "./components/LoginFrom/ConfirmPassword";
import TopNavbar from "./components/TopNavbar/TopNavbar";
import BroadcastScheduledAllCard from "./components/Broadcast/BroadcastScheduledAllCard";
import ViewBroadcastScheduled from "./components/Broadcast/ViewBroadcastScheduled";
import PagenotImg from "./assets/404-page-not-foud.gif"
import PageNotFound from "./components/404ErrorPageNotFound/PageNotFound";
import ScholarshipAllCard from "./components/Scholarship/ScholarshipAllCard";
import ViewScholarship from "./components/Scholarship/ViewScholarship";
import CareerAdviceRequest from "./components/CareerAdvice/CareerAdviceRequest";
import AddCareerAdvice from "./components/CareerAdvice/ViewCareerAdvice";
import JobManagerAllCardSection from "./components/JobManager/JobManagerAllCardSection";
import ViewJobDetails from "./components/JobManager/ViewJobDetails";
import ViewPrivateJobDetails from "./components/JobManager/ViewPrivateJobDetails";
import bgLogo from "./assets/bgwtaermark4.png";
import AllVideoSessionCard from "./components/VideoSession/AllVideoSessionCard";
import EditCareerAdvice from "./components/CareerAdvice/EditCareerAdvice";
import StudentProfile from "./components/FurtherEducation/StudentProfile";
import SignUp from "./components/LoginFrom/SignUp";
import StudentRegistrationForm from "./components/LoginFrom/StudentRegistrationForm";


function App() {
  
  
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
    <>
      <div className="flex">
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/*" element={<PageNotFound />} />
            <Route path="/login" element={<LoginFrom />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/confirm-otp" element={<ConfirmOTP />} />
            <Route path="/confirm-password" element={<ConfirmPassword />} />


            <Route path="/student-registration" element={<StudentRegistrationForm />} />


            {/* <Route path="/" element={<PrivateRoute isAuthenticated={""} />}>
              <Route
                path="/"
                element={
                  <>
                    <div className="h-screen flex flex-col w-full">
                      <div className="">
                        <TopNavbar />
                      </div>
                      <div className="flex-1 p-7 scrollable-content second-main-container-contant-section ">
                        <h1 className="text-2xl font-semibold">
                          Student profile
                        </h1>
                      </div>
                    </div>
                  </>
                }
              />
            </Route> */}

            <Route
              path="/"
              element={<PrivateRoute isAuthenticated={""} />}
            >
              <Route
                path="/"
                element={
                  <>
                    <div className="h-screen flex flex-col w-full">
                      <div className="">
                        <TopNavbar />
                      </div>
                      <div className="flex-1 p-7 scrollable-content ">
                        <StudentProfile />
                      </div>
                    </div>
                  </>
                }
              />
            </Route>

            <Route
              path="/broadcast-scheduled-all-card"
              element={<PrivateRoute isAuthenticated={""} />}
            >
              <Route
                path="/broadcast-scheduled-all-card"
                element={
                  <>
                    <div className="h-screen flex flex-col w-full">
                      <div className="">
                        <TopNavbar />
                      </div>
                      <div className="flex-1 p-7 scrollable-content second-main-container-contant-section">
                        <BroadcastScheduledAllCard />
                      </div>
                    </div>
                  </>
                }
              />
            </Route>
            <Route
              path="/view-broadcast-scheduled"
              element={<PrivateRoute isAuthenticated={""} />}
            >
              <Route
                path="/view-broadcast-scheduled"
                element={
                  <>
                    <div className="h-screen flex flex-col w-full">
                      <div className="">
                        <TopNavbar />
                      </div>
                      <div className="flex-1 p-7 scrollable-content ">
                        <ViewBroadcastScheduled />
                      </div>
                    </div>
                  </>
                }
              />
            </Route>
            <Route
              path="/all-scholarship-cards"
              element={<PrivateRoute isAuthenticated={""} />}
            >
              <Route
                path="/all-scholarship-cards"
                element={
                  <>
                    <div className="h-screen flex flex-col w-full">
                      <div className="">
                        <TopNavbar />
                      </div>
                      <div className="flex-1 p-7 scrollable-content second-main-container-contant-section ">
                        <ScholarshipAllCard />
                      </div>
                    </div>
                  </>
                }
              />
            </Route>
            <Route
              path="/view-scholarship"
              element={<PrivateRoute isAuthenticated={""} />}
            >
              <Route
                path="/view-scholarship"
                element={
                  <>
                    <div className="h-screen flex flex-col w-full">
                      <div className="">
                        <TopNavbar />
                      </div>
                      <div className="flex-1 p-7 scrollable-content">
                        <ViewScholarship />
                      </div>
                    </div>
                  </>
                }
              />
            </Route>
            <Route
              path="/career-advice-request"
              element={<PrivateRoute isAuthenticated={""} />}
            >
              <Route
                path="/career-advice-request"
                element={
                  <>
                    <div className="h-screen flex flex-col w-full">
                      <div className="">
                        <TopNavbar />
                      </div>
                      <div className="flex-1 p-7 scrollable-content second-main-container-contant-section ">
                        <CareerAdviceRequest />
                      </div>
                    </div>
                  </>
                }
              />
            </Route>
            <Route
              path="/add-career-advice"
              element={<PrivateRoute isAuthenticated={""} />}
            >
              <Route
                path="/add-career-advice"
                element={
                  <>
                    <div className="h-screen flex flex-col w-full">
                      <div className="">
                        <TopNavbar />
                      </div>
                      <div className="flex-1 p-7 scrollable-content">
                        <AddCareerAdvice />
                      </div>
                    </div>
                  </>
                }
              />
            </Route>

            <Route
              path="/edit-career-advice"
              element={<PrivateRoute isAuthenticated={""} />}
            >
              <Route
                path="/edit-career-advice"
                element={
                  <>
                    <div className="h-screen flex flex-col w-full">
                      <div className="">
                        <TopNavbar />
                      </div>
                      <div className="flex-1 p-7 scrollable-content">
                        <EditCareerAdvice />
                      </div>
                    </div>
                  </>
                }
              />
            </Route>

            <Route
              path="/job-manager"
              element={<PrivateRoute isAuthenticated={""} />}
            >
              <Route
                path="/job-manager"
                element={
                  <>
                    <div className="h-screen flex flex-col w-full">
                      <div className="">
                        <TopNavbar />
                      </div>
                      <div className="flex-1 p-7 scrollable-content second-main-container-contant-section  ">
                        <JobManagerAllCardSection />
                      </div>
                    </div>
                  </>
                }
              />
            </Route>
            <Route
              path="/view-job-details"
              element={<PrivateRoute isAuthenticated={""} />}
            >
              <Route
                path="/view-job-details"
                element={
                  <>
                    <div className="h-screen flex flex-col w-full">
                      <div className="">
                        <TopNavbar />
                      </div>
                      <div className="flex-1 p-7 scrollable-content  ">
                        <ViewJobDetails />
                      </div>
                    </div>
                  </>
                }
              />
            </Route>
            <Route
              path="/view-private-job-details"
              element={<PrivateRoute isAuthenticated={""} />}
            >
              <Route
                path="/view-private-job-details"
                element={
                  <>
                    <div className="h-screen flex flex-col w-full">
                      <div className="">
                        <TopNavbar />
                      </div>
                      <div className="flex-1 p-7 scrollable-content  ">
                        <ViewPrivateJobDetails />
                      </div>
                    </div>
                  </>
                }
              />
            </Route>
            <Route
              path="/all-card-video-session"
              element={<PrivateRoute isAuthenticated={""} />}
            >
              <Route
                path="/all-card-video-session"
                element={
                  <>
                    <div className="h-screen flex flex-col w-full">
                      <div className="">
                        <TopNavbar />
                      </div>
                      <div className="flex-1 p-7 scrollable-content  second-main-container-contant-section ">
                        <AllVideoSessionCard />
                      </div>
                    </div>
                  </>
                }
              />
            </Route>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
