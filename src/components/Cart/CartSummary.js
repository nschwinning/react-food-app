import { useContext } from "react";
import classes from "./CartSummary.module.css";
import CartContext from "../../store/cart-context";

const CartSummary = (props) => {
  const cartCtx = useContext(CartContext);

  return (
    <>
      <h2>Success!</h2>
      <p>
        Thanks for ordering. We will deliver your meals as soons as possible.
      </p>
      <ul className={classes["cart-items"]}>
        {cartCtx.items.map((item) => (
          <li className={classes["cart-item"]}>
            <div>
              <h2>{item.name}</h2>
              <div className={classes.summary}>
                <span className={classes.price}>{item.price.toFixed(2)}</span>
                <span className={classes.amount}>x {item.amount}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className={classes.actions}>
        <button onClick={props.onBack} className={classes.back}>
          Back
        </button>
      </div>
    </>
  );
};

export default CartSummary;
