import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "../rtk/app/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import ErrorPageDisplay from "../src/components/ErrorBoundry/ErrorPageDisplay";
import { ErrorBoundary } from "react-error-boundary";

let persistor = persistStore(store);

const MainApp = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ErrorBoundary
          FallbackComponent={ErrorPageDisplay}
          onReset={() => (location.href = "/")}
        >
          <App />
        </ErrorBoundary>
        <ToastContainer
          position="top-center"
          autoClose={900}
          limit={1}
         
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme="colored"
        />
      </PersistGate>
    </Provider>
  );
};

ReactDOM.render(<MainApp />, document.getElementById("root"));
