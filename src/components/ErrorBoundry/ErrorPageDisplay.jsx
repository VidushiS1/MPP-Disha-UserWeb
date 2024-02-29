import React from 'react';
import NotFoundImage from '../../assets/writer.svg';
import './ErrorPage.css';

const ErrorPageDisplay = ({ error, resetErrorBoundary }) => {
  console.log('Error occured', error);
  return (
    <div className='error-page'>
      <img src={NotFoundImage} alt='Page not found' />
      <p className='error-msg'>
        Something went wrong. Try clicking the refresh page button to reload the
        application.{' '}
        <button className='btn mt-3' onClick={resetErrorBoundary}>
          Refresh page
        </button>
      </p>
    </div>
  );
};

export default ErrorPageDisplay;