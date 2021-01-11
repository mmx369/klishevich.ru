import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { initItems } from '../reducers/cartReducer'
import { useHistory } from "react-router-dom";


const CartTable = () => {

  const useStyles = makeStyles(() => ({
    table: {
      minWidth: 300,
    },
  }));

  const TAX_SHIPPING = 0.1;

  const cart = useSelector(state => state.cartR) || []

  function ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }

  function subtotal(items) {
    return items.reduce((sum, i) => sum + (i.amountOfGoods * i.priceOfGoods), 0)
  }

  const invoiceSubtotal = subtotal(cart);
  const invoiceTaxes = (TAX_SHIPPING * invoiceSubtotal > 10) ? TAX_SHIPPING * invoiceSubtotal : (TAX_SHIPPING * invoiceSubtotal === 0) ? 0 : 10;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  const classes = useStyles();

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={3}>
                Cart
      </TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell align="right">Qty.</TableCell>
              <TableCell align="right">Unit</TableCell>
              <TableCell align="right">Sum</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((el) => (
              <TableRow key={el.id}>
                <TableCell>{el.nameOfGoods}</TableCell>
                <TableCell align="right">{el.amountOfGoods}</TableCell>
                <TableCell align="right">{el.priceOfGoods}</TableCell>
                <TableCell align="right">{ccyFormat(el.amountOfGoods * el.priceOfGoods)}</TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tax & shipping</TableCell>
              <TableCell align="right">{`${(TAX_SHIPPING * 100).toFixed(0)} %`} (min.$10)</TableCell>
              <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

const EmptyCart = () => {

  return (
    <div>
      <h1>Your cart is empty</h1>
    </div>
  )
}


const CartTest = () => {

  let history = useHistory();

  function handleClick() {
    history.push("/checkout");
  }

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initItems())
  }, [dispatch]);

  const handleClearCart = () => {
    window.localStorage.removeItem('cart')
    window.location.reload()
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

  const isCartEmpty = !window.localStorage.getItem('cart')

  const classes = useStyles();

  return (
    <>
      {isCartEmpty && <EmptyCart />}
      {isCartEmpty || <CartTable />}

      <div className={classes.root}>
        <Button variant="contained" color="primary" onClick={() => handleClearCart()}>
          Clear cart
      </Button>
        <Button variant="contained" color="primary" onClick={handleClick}>
          Check out
      </Button>
      </div>
    </>
  );
}

export default CartTest
