import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useProduct } from '../../contexts/ProductContextProvider';
import { useNavigate } from 'react-router-dom';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import { IconButton } from '@mui/material';
import { useCart } from '../../contexts/CartContextProvider';
import { useAuth } from '../../contexts/AuthContextProvider';
import { ADMIN } from '../../helpers/consts';


export default function ProductCard({ item }) {
  const { deleteProduct, } = useProduct()
  const { addProductToCart, checkProductInCart } = useCart()
  const navigate = useNavigate()
  const { user: { email } } = useAuth()


  return (
    <Card sx={{ maxWidth: 300, border: '1px solid black', marginTop: 10, marginRight: '40px', boxShadow: 'rgb(25, 26, 28)' }}>
      <CardMedia
        sx={{ height: 340, width: 300, marginTop: 10, margin: '0 auto' }}
        image={item.picture}
        title="green iguana"

      />
      <hr />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.name}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {item.descr}
        </Typography>
        <Typography sx={{ fontSize: '18px', fontWeight: 'bold', margin: '10px 0' }} variant="body2" color="text.secondary">
          ${item.price}
        </Typography>
        <Typography sx={{ fontWeight: '900', fontSize: '18px' }} variant="body2" color="text.secondary">
          {item.type}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-around' }} >
        {email === ADMIN ? (
          <>
            <Button sx={{ border: '1px solid red', color: 'red' }} onClick={() => deleteProduct(item.id)} size="small">DELETE</Button>
            <Button sx={{ border: '1px solid green', color: 'green' }} size="small" onClick={() => navigate(`/edit/${item.id}`)}>EDIT</Button>
          </>
        ) : <>
          <Button sx={{ border: '1px solid blue', color: 'blue' }} size="small">Details</Button>
          <IconButton onClick={() => addProductToCart(item)}><LocalGroceryStoreIcon sx={{ width: '40px', height: '30px' }} color={checkProductInCart(item.id) ? 'primary' : ''} /></IconButton>
        </>
        }

        {/* {email === ADMIN ? (<Button sx={{ border: '1px solid green', color: 'green' }} size="small" onClick={() => navigate(`/edit/${item.id}`)}>EDIT</Button>
        ) : null} */}

      </CardActions>
    </Card>
  );
}
