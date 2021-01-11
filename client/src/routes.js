import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import About from './components/About'
import AddNewBlog from './components/AddNewBlog'
import AddNewItem from './components/AddNewItem'
import BlogList from './components/BlogList'
import CartTest from './components/CartTest'
import CheckOut from './components/CheckOut'
import Home from './components/Home'
import Shop from './components/Shop'
import SignUp from './components/SignUp'
import Work from './components/Work'
import LoginModal from './components/LoginModal'

export const useRoutes = () => {

  return (
    <Switch>
      <Route path="/work" exact>
        <Work />
      </Route>
      <Route path="/about" exact>
        <About />
      </Route>
      <Route path="/shop" exact >
        <Shop />
      </Route>
      <Route path="/blog" exact >
        <BlogList />
      </Route>
      <Route path="/cart" exact >
        <CartTest />
      </Route>
      <Route path="/signup" exact >
        <SignUp />
      </Route>
      <Route path="/signin" exact >
        <LoginModal />
      </Route>
      <Route path="/_addingItem" exact >
        <AddNewItem />
      </Route>
      <Route path="/_addingNewBlog" exact >
        <AddNewBlog author={'user'} />
      </Route>
      <Route path="/checkout" exact >
        <CheckOut />
      </Route>
      <Route path="/" exact >
        <Home />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}