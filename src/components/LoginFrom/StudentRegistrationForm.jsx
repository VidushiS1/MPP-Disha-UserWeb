import React, { useEffect, useRef, useState } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {useSelector, useDispatch } from "react-redux";
import {addNewCast} from "../../../rtk/features/Scholarship/addNewCastSlice"
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from "@mui/material";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";


const StudentRegistrationForm = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const customId = "custom-id-yes";


  const getCategoryList2 = useSelector(
    (state) => state.getCategoryList?.users?.data
  );
  console.log("getCategoryList2", getCategoryList2);

  const getEligibilityList2 = useSelector(
    (state) => state.getEligibilityList?.users?.data
  );

  console.log("getEligibilityList2", getEligibilityList2);

  const [IsLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [eligibilityId, setEligibilityId] = useState("");
  const [editLoading, setEditLoading] = useState(false);
  const [
    editLoadingEducationalEligibility,
    setEditLoadingEducationalEligibility,
  ] = useState(false);

  const [AddScholarshipForm, setScholarshipForm] = useState({
    mp_police: "",
    level: "",
    cast_category_id: "",
    category: "",
    scheme_name: "",
    eligibility: "",
    amount_of_scholership: "",
    scheme_closing_date: "",
    guidelines: "",
    faq: "",
    website: "",
  });

  //editCategory





  const getCategoryDataById2 = useSelector(
    (state) => state.getCategoryDataById?.users?.data?.[0]
  );

  console.log("getCategoryDataById2", getCategoryDataById2);

  const [editCategoryValue, setEditCategoryValue] = useState("");

  useEffect(() => {
    setEditCategoryValue(getCategoryDataById2?.name);
  }, [getCategoryDataById2]);

  // EducationalEligibilityEdit



  const getEducationalEligibilityDataById2 = useSelector(
    (state) => state.getEducationalEligibilityDataById?.users?.data?.[0]
  );

  console.log(
    "getEducationalEligibilityDataById2",
    getEducationalEligibilityDataById2
  );

  const [editEducationalEligibilityValue, setEditEducationalEligibilityValue] =
    useState("");

 

  const [isVerificationDialogOpen1, setisVerificationDialogOpen1] =
    useState(false);

  const [isVerificationDialogOpen2, setisVerificationDialogOpen2] =
    useState(false);
  const [isVerificationDialogOpen3, setisVerificationDialogOpen3] =
    useState(false);
  const [isVerificationDialogOpen4, setisVerificationDialogOpen4] =
    useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setScholarshipForm({
      ...AddScholarshipForm,
      [name]: value,
    });
  };

  const datePickerRef = useRef(null);
  console.log("datePickerRef", datePickerRef);

  const handleChangeDate = (selectedDates, dateStr, instance) => {
    setScholarshipForm((prevState) => ({
      ...prevState,
      scheme_closing_date: dateStr,
    }));
  };

  useEffect(() => {
    if (AddScholarshipForm?.cast_category_id) {
      const categroyName = getCategoryList2?.find(
        (item) => item?._id === AddScholarshipForm?.cast_category_id
      );
      console.log("categroyName", categroyName);
      if (categroyName) {
        setScholarshipForm({
          ...AddScholarshipForm,
          category: categroyName?.name,
        });
      }
    }
  }, [AddScholarshipForm?.cast_category_id]);

  useEffect(() => {
    flatpickr(datePickerRef.current, {
      // dateFormat: "d-m-Y",
      dateFormat: "Y-m-d",
      minDate: "today",
      onChange: handleChangeDate,
    });
  }, []);

  useEffect(() => {
    if (AddScholarshipForm?.eligibility) {
      const EligibilityObj = getEligibilityList2?.find(
        (item) => item?.name === AddScholarshipForm?.eligibility
      );
      console.log("EligibilityObj", EligibilityObj);
      if (EligibilityObj) {
        setEligibilityId(EligibilityObj?._id);
      }
    }
  }, [AddScholarshipForm?.eligibility]);





  useEffect(() => {
    setEditEducationalEligibilityValue(
      getEducationalEligibilityDataById2?.name
    );
  }, [getEducationalEligibilityDataById2,eligibilityId]);


  const [isOpen, setIsOpen] = useState(false);
  const [newItemValue, setNewItemValue] = useState("");

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  console.log("newItemValue", newItemValue);


  const handleItemChange = (e) => {
    setNewItemValue(e.target.value);
  };

  const handleEligibilityChange = (e) => {
    setNewEligibilityValue(e.target.value);
  };

  const invalidFields = [
    "level",
    "cast_category_id",
    "category",
    "scheme_name",
    "eligibility",
    "amount_of_scholership",
    "scheme_closing_date",
    "guidelines",
    "faq",
    "website",
  ];



  console.log("AddScholarshipForm", AddScholarshipForm);

  const handleOpenVerificationDialog1 = () => {
    setisVerificationDialogOpen1(true);
  };
  const handleCloseVerificationDialog1 = () => {
    setisVerificationDialogOpen1(false);
  };

  const handleOpenVerificationDialog2 = () => {
    setisVerificationDialogOpen2(true);
  };
  const handleCloseVerificationDialog2 = () => {
    setisVerificationDialogOpen2(false);
  };

  const handleOpenVerificationDialog3 = () => {
    setisVerificationDialogOpen3(true);
  };
  const handleCloseVerificationDialog3 = () => {
    setisVerificationDialogOpen3(false);
  };
  const handleOpenVerificationDialog4 = () => {
    setisVerificationDialogOpen4(true);
  };
  const handleCloseVerificationDialog4 = () => {
    setisVerificationDialogOpen4(false);
  };



  const educationalEligibilityOptions = [
    { label: "Select Educational Eligibility", value: "" },
    { label: "Below 8th", value: "below_8th" },
    { label: "Below 10th", value: "below_10th" },
    { label: "Class 10th", value: "class_10th" },
    { label: "Class 12th", value: "class_12th" },
    { label: "(UG) Under Graduation", value: "Ug" },
    { label: "(PG) Post Graduation", value: "Pg" },
    { label: "PhD", value: "ug_diploma" },
  ];

  const [newEligibilityValue, setNewEligibilityValue] = useState("");
  const [isEligibilityLoading, setIsEligibilityLoading] = useState(false);
  const [deleteEligibilityLoading, setDeleteEligibilityLoading] =
    useState(false);



  //editCategory

  const handleCategoryChange = (e) => {
    setEditCategoryValue(e.target.value);
  };



  // EducationalEligibilityEdit

  const handleEducationalEligibilityChange = (e) => {
    setEditEducationalEligibilityValue(e.target.value);
  };



  return (
    <>
      <div className="flex items-center justify-between pb-12 ">
        <h1 className="text-2xl font-semibold">Add Scholarship Details</h1>
        <div className="relative"></div>
      </div>

      <div className=" px-12">
        <div className="job-details-main-container px-36 bg-blue-lightest">
          <form>
            <div class="col-span-full mb-5">
              <label
                for="about"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                MP Police
              </label>
              <div class="mt-2">
                <select
                  name="mp_police"
                  value={AddScholarshipForm.mp_police}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-yellow-dark focus:ring-offset-2 mr-2"
                >
                  <option value="">Select</option>
                  <option value="mp_police">Mp Police</option>
                </select>
              </div>
            </div>
            <div class="col-span-full mb-5">
              <label
                for="about"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Level
              </label>
              <div class="mt-2">
                <select
                  name="level"
                  value={AddScholarshipForm.level}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-yellow-dark focus:ring-offset-2 mr-2"
                >
                  <option value="">Select Level</option>
                  <option value="National">National Level</option>
                  <option value="State">State Level</option>
                </select>
              </div>
            </div>
            <div class="col-span-full mb-5 mt-5">
              <label
                for="about"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Category
              </label>
              <div className="flex items-center">
                <select
                  name="cast_category_id"
                  value={AddScholarshipForm.cast_category_id}
                  onChange={handleChange}
                  className="w-8/12 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-yellow-dark focus:ring-offset-2 mr-2"
                >
                  <option value="">Select Category</option>
                  {getCategoryList2?.map((item, index) => (
                    <option key={item?._id} value={item?._id}>
                      {item?.name}
                    </option>
                  ))}
                </select>
                <div className="flex">
                  <input
                    type="text"
                    value={newItemValue}
                    onChange={handleItemChange}
                    className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-yellow-dark focus:ring-offset-2 mr-2"
                    placeholder="Enter Category"
                  />
                  <button
                    type="button"
                    // onClick={handleAddItemClick}
                    className="bg-yellow-dark hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded me-2"
                    disabled={loading}
                  >
                    {loading ? "Adding..." : "Add"}
                  </button>
                  <IconButton
                    sx={{
                      background:
                        AddScholarshipForm?.cast_category_id === ""
                          ? "#d5bfa2 !important"
                          : "#AC885A",
                      borderRadius: "3px",
                      "&:hover": { background: "#AC885A" },
                    }}
                    onClick={handleOpenVerificationDialog1}
                    disabled={AddScholarshipForm?.cast_category_id === ""}
                  >
                    <DeleteTwoToneIcon sx={{ color: "#FFF" }} />
                  </IconButton>
                  <IconButton
                    sx={{
                      background:
                        AddScholarshipForm?.cast_category_id === ""
                          ? "#d5bfa2 !important"
                          : "#AC885A",
                      borderRadius: "3px",
                      marginLeft: "8px",
                      "&:hover": { background: "#AC885A" },
                    }}
                    onClick={handleOpenVerificationDialog3}
                    disabled={AddScholarshipForm?.cast_category_id === ""}
                  >
                    <EditTwoToneIcon sx={{ color: "#FFF" }} />
                  </IconButton>
                </div>
              </div>
            </div>
            <div class="col-span-full mb-5">
              <label
                for="about"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Scheme Name
              </label>
              <div class="mt-2">
                <textarea
                  id="about"
                  name="scheme_name"
                  value={AddScholarshipForm.scheme_name}
                  onChange={handleChange}
                  rows="3"
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-yellow-dark focus:ring-offset-2 mr-2"
                  placeholder="Enter scheme name"
                ></textarea>
              </div>
            </div>
            <div class="col-span-full mb-5">
              <label
                for="about"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Educational Eligibility
              </label>
              <div className="flex items-center">
                <select
                  name="eligibility"
                  value={AddScholarshipForm.eligibility}
                  onChange={handleChange}
                  className="w-8/12 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-yellow-dark focus:ring-offset-2 mr-2"
                >
                  <option value="">Select eligibility</option>
                  {getEligibilityList2?.map((option) => (
                    <option key={option?.name} value={option?.name}>
                      {option?.name}
                    </option>
                  ))}
                </select>
                <div className="flex">
                  <input
                    type="text"
                    value={newEligibilityValue}
                    onChange={handleEligibilityChange}
                    className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-yellow-dark focus:ring-offset-2 mr-2"
                    placeholder="Enter eligibility"
                  />
                  <button
                    type="button"
                    // onClick={handleAddItemClick2}
                    className="bg-yellow-dark hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded me-2"
                    disabled={isEligibilityLoading}
                  >
                    {isEligibilityLoading ? "Adding..." : "Add"}
                  </button>
                  <IconButton
                    sx={{
                      background:
                        AddScholarshipForm?.eligibility === ""
                          ? "#d5bfa2 !important"
                          : "#AC885A",
                      borderRadius: "3px",
                      "&:hover": { background: "#AC885A" },
                    }}
                    onClick={handleOpenVerificationDialog2}
                    disabled={AddScholarshipForm?.eligibility === ""}
                  >
                    <DeleteTwoToneIcon sx={{ color: "#FFF" }} />
                  </IconButton>
                  <IconButton
                    sx={{
                      background:
                        AddScholarshipForm?.eligibility === ""
                          ? "#d5bfa2 !important"
                          : "#AC885A",
                      borderRadius: "3px",
                      marginLeft: "8px",
                      "&:hover": { background: "#AC885A" },
                    }}
                    onClick={handleOpenVerificationDialog4}
                    disabled={AddScholarshipForm?.eligibility === ""}
                  >
                    <EditTwoToneIcon sx={{ color: "#FFF" }} />
                  </IconButton>
                </div>
              </div>
            </div>
            <div class="col-span-full mb-5">
              <label
                for="about"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Category
              </label>
              <div class="mt-2">
                <textarea
                  id="about"
                  name="category"
                  value={AddScholarshipForm?.category}
                  onChange={handleChange}
                  rows="1"
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-yellow-dark focus:ring-offset-2 mr-2"
                  placeholder="Enter category"
                  readOnly
                ></textarea>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5 mb-5">
              <div class="col-span-1 ">
                <label
                  for="about"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Amount of Scholarship
                </label>
                <div class="mt-2">
                  <textarea
                    id="about"
                    name="amount_of_scholership"
                    value={AddScholarshipForm.amount_of_scholership}
                    onChange={handleChange}
                    rows="1"
                    className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-yellow-dark focus:ring-offset-2 mr-2"
                    placeholder="Enter amount of scholarship"
                  ></textarea>
                </div>
              </div>
              <div class="col-span-1 ">
                <label
                  for="about"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Scheme Closing Date
                </label>
                <div class="mt-2">
                  <div class="relative max-w-full ">
                    <div class="absolute inset-y-0 end-5 flex items-center ps-3 pointer-events-none">
                      <svg
                        class="w-4 h-4 text-gray-500 dark:text-gray-400"
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
                      placeholder="Select scheme closing date"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-span-full mb-5">
              <label
                for="about"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Guidelines
              </label>
              <div class="mt-2">
                <textarea
                  id="about"
                  name="guidelines"
                  value={AddScholarshipForm.guidelines}
                  onChange={handleChange}
                  rows="1"
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-yellow-dark focus:ring-offset-2 mr-2"
                  placeholder="Enter guidelines"
                ></textarea>
              </div>
            </div>
            <div class="col-span-full mb-5">
              <label
                for="about"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                FAQs
              </label>
              <div class="mt-2">
                <textarea
                  id="about"
                  name="faq"
                  value={AddScholarshipForm.faq}
                  onChange={handleChange}
                  rows="1"
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-yellow-dark focus:ring-offset-2 mr-2"
                  placeholder="Enter FAQs"
                ></textarea>
              </div>
            </div>
            <div class="col-span-full mb-5">
              <label
                for="about"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Website
              </label>
              <div class="mt-2">
                <textarea
                  id="about"
                  name="website"
                  value={AddScholarshipForm.website}
                  onChange={handleChange}
                  rows="1"
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-yellow-dark focus:ring-offset-2 mr-2"
                  placeholder="Please enter website link"
                ></textarea>
              </div>
            </div>
            <div class="flex justify-end gap-4 mb-8">
              <button
                class="bg-transparent hover:bg-yellow-dark text-yellow-dark font-semibold hover:text-white py-2 px-6 border border-yellow-dark hover:border-transparent rounded"
                onClick={() => Navigate("/all-scholarship-cards")}
              >
                Back
              </button>
              <button
                class="bg-yellow-dark hover:bg-yellow-700 text-white font-bold py-2 px-6 rounded border border-yellow-dark"
                disabled={IsLoading}
                // onClick={SaveScholarshipData}
              >
                {IsLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>

    </>
  );
};

export default StudentRegistrationForm;
