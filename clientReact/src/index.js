import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import 'jquery/dist/jquery.min.js'; 
import "@popperjs/core"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
// import Cart, { loader as cartLoader } from './views/cart';
// import App, { loader as AppLoader } from './App';
import App from './App'
import Order from './OrderPage';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    
    // loader: homeLoader,
  },
  {
    path: '/orderItems',
    element: <Order />,
    
    // loader: homeLoader,
  },
  // {
  //   path: 'register',
  //   element: <Register />,
    
  //   // loader: homeLoader,
  // },
  // {
  //   path: 'wishlist',
  //   element: <Wishlist />,
    
  //   // loader: homeLoader,
  // },
  // {
  //   path: 'products',
  //   element: <ItemPage />,
    
  //   // loader: homeLoader,
  // },
 
  // {
  //   path: 'cart',
  //   element: <Cart />,
   
  //   // loader: postLoader,
  // },
]);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);