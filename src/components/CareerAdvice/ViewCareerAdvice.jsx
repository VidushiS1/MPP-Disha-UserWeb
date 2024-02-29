import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { getZoomAccessToken } from "../../../rtk/features/ZoomApi/getZoomAccessTokenSlice";
import { createZoomMeeting } from "../../../rtk/features/ZoomApi/createZoomMeetingSlice";

const AddCareerAdvice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customId = "custom-id-yes";
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [time, setTime] = useState("");
  const [period, setPeriod] = useState("");
  const [convertedTime, setConvertedTime] = useState("");

  let search = useLocation().search;

  useEffect(() => {
    const code = new URLSearchParams(search).get("code");
    if (code) {
      GetZoomMeeting();
      console.log("code", code);
    }
  }, [search]);

  const GetZoomMeeting = async () => {
    const code = new URLSearchParams(search).get("code");
    if (code) {
      const actionResult = await dispatch(getZoomAccessToken(code));
      console.log("actionResult", actionResult);
      setAccessToken(actionResult?.payload?.token?.access_token);
      localStorage.setItem(
        "accessToken",
        actionResult?.payload?.token?.access_token
      );
    }
  };

  console.log("accessToken", accessToken);

  const accessTokenFromStorage = localStorage.getItem("accessToken");

  const getZoomAccessToken2 = useSelector(
    (state) => state.getZoomAccessToken?.users?.token?.access_token
  );

  console.log("getZoomAccessToken2", getZoomAccessToken2);

  const [broadcastScheduledForm, setBroadcastScheduledForm] = useState({
    topic: "",
    discription: "",
    date_time: "",
    duration_hours: 0,
    duration_min: 1,
    // default_password:false,
    waiting_room: false,
    // password:"",
    auto_recording: "local",
    join_before_host: false,
    access_token: getZoomAccessToken2,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBroadcastScheduledForm({
      ...broadcastScheduledForm,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  useEffect(() => {
    setBroadcastScheduledForm({
      ...broadcastScheduledForm,
      access_token: accessToken,
    });
  }, [accessToken]);

  console.log("broadcastScheduledForm", broadcastScheduledForm);

  const datePickerRef = useRef(null);
  console.log("datePickerRef", datePickerRef);

  const [date, setDate] = useState("");

  const handleChangeDate = (selectedDates, dateStr, instance) => {
    setDate(dateStr);
  };

  useEffect(() => {
    flatpickr(datePickerRef.current, {
      dateFormat: "Y-m-d",
      minDate: "today",
      onChange: handleChangeDate,
    });
  }, []);

  const selectRef = useRef(null);

  useEffect(() => {
    if (selectRef.current) {
      flatpickr(selectRef.current, {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i", // Display time in 24-hour format
      });
    }
  }, []);

  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);

  const handleCheckboxChange2 = () => {
    setIsChecked2(!isChecked2);
  };
  const handleCheckboxChange3 = () => {
    setIsChecked3(!isChecked3);
  };

  useEffect(() => {
    setBroadcastScheduledForm({
      ...broadcastScheduledForm,
      auto_recording: "local",
      join_before_host: isChecked3,
    });
  }, [isChecked2, isChecked3]);

  // const handleChangeTime = (e) => {
  //   const selectedTime = e.target.value;
  //   const selectedDateTime = new Date(`${date} ${selectedTime}`);
  //   const currentTime = new Date();

  //   // Check if the selected date is today's date
  //   if (
  //     selectedDateTime.getDate() === currentTime.getDate() &&
  //     selectedDateTime.getMonth() === currentTime.getMonth() &&
  //     selectedDateTime.getFullYear() === currentTime.getFullYear()
  //   ) {
  //     // Check if the selected time is in the past
  //     if (selectedDateTime < currentTime) {
  //       // You can display an error message or handle the invalid selection here
  //       console.log("Cannot select past hours for today's date");
  //       // For example, you can display a toast message
  //       toast.error("Cannot select past hours for today's date", { toastId: customId });
  //       // Reset the time to an empty value or the previously valid value
  //       setTime("");
  //       return;
  //     }
  //   }

  //   setTime(selectedTime);
  //   updateConvertedTime(selectedTime, period);
  // };

  const handleChangePeriod = (e) => {
    setPeriod(e.target.value);
    updateConvertedTime(time, e.target.value);
  };

  const updateConvertedTime = (selectedTime, selectedPeriod) => {
    const selectedHour = parseInt(selectedTime?.split(":")[0]);
    let newConvertedTime = selectedTime;

    if (selectedPeriod === "PM" && selectedHour !== 12) {
      newConvertedTime = `${selectedHour + 12}:${selectedTime?.split(":")[1]}`;
    } else if (selectedPeriod === "AM" && selectedHour === 12) {
      newConvertedTime = `00:${selectedTime?.split(":")[1]}`;
    }

    setConvertedTime(newConvertedTime);
  };

  console.log("time", time);
  console.log("period", period);

  useEffect(() => {
    setBroadcastScheduledForm({
      ...broadcastScheduledForm,
      date_time: `${date}T${convertedTime}:00`,
    });
  }, [date, time, period, convertedTime]);

  const handleChangeTime = (e) => {
    const selectedTime = e.target.value;
    const selectedDateTime = new Date(`${date} ${selectedTime}`);
    const currentTime = new Date();

    // Convert the selected time to 24-hour format
    let selectedHour = parseInt(selectedTime.split(":")[0]);
    const selectedMinute = parseInt(selectedTime.split(":")[1]);
    if (period === "PM" && selectedHour !== 12) {
      selectedHour += 12;
    } else if (period === "AM" && selectedHour === 12) {
      selectedHour = 0;
    }
    const selectedDateTime24h = new Date(currentTime);
    selectedDateTime24h.setHours(selectedHour, selectedMinute, 0, 0);

    // Check if the selected time is before the current time
    if (selectedDateTime24h < currentTime) {
      // Display an error message or handle the invalid selection here
      console.log("Cannot select past hours for today's date");
      // For example, you can display a toast message
      toast.error(
        "Oops! It looks like you've selected a time that has already passed. Please choose a future time.",
        { toastId: customId }
      );
      // Reset the time to an empty value or the previously valid value
      setTime("");
      return;
    }

    // Rest of the code to handle the selected time
    setTime(selectedTime);
    updateConvertedTime(selectedTime, period);
  };

  const requiredField = ["topic", "discription", "date_time", "duration_min"];

  const SaveZoomData = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let duration_hours = broadcastScheduledForm.duration_hours;
      let duration_min = broadcastScheduledForm.duration_min;
      if (typeof duration_hours === "string") {
        duration_hours = parseInt(duration_hours);
      }
      if (typeof duration_min === "string") {
        duration_min = parseInt(duration_min);
      }
      setBroadcastScheduledForm({
        ...broadcastScheduledForm,
        duration_hours: duration_hours,
        duration_min: duration_min,
      });

      console.log("Parsed duration_hours:", duration_hours);
      console.log("Parsed duration_min:", duration_min);

      console.log("Updated broadcastScheduledForm:", broadcastScheduledForm);

      const hasEmptyFields = requiredField.some(
        (fields) => !broadcastScheduledForm[fields]
      );
      if (hasEmptyFields) {
        toast.error("Please fill all the required fields", {
          toastId: customId,
        });
        return;
      }

      if (!time) {
        toast.error("Please select the time", { toastId: customId });
        return;
      }

      if (broadcastScheduledForm.date_time.length <= 9) {
        toast.error("Please select the Date", { toastId: customId });
        return;
      }

      const actionResult = await dispatch(
        createZoomMeeting(broadcastScheduledForm)
      );
      if (actionResult?.payload?.message) {
        setLoading(false);
        toast.success(actionResult?.payload?.message, { toastId: customId });
        navigate("/broadcast-scheduled-all-card");
      }
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between pb-12 ">
        <h1 className="text-2xl font-semibold">Add Career Advice</h1>
        <div className="relative"></div>
      </div>

      <div className=" px-12">
        <div className="job-details-main-container px-36 bg-blue-lightest">
          <form className="grid grid-cols-1 md:grid-cols-1 gap-3">
            <div className=" mb-5 mt-5">
              <div className="grid grid-cols-1 gap-5 mb-5 ">
                <div className="col-span-1 ">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    What Do You Want To Know ?
                  </label>
                  <div className="mt-1">
                    <div className="flex items-start  mt-2 ">
                      <div className="flex items-center h-5">
                        <input
                          id="remember"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 accent-yellow-dark mt-1"
                          required
                          name="waiting_room"
                          value={broadcastScheduledForm.waiting_room}
                          onChange={handleChange}
                        />
                      </div>
                      <label
                        for="remember"
                        className="ms-2 text-sm text-gray-500 font-medium leading-6"
                      >
                        1. Do you want to take aptitude test to know more about
                        your career orientation.
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-span-1 ">
                  <div className="">
                    <div className="flex items-start  ">
                      <div className="flex items-center h-5">
                        <input
                          id="remember"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 accent-yellow-dark  mt-1"
                          required
                          name="waiting_room"
                          value={broadcastScheduledForm.waiting_room}
                          onChange={handleChange}
                        />
                      </div>
                      <label
                        for="remember"
                        className="ms-2 text-sm text-gray-500 font-medium leading-6"
                      >
                        2. Future education option.
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-span-1 ">
                  <div className="">
                    <div className="flex items-start  ">
                      <div className="flex items-center h-5">
                        <input
                          id="remember"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 accent-yellow-dark  mt-1"
                          required
                          name="waiting_room"
                          value={broadcastScheduledForm.waiting_room}
                          onChange={handleChange}
                        />
                      </div>
                      <label
                        for="remember"
                        className="ms-2 text-sm text-gray-500 font-medium leading-6"
                      >
                        3. Do you want to take aptitude test to know more about
                        your career orientation.
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-span-1 ">
                  <div className="">
                    <div className="flex items-start  ">
                      <div className="flex items-center h-5">
                        <input
                          id="remember"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 accent-yellow-dark mt-1"
                          required
                          name="waiting_room"
                          value={broadcastScheduledForm.waiting_room}
                          onChange={handleChange}
                        />
                      </div>
                      <label
                        for="remember"
                        className="ms-2 text-sm text-gray-500 font-medium leading-6"
                      >
                        4. Government schemes to support
                        entrepreneurship/startups/jobs/business.
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className=" mb-5 ">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Any Other Query
              </label>
              <div className="mt-2">
                <textarea
                  rows="2"
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-yellow-dark focus:ring-offset-2 mr-2"
                  placeholder="Enter Your Query"
                  name="discription"
                  value={broadcastScheduledForm.discription}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5 mb-5 flex">
              <div className="col-span-1 ">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Date
                </label>

                <div className="mt-2">
                  <div className="relative max-w-full ">
                    <div className="absolute inset-y-0 end-5 flex items-center ps-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                      </svg>
                    </div>
                    <input
                      ref={datePickerRef}
                      className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-yellow-dark focus:ring-offset-2 mr-2"
                      placeholder="Select date"
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-1">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Time Slot
                </label>
                <div className="mt-2">
                  <div className="relative inline-block w-full">
                    <select
                      className="block appearance-none w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-yellow-dark focus:ring-offset-2 mr-2"
                      value={time}
                      onChange={handleChangeTime}
                    >
                      <option value="">Select Time</option>
                      <option value="">12-01 PM</option>
                      <option value="">09-10 PM</option>
                      <option value="">06-07 PM</option>
                      <option value="">03-05 PM</option>
                      
                    </select>

                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-sm font-medium text-gray-700">
                      <svg
                        className="h-5 w-5 fill-current"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10 12L15 7L5 7L10 12Z" fill="#4A5568" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 mb-8">
              <button
                className="bg-transparent hover:bg-yellow-dark text-yellow-dark font-semibold hover:text-white py-2 px-6 border border-yellow-dark hover:border-transparent rounded"
                onClick={() => navigate("/broadcast-scheduled-all-card")}
              >
                Cancel
              </button>
              <button
                className="bg-yellow-dark hover:bg-yellow-700 text-white font-bold py-2 px-6 rounded border border-yellow-dark"
                disabled={loading}
                onClick={SaveZoomData}
              >
                {loading ? <div className="text-white">Saving...</div> : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCareerAdvice;
