import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { useState } from "react";
// import Swal from "sweetalert2";

const SmallProduct = ({ product }) => {
      const [qty] = useState(1);
      const dispatch = useDispatch();
      const addToCartHandler = () => {
            dispatch(addToCart({ ...product, qty }))
            // Swal.fire({
            //       position: "top-end",
            //       icon: "success",
            //       title: "Item added to cart",
            //       showConfirmButton: false,
            //       timer: 1000
            // });
      };
      console.log('====================================');
      console.log(product.name);
      console.log('====================================');

      return (
            <div className="w-[20rem] p-3">
                  <div className="relative">
                        <Link to={`/product/${product._id}`} >
                              <img
                                    src={product.image}
                                    alt={product.name}
                                    className="rounded"
                                    style={{ height: "224px", width: "100%", objectFit: "contain" }} />
                        </Link>
                        <div className="flex justify-between items-center">
                              <div className="bg-pink-100 text-pink-800 text-xs font-medium mt-6 px-2.5 py-0.5 rounded-full">
                                    ${product.price}
                              </div>
                              <FaShoppingCart className="mt-6 text-pink-800 text-xl cursor-pointer" onClick={addToCartHandler} />
                        </div>
                        <HeartIcon product={product} />
                  </div>
                  <div className="py-4">
                        <div >
                              <h2 className="flex justify-between items-center">
                                    <Link to={`/product/${product._id}`} >
                                          <div>{product.name}</div>
                                    </Link>
                              </h2>
                        </div>
                  </div>
            </div>
      );
};

export default SmallProduct;