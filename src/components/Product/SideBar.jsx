import { FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useProduct } from '../../contexts/ProductContextProvider'

const SideBar = () => {

  const [searchParams, setSearchParams] = useSearchParams()
  const {fetchByParams} = useProduct()
  const [search, setSearch] = useState(searchParams.get('q') || '')
  useEffect(() => {
    setSearchParams({
      q:search,
    })
  }, [search])



  return (
    <Grid item md={3}>
      <Paper sx={{ p: 2 }} elevation={5}>
        <TextField value={search} onChange={(e) => setSearch(e.target.value)} fullWidth id="standard-basic" label="Search.............." variant="standard" />

        <Grid>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Type</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="all"
              name="radio-buttons-group"
              onChange={(e) => fetchByParams('type', e.target.value)}
            >
              <FormControlLabel value="all" control={<Radio />} label="all" />
              <FormControlLabel value="telephone" control={<Radio />} label="telephone" />
              <FormControlLabel value="laptop" control={<Radio />} label="laptop" />
              <FormControlLabel value="watch" control={<Radio />} label="watch" />

            </RadioGroup>
          </FormControl>
        </Grid>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Price</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="all"
            name="radio-buttons-group"
            onChange={(e) => fetchByParams('price_lte', e.target.value)}

          >
            <FormControlLabel value="all" control={<Radio />} label="all" />
            <FormControlLabel value="100" control={<Radio />} label="less than 100$" />
            <FormControlLabel value="250" control={<Radio />} label="less than 250$" />
            <FormControlLabel value="500" control={<Radio />} label="less than 500$" />

          </RadioGroup>
        </FormControl>
      </Paper>

    </Grid>
  )
}

export default SideBar