import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter ,RouterProvider } from 'react-router-dom';

import { ErrorPage, ExperiencePage, JournalItemPage, JournalPage, Root } from 'Routes';

import './index.css';

import reportWebVitals from './reportWebVitals';
import { UiProvider } from 'Context/uiContext';

const router = createBrowserRouter([
  { path: '/', element: <Root />, errorElement: <ErrorPage />, children: [
    { path: 'experience', element: <ExperiencePage />},
    { path: 'journal', element: <JournalPage />, children: [
      { path: ':slug', element: <JournalItemPage /> }
    ] },
  ] },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <UiProvider>
      <RouterProvider router={router} />
    </UiProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
