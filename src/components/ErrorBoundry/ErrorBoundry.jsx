import React, { useState } from 'react';

function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);
  const [errorInfo, setErrorInfo] = useState(null);

  const handleError = (error, errorInfo) => {
    // Log the error to an error reporting service
    console.error('Error Boundary caught an error:', error, errorInfo);
    // Update state to indicate the error
    setHasError(true);
    setError(error);
    setErrorInfo(errorInfo);
    // You can also log the error to an error reporting service here
  };

  try {
    if (hasError) {
      // Render a fallback UI
      return (
        <div>
          <h1>Something went wrong.</h1>
          <p>Please try refreshing the page or contact support if the problem persists.</p>
          <button onClick={() => window.location.reload()}>Reload Page</button>
          {/* You can also include a button to report the error */}
        </div>
      );
    }
    // Render children if there's no error
    return children;
  } catch (error) {
    // If an error occurs during rendering, handle it
    handleError(error, null);
    // Render the fallback UI
    return (
      <div>
        <h1>Something went wrong.</h1>
        <p>Please try refreshing the page or contact support if the problem persists.</p>
        <button onClick={() => window.location.reload()}>Reload Page</button>
        {/* You can also include a button to report the error */}
      </div>
    );
  }
}

export default ErrorBoundary;
