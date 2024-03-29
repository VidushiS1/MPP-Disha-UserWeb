const API_URL = "http://13.48.105.9:4000/api/user/"; 
// const API_URL = "http://localhost:5000/api/user/";
// const API_URL = "http://16.171.242.205:4000/api/user/"


const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem("token");
  return token || "";
};

const config = {
  headers: {
    Authorization: `Bearer ${getTokenFromLocalStorage()}`,
    "Content-Type": "application/json",
  },
};

const config2 = {
  headers: {
    Authorization: `Bearer ${getTokenFromLocalStorage()}`,
    "Content-Type": "multipart/form-data",
  },
};



export { API_URL, config, config2 };
