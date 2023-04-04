import axios from 'axios'
import React, { createContext, useContext, useReducer } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ACTIONS, JSON_API_PRODUCTS } from '../helpers/consts'

export const productContext = createContext()

export const useProduct = () => {
  return useContext(productContext)
}

const INIT_STATE = {
  products: [],
  productDetails: {},
}
const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ACTIONS.GET_PRODUCTS:
      return { ...state, products: action.payload }

    case ACTIONS.GET_PRODUCT_DETAILS:
      return { ...state, productDetails: action.payload }

    default:
      return state;
  }
}

const ProductContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, INIT_STATE)

  const location = useLocation()
  const navigate = useNavigate()
  //? GET PRODUCT

  const getProducts = async () => {
    const { data } = await axios.get(`${JSON_API_PRODUCTS}${window.location.search}`)
    // getProducts()

    dispatch({
      type: ACTIONS.GET_PRODUCTS,
      payload: data,
    });
  }

  //? ADD PRODUCT

  async function addProduct(newProduct) {
    await axios.post(JSON_API_PRODUCTS, newProduct)
  }
  //? DELETE PRODUCT
  async function deleteProduct(id) {
    await axios.delete(`${JSON_API_PRODUCTS}/${id}`);
    getProducts()
  }

  //? get one product details

  async function getProductDetails(id) {
    const { data } = await axios.get(`${JSON_API_PRODUCTS}/${id}`)
    dispatch({ type: ACTIONS.GET_PRODUCT_DETAILS, payload: data })
  }

  async function updateProduct(newProduct) {
    await axios.patch(`${JSON_API_PRODUCTS}/${newProduct.id}`, newProduct)
    // getProducts();
  }

  const fetchByParams = async (query, value) => {
    const search = new URLSearchParams(location.search)

    if (value == 'all') {
      search.delete(query)
    } else {
      search.set(query, value)
    }

    const url = `${location.pathname}?${search.toString()}`;
    console.log(search.toString());
    console.log(url);
    navigate(url)

  }

  console.log(location.pathname);

  const values = {
    addProduct,
    getProducts,
    products: state.products,
    deleteProduct,
    getProductDetails,
    productDetails: state.productDetails,
    updateProduct,
    fetchByParams
  }

  return (
    <productContext.Provider value={values}>
      {children}
    </productContext.Provider>
  )
}

export default ProductContextProvider