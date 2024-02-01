import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import ProgressSteps from "../../components/ProgressSteps";
import Loader from "../../components/Loader";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";
// import Swal from "sweetalert2";

const PlaceOrder = () => {
      const navigate = useNavigate();
      const cart = useSelector((state) => state.cart);
      const [createOrder, { isLoading, error }] = useCreateOrderMutation();
      useEffect(() => {
            if (!cart.shippingAddress.address) {
                  navigate("/shipping");
            }
      }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);
      const dispatch = useDispatch();
      const placeOrderHandler = async () => {
            try {
                  const res = await createOrder({
                        orderItems: cart.cartItems,
                        shippingAddress: cart.shippingAddress,
                        paymentMethod: cart.paymentMethod,
                        itemsPrice: cart.itemsPrice,
                        shippingPrice: cart.shippingPrice,
                        taxPrice: cart.taxPrice,
                        totalPrice: cart.totalPrice,
                  }).unwrap();
                  dispatch(clearCartItems());
                  navigate(`/order/${res._id}`);
            } catch (error) {
                  // Swal.fire({
                  //       position: "top-end",
                  //       icon: "error",
                  //       title: error,
                  //       showConfirmButton: false,
                  //       timer: 1000
                  // });
            }
      };

      return (
            <>
                  <ProgressSteps step1 step2 step3 />
                  <div className="container mx-auto mt-8">
                        {cart.cartItems.length === 0 ? (
                              <Message>Your cart is empty</Message>
                        ) : (
                              <div className="overflow-x-auto">
                                    <table className="w-full border-collapse">
                                          <thead>
                                                <tr>
                                                      <td className="px-1 py-2 text-left align-top">Image</td>
                                                      <td className="px-1 py-2 text-left">Product</td>
                                                      <td className="px-1 py-2 text-left">Quantity</td>
                                                      <td className="px-1 py-2 text-left">Price</td>
                                                      <td className="px-1 py-2 text-left">Total</td>
                                                </tr>
                                          </thead>
                                          <tbody>
                                                {cart.cartItems.map((item, index) => (
                                                      <tr key={index}>
                                                            <td className="p-2">
                                                                  <img
                                                                        src={item.image}
                                                                        alt={item.name}
                                                                        className="w-16 h-16 object-cover" />
                                                            </td>
                                                            <td className="p-2"><Link to={`/product/${item.product}`}>{item.name}</Link></td>
                                                            <td className="p-2">{item.qty}</td>
                                                            <td className="p-2">{item.price.toFixed(2)}</td>
                                                            <td className="p-2">$ {(item.qty * item.price).toFixed(2)}</td>
                                                      </tr>
                                                ))}
                                          </tbody>
                                    </table>
                              </div>
                        )}
                        <div className="mt-8">
                              <h2 className="text-2xl font-semibold mb-5">Order Summary</h2>
                              <div className="flex justify-between flex-wrap p-8 ">
                                    <ul className="text-lg">
                                          <li>
                                                <span className="font-semibold mb-4 mr-1">Items:</span>
                                                <span className="bg-pink-100 text-pink-800 rounded-full"> $ {cart.itemsPrice}</span>
                                          </li>
                                          <li>
                                                <span className="font-semibold mb-4 mr-1">Shipping:</span>
                                                <span className="bg-pink-100 text-pink-800 rounded-full"> $ {cart.shippingPrice}</span>
                                          </li>
                                          <li>
                                                <span className="font-semibold mb-4 mr-1">Tax:</span>
                                                <span className="bg-pink-100 text-pink-800 rounded-full" > $ {cart.taxPrice}</span>
                                          </li>
                                          <li>
                                                <span className="font-semibold mb-4 mr-1">Total:</span>
                                                <span className="bg-pink-100 text-pink-800 rounded-full"> $ {cart.totalPrice}</span>
                                          </li>
                                    </ul>
                                    {error && <Message variant="danger">{error.data.message}</Message>}
                                    <div>
                                          <h2 className="text-2xl font-semibold mb-4">Shipping</h2>
                                          <p>
                                                <strong>Address:</strong> {cart.shippingAddress.address},{" "}
                                                {cart.shippingAddress.city} {cart.shippingAddress.postalCode},{" "}
                                                {cart.shippingAddress.country}
                                          </p>
                                    </div>
                                    <div>
                                          <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
                                          <strong>Method:</strong> {cart.paymentMethod}
                                    </div>
                              </div>
                              <button
                                    type="button"
                                    className="bg-gray-600 text-gray-100 rounded-md py-2 px-4 text-lg w-full mt-4"
                                    disabled={cart.cartItems === 0}
                                    onClick={placeOrderHandler}>
                                    Place Order
                              </button>
                              {isLoading && <Loader />}
                        </div>
                  </div>
            </>
      );
};

export default PlaceOrder;