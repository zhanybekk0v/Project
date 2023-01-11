import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AbotUsPage from '../pages/AbotUsPage'
import AdminPage from '../pages/AdminPage'
import AuthPage from '../pages/AuthPage'
import CartPage from '../pages/CartPage'
import EditProductPage from '../pages/EditProductPage'
import HomePage from '../pages/HomePage'
import NotFoundPage from '../pages/NotFoundPage'
import OurPartnerPage from '../pages/OurPartnerPage'
import ProductDetailsPage from '../pages/ProductDetailsPage'
import ProductsPage from '../pages/ProductsPage'



const MainRoutes = () => {

  const PUBLIC_ROUTES = [
    {
      link: '/products',
      element: <ProductsPage />,
      id: 1,
    },
    {
      link: '/',
      element: <HomePage />,
      id: 2,
    },
    {
      link: '/auth',
      element: <AuthPage />,
      id: 3,
    }, {
      link: '/cart',
      element: <CartPage />,
      id: 4,
    },
    {
      link: '*',
      element: <NotFoundPage />,
      id: 5,
    },
    {
      link: '/products/:id',
      element: <ProductDetailsPage />,
      id: 6,
    },
    {
      link: '/partners',
      element: <OurPartnerPage />,
      id: 7,
    },
    {
      link: '/about',
      element: <AbotUsPage />,
      id: 8,
    },
    {
      link: '/admin',
      element: <AdminPage />,
      id: 9,
    },
    {
      link: '/edit/:id',
      element: <EditProductPage />,
      id: 10,
    },
  ]
  return (
    <>
    <Routes>
      {PUBLIC_ROUTES.map((item) => (<Route  path= {item.link} element={item.element} key={item.id}/>))}
    </Routes>
    </>

  )
}

export default MainRoutes