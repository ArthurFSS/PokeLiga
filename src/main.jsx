import React from 'react';
import ReactDOM from 'react-dom/client';
import Table from './pages/Table';
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from './pages/Home';
import Rules from './pages/Rules';
import App from './App';

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
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
