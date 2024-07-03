import React from 'react';
import ReactDOM from 'react-dom/client';
import Table from './pages/Table';
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from './pages/Home';
import Rules from './pages/Rules';
import App from './App';
import Uploader from './pages/Uploader';
import TableGlc from './pages/TableGlc';
import Login from './pages/Login';
import { GoogleOAuthProvider } from '@react-oauth/google';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/rules",
        element: <Rules/>
      },
      {
        path: "/liga/:id",
        element: <Table/>
      },
      {
        path: "/upload",
        element: <Uploader/>
      },
      {
        path: "/ligaGlc/:id",
        element: <TableGlc/>
      },
      {
        path: "/login",
        element: <Login/>
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="646961153048-87jqtp39jd477cuah8tiq29ajmkmet52.apps.googleusercontent.com">
    <React.StrictMode>
      <RouterProvider router={router}/>
    </React.StrictMode>
  </GoogleOAuthProvider>,
)
