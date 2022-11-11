import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Route,RouterProvider } from 'react-router-dom';

import { ErrorPage, JournalItemPage, JournalPage, Root } from 'Routes';

import './index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  { path: '/', element: <Root />, errorElement: <ErrorPage />, children: [
    { path: 'journal', element: <JournalPage />, children: [
      { path: ':id', element: <JournalItemPage /> }
    ] },
  ] },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
