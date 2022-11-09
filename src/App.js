import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    //   TODO: Update the code here to implement addCartItem
  }

  removeAllCartItems = () =>
    this.setState({
      cartList: [],
    })

  removeCartItem = cartItemProductId =>
    this.setState(prevState => {
      const filteredCartList = prevState.cartList.filter(
        cartListItem => cartListItem.id !== cartItemProductId,
      )

      return {
        cartList: filteredCartList,
      }
    })

  incrementCartItemQuantity = cartItemProductId =>
    this.setState(prevState => {
      const {cartList} = prevState

      const updatedCartList = cartList.map(cartListItem => {
        let updatedCartListItem = {}
        if (cartListItem.id === cartItemProductId) {
          updatedCartListItem = {
            ...cartListItem,
            quantity: cartListItem.quantity + 1,
          }
        } else {
          updatedCartListItem = {...cartListItem}
        }

        return updatedCartListItem
      })

      return {
        cartList: updatedCartList,
      }
    })

  decrementCartItemQuantity = cartItemProductId =>
    this.setState(prevState => {
      const {cartList} = prevState

      const cartItemProductData = cartList.find(
        cartListItem => cartListItem.id === cartItemProductId,
      )
      let updatedCartList = null

      if (cartItemProductData.quantity === 1) {
        updatedCartList = cartList.filter(
          cartListItem => cartListItem.id !== cartItemProductId,
        )
      } else {
        updatedCartList = cartList.map(cartListItem => {
          let updatedCartListItem = {}
          if (cartListItem.id === cartItemProductId) {
            updatedCartListItem = {
              ...cartListItem,
              quantity: cartListItem.quantity - 1,
            }
          } else {
            updatedCartListItem = {...cartListItem}
          }

          return updatedCartListItem
        })
      }

      return {
        cartList: updatedCartList,
      }
    })

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
