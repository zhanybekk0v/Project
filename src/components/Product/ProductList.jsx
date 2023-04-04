import { Grid, Pagination } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useProduct } from '../../contexts/ProductContextProvider'
import ProductCard from './ProductCard'

const ProductList = () => {
  const { getProducts, products } = useProduct()
  const [search, setSearchParams] = useSearchParams()

  useEffect(() => {
    getProducts()
  }, [])

  useEffect(() => {
    getProducts()
    setPage(1)
  } , [setSearchParams])
  //pagination

  const [page, setPage] = useState(1)
  const itemsPerPage = 3

  const count = Math.ceil(products.length / itemsPerPage)

  const handleChange = (e, p) => {
    setPage(p)
  }

  function currentData() {
    const begin = (page -1) * itemsPerPage ;
    const end = begin + itemsPerPage;
    return products.slice(begin, end)
  }


  return (
    <>
      <Grid item md={9}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          mb: '4rem',
        }}>
          {currentData().map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </Box>
        <Pagination sx={{display:'flex' , justifyContent: 'center'}} onChange={handleChange} count={count} page={page} variant='outlined' snape='rounded' />
      </Grid>
    </>
  )
}

export default ProductList