import React from 'react'
import { useSelector } from 'react-redux'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { useTranslation } from 'react-i18next'


export const CartTable = () => {

  const { t } = useTranslation()
  const TAX_SHIPPING = 0.1
  const cart = useSelector(state => state.cartR) || []

  function ccyFormat(num) {
    return `${num.toFixed(2)}`
  }

  function subtotal(items) {
    return items.reduce((sum, i) => sum + (i.amountOfGoods * i.priceOfGoods), 0)
  }

  const invoiceSubtotal = subtotal(cart)
  const invoiceTaxes = (TAX_SHIPPING * invoiceSubtotal > 10) ? TAX_SHIPPING * invoiceSubtotal : (TAX_SHIPPING * invoiceSubtotal === 0) ? 0 : 10
  const invoiceTotal = invoiceTaxes + invoiceSubtotal

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label='spanning table'>
          <TableHead>
            <TableRow>
              <TableCell align='center' colSpan={3}>
                <h3 style={{ margin: '0', padding: '0' }}>{t('cart')}</h3>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>{t('desc')}</strong></TableCell>
              <TableCell align='right'><strong>{t('qty')}</strong></TableCell>
              <TableCell align='right'><strong>{t('Price')}($)</strong></TableCell>
              <TableCell align='right'><strong>{t('sum')}($)</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((el) => (
              <TableRow key={el.id}>
                <TableCell>{el.nameOfGoods}</TableCell>
                <TableCell align='right'>{el.amountOfGoods}</TableCell>
                <TableCell align='right'>{el.priceOfGoods}</TableCell>
                <TableCell align='right'>{ccyFormat(el.amountOfGoods * el.priceOfGoods)}</TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2}>{t('subtotal')}</TableCell>
              <TableCell align='right'>{ccyFormat(invoiceSubtotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{t('tax_ship')}</TableCell>
              <TableCell align='right'>{`${(TAX_SHIPPING * 100).toFixed(0)} %`} ({t('min')}$10)</TableCell>
              <TableCell align='right'>{ccyFormat(invoiceTaxes)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>{t('total')}</TableCell>
              <TableCell align='right'>{ccyFormat(invoiceTotal)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
