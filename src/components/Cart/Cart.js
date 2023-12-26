import { useContext, useState } from "react";

import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import CartSummary from "./CartSummary";

const Cart = (props) => {
  const { onHideCart } = props;
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [hasCheckedOut, setHasCheckedOut] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckingOut(true);
  };

  const cancelCheckout = () => {
    setIsCheckingOut(false);
  };

  const resetHandler = () => {
    setIsCheckingOut(false);
    setHasCheckedOut(false);
    cartCtx.clearCart();
    onHideCart();
  };

  const submitOrderHandler = (userData) => {
    fetch("http://localhost:8741/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: userData,
        items: cartCtx.items,
      }),
    });
    setIsCheckingOut(false);
    setHasCheckedOut(true);
  };

  const modalActions = (
    <div className={classes.actions}>
      <button onClick={onHideCart} className={classes["button--alt"]}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartContent = (
    <>
      <ul className={classes["cart-items"]}>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
          />
        ))}
      </ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
    </>
  );

  return (
    <Modal onClose={onHideCart}>
      {!isCheckingOut && !hasCheckedOut && cartContent}
      {isCheckingOut && (
        <Checkout onConfirm={submitOrderHandler} onCancel={cancelCheckout} />
      )}
      {hasCheckedOut && <CartSummary onBack={resetHandler} />}
      {!isCheckingOut && !hasCheckedOut && modalActions}
    </Modal>
  );
};

export default Cart;
