import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { createZoomMeeting } from "../../../rtk/features/ZoomApi/createZoomMeetingSlice";
import {updateCareerAdviceData} from "../../../rtk/features/CareerAdvice/updateCareerAdviceDataSlice"
import {getCareerAdviceAgendaList} from "../../../rtk/features/CareerAdvice/getCareerAdviceAgendaListSlice"
import {getSlotTimeDataList} from "../../../rtk/features/CareerAdvice/getSlotTimeDataListSlice"
import { Key } from "@mui/icons-material";

const EditCareerAdvice = () => {
  const dispatch = useDispatch();
  const [timeSlotLoading,setTimeSlotLoading] = useState(false);
  const navigate = useNavigate();
  const customId = "custom-id-yes";
  const [loading, setLoading] = useState(false);
  const selectRef = useRef(null);


  useEffect(() => {
    dispatch(getCareerAdviceAgendaList());
  }, [])

  const getCareerAdviceAgendaList2 = useSelector((state)=>state.getCareerAdviceAgendaList?.users?.data);
  console.log("getCareerAdviceAgendaList2",getCareerAdviceAgendaList2);
  const [agendaData,setAgendaData] = useState([]);

  useEffect(() => {
    setAgendaData(getCareerAdviceAgendaList2 || []);
  }, [getCareerAdviceAgendaList2])
  
  console.log("agendaData",agendaData);
  


  const getStudentIdFromLocalStorage = () => {
    const student_id = localStorage.getItem("student_id");
    return student_id || "";
  };

  const careerAdviceData = useSelector(
    (state) => state.getCareerAdviceRequestById?.users?.data?.[0]
  );

  const [selectedValues, setSelectedValues] = useState(careerAdviceData?.title || []);


  console.log("careerAdviceData",careerAdviceData);

  const [careerAdviceForm, setcareerAdviceForm] = useState({
    student_id:careerAdviceData?.student_id || getStudentIdFromLocalStorage() ,
    title:careerAdviceData?.title || [],
    description: careerAdviceData?.description || "",
    schedule_date: careerAdviceData?.schedule_date || "",
    schedule_from_time:careerAdviceData?.schedule_from_time || "",
    schedul_id:careerAdviceData?._id
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setcareerAdviceForm({
      ...careerAdviceForm,
      [name]: type === "checkbox" ? checked : value,
    });
  };



  const handleChangeTitel = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedValues([...selectedValues, value]);
    } else {
      setSelectedValues(selectedValues?.filter((item) => item !== value));
    }
  };
console.log("selectedValues",selectedValues);

useEffect(() => {
  setcareerAdviceForm(prev=>({
    ...prev,
    title: selectedValues
  }))
}, [selectedValues])



  console.log("careerAdviceForm", careerAdviceForm);

  const datePickerRef = useRef(null);
  console.log("datePickerRef", datePickerRef);


  const handleChangeDate = (selectedDates, dateStr, instance) => {
    setcareerAdviceForm(prev=>({
      ...prev,
      schedule_date:dateStr
    }));
  };

  useEffect(() => {
    const flatpickrInstance = flatpickr(datePickerRef.current, {
      dateFormat: "Y/m/d",
      minDate: "today",
      onChange: handleChangeDate,
    });
  
    if (careerAdviceForm?.schedule_date) {
      flatpickrInstance.setDate(careerAdviceForm?.schedule_date, true, "Y/m/d");
    }
  }, []);


  useEffect(() => {
    if (selectRef.current) {
      flatpickr(selectRef.current, {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i", // Display time in 24-hour format
      });
    }
  }, []);


  useEffect(() => {
   if(careerAdviceForm?.schedule_date){
    setTimeSlotLoading(true);
    dispatch(getSlotTimeDataList(careerAdviceForm?.schedule_date));
    setTimeSlotLoading(false)
   }
  }, [careerAdviceForm?.schedule_date])
  

  const getSlotTimeDataList2 = useSelector((state)=>state.getSlotTimeDataList?.users?.data);
  console.log("getSlotTimeDataList2",getSlotTimeDataList2);

    
  const requiredField = ["student_id", "title", "schedule_date","schedule_from_time"];

  const SaveEditedCareerAdviceData = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const hasEmptyFields = requiredField.some(
        (fields) => !careerAdviceForm[fields]
      );
      if (hasEmptyFields) {
        toast.error("Please fill all the required fields", {
          toastId: customId,
        });
        return;
      }

      if (careerAdviceForm?.title?.length === 0) {
        toast.error("Please select at least one Agenda", { toastId: customId });
        return;
      }

 

      const actionResult = await dispatch(
        updateCareerAdviceData(careerAdviceForm)
      );
      if (actionResult?.payload?.message) {
        setLoading(false);
        toast.success(actionResult?.payload?.message, { toastId: customId });
        navigate("/career-advice-request");
      }
    } catch (error) {
      console.log("error while adding career Advice data", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between pb-12 ">
        <h1 className="text-2xl font-semibold">Edit Career Advice</h1>
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
                  

                  {agendaData?.length === 0 ? (
  <p>No Agenda List Found...</p>
) : (
  agendaData?.map((item, index) => {
    const isSelected = selectedValues?.includes(item?.agenda); // Check if the item's agenda is in selectedValues
    return (
      <div className="mt-1" key={index}>
        <div className="flex items-start mt-2">
          <div className="flex items-center h-5">
            <input
              id={`checkbox-${index}`}
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 accent-yellow-dark mt-1"
              required
              name="title"
              value={item?.agenda}
              onChange={handleChangeTitel}
              checked={isSelected} // Set the checked state based on isSelected
            />
          </div>
          <label
            htmlFor={`checkbox-${index}`}
            className="ms-2 text-sm text-gray-500 font-medium leading-6"
          >
            {index + 1}. {item?.agenda}
          </label>
        </div>
      </div>
    );
  })
)}

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
                  name="description"
                  value={careerAdviceForm.description}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5 mb-5 ">
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
                      name="schedule_from_time"
                      value={careerAdviceForm.schedule_from_time}
                      onChange={handleChange}
                      disabled={careerAdviceForm?.schedule_date === ""}
                    >
                       <option value="">Select Time</option>

{
  timeSlotLoading ? <div>loading...</div> : (getSlotTimeDataList2?.length === 0 ? <div>No Data Found</div> :  getSlotTimeDataList2?.map((item)=>{
    return(
      <option key={item?._id} value={item?.slot}  disabled={item?.status === false}>{item?.slot}</option>
    )
  }) )
}


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
                onClick={() => navigate("/career-advice-request")}
              >
                Cancel
              </button>
              <button
                className="bg-yellow-dark hover:bg-yellow-700 text-white font-bold py-2 px-6 rounded border border-yellow-dark"
                disabled={loading}
                onClick={SaveEditedCareerAdviceData}
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

export default EditCareerAdvice;
