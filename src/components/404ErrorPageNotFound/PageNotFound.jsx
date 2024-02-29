import { useNavigate } from "react-router-dom";
import PagenotImg from "../../assets/404-page-not-foud.gif";

const PageNotFound = () => {
    const navigate = useNavigate()
  return (
    <>
      <div className="centered-container flex flex-col items-center justify-center w-full	h-screen">
        <img src={PagenotImg} alt="Resim" />
        <button
          onClick={() => navigate("/")}
          className="bg-yellow-dark hover:bg-yellow-dark-700 text-white font-bold py-2 px-4 rounded"
        >
          Go Back
        </button>
      </div>
    </>
  );
}

export default PageNotFound