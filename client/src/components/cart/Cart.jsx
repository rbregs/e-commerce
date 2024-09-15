import React from "react";
import MetaData from "../pageLayout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCartItems ,removeCartItem } from "../../redux/features/cartSlice";

export default function Cart() {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch  = useDispatch()
  const navigate = useNavigate()
  
  const handleAddItem = (item, quantity) => {
                                              const newQty = quantity + 1;
                                              if (newQty <= item?.stock) {
                                                setItemToCart(item, newQty);
                                              }
                                            };
  
  const handleSubtractItem = (item, quantity) => {
                                                    const newQty = quantity - 1;
                                                    if (newQty > 0) {
                                                      setItemToCart(item, newQty);
                                                    }
                                                  };

  const deleteItem = (id) => {
                                dispatch(removeCartItem(id))
                             };
  
  const setItemToCart = (item,newQty) => {
                                            const cartItem = {
                                              product:item?.product,
                                              name:item?.name,
                                              price:item?.price,
                                              image:item?.image,
                                              stock:item?.stock,
                                              quantity:newQty
                                            }
                                            dispatch(setCartItems(cartItem))
                                          }

  const checkOutHandler = () => {
                                  navigate('/shipping')
                                }

  return (
    <>
      <MetaData title={"Your Cart"} />
      {cartItems?.length === 0 ? (
        <h2 className="mt-5">Your Cart is Empty</h2>
      ) : (
        <>
          <h2 className="mt-5">
            Your Cart: <b  style={{ color: 'green' }}>{cartItems?.length}</b>
          </h2>
          <div className="cartContainer">
            <div className="cartProductContainer">
              {cartItems.map((item) => (
                <>
                  <hr />
                  <div className="cart-item" data-key="product1">
                    <div className="row">
                      <div className="cartImage">
                        <img
                          src={item?.image}
                          alt="Laptop"
                          height="90"
                          width="115"
                        />
                      </div>
                      <div className="col-5 col-lg-3">
                        <Link to={`/product/${item?.product}`}> {item?.name} </Link>
                      </div>
                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p id="card_item_price">{item?.price}</p>
                      </div>
                      <div className="cartQuantity">
                        <div className="stockCounter">
                          <span className="btn btn-danger minus" onClick={() => handleSubtractItem(item,item.quantity)}>
                             - </span>
                          <input className="inputField"
                            // type="number"
                            value= {item?.quantity}
                            readOnly
                          />
                          <span className="btn btn-primary plus" onClick={() => handleAddItem(item,item.quantity)}> 
                            + </span>
                        </div>
                      </div>
                      <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                      
                        <button className="cartDelete" onClick={()=> deleteItem(item?.product)}><i className="fas fa-trash"></i></button>
                      </div>
                    </div>
                  </div>
                </>
              ))}

              <hr />
            </div>

            <div className="col-12 col-lg-3 my-4">
              <div id="order_summary">
                <h4>Order Summary</h4>
                <hr />
                <p>
                  Unit(s):{" "}
                  <span className="order-summary-values">
                  {cartItems?.reduce((acc,item) => acc + item?.quantity, 0)}
                  {" "} (Units)</span>
                </p>
                <p>
                  Est. total:{" "}
                  <span className="order-summary-values">{cartItems?.reduce((acc,item) => acc + item?.quantity * item.price, 0).toFixed(2)}</span>
                </p>
                <hr />
                <button id="checkout_btn" className="btn btn-primary w-100" onClick={checkOutHandler}>
                  Check out

                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
