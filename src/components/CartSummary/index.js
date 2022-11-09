import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => {
  const computeCartTotal = cartItemList => {
    const cartTotal = 0

    cartItemList.reduce((previousTotal, currentCartListItem) => {
      const {price, quantity} = currentCartListItem
      const currentCartItemTotalPrice = price * quantity

      const updatedCartItemTotalPrice =
        previousTotal + currentCartItemTotalPrice

      return updatedCartItemTotalPrice
    }, cartTotal)
  }

  return (
    <div className="cart-summary-container">
      <div className="cart-summary-details-container">
        <CartContext.Consumer>
          {cartContextDataObject => {
            const {cartList} = cartContextDataObject

            return (
              <>
                <h1 className="cart-order-total-text">
                  Order Total:{' '}
                  <span className="cart-order-total">
                    Rs {computeCartTotal(cartList)}/-
                  </span>
                </h1>
                <p className="cart-item-count-text">
                  {cartList.length} Items in cart
                </p>
              </>
            )
          }}
        </CartContext.Consumer>
      </div>
      <button type="button" className="cart-checkout-button">
        Checkout
      </button>
    </div>
  )
}

export default CartSummary
