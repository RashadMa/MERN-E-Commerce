import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductDetailsQuery, useCreateReviewMutation, } from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { FaBox, FaShoppingCart, FaStore, } from "react-icons/fa";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";
import Swal from "sweetalert2";

const ProductDetails = () => {
      const { id: productId } = useParams();
      const dispatch = useDispatch();
      const [qty, setQty] = useState(1);
      const [rating, setRating] = useState(0);
      const [comment, setComment] = useState("");
      const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId);
      const { userInfo } = useSelector((state) => state.auth);
      const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation();

      const submitHandler = async (e) => {
            e.preventDefault();
            try {
                  await createReview({
                        productId,
                        rating,
                        comment,
                  }).unwrap();
                  refetch();
                  Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Review created successfully",
                        showConfirmButton: false,
                        timer: 1000
                  });
                  setComment("")
            } catch (error) {
                  Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: error?.data || error.message,
                        showConfirmButton: false,
                        timer: 1000
                  });
            }
      };

      const addToCartHandler = () => {
            dispatch(addToCart({ ...product, qty }));
            Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Item added to cart",
                  showConfirmButton: false,
                  timer: 1000
            });
      };

      return (
            <>
                  <div>
                        <Link to="/" className="font-semibold hover:underline ml-[10rem]">
                              Go Back
                        </Link>
                  </div >
                  {
                        isLoading ? (
                              <Loader />
                        ) : error ? (
                              <Message variant="danger">
                                    {error?.data?.message || error.message}
                              </Message>
                        ) : (
                              <>
                                    <div className="flex flex-wrap relative items-between mt-[2rem] justify-around">
                                          <div className="relative">
                                                <img
                                                      src={product.image}
                                                      alt={product.name}
                                                      className="xl:w-[500px] lg:w-[45rem] md:w-[30rem] sm:w-[20rem] mr-[2rem]" />
                                                <HeartIcon product={product} />
                                          </div>
                                          <div className="flex flex-col justify-between">
                                                <div className="flex justify-between">
                                                      <h2 className="text-2xl font-semibold">{product.name}</h2>
                                                      <p className="bg-pink-100 text-pink-800 inline text-2xl rounded-full px-2 font-extrabold">$ {product.price}</p>
                                                </div>
                                                <p className="my-4 xl:w-[35rem] lg:w-[35rem] md:w-[30rem] text-[#B0B0B0]">
                                                      {product.description}
                                                </p>
                                                <div className="flex items-center justify-between">
                                                      <div className="one">
                                                            <h1 className="flex items-center mb-6">
                                                                  <FaStore className="mr-2 text-pink-800 text-xl" /> Brand:{" "}
                                                                  {product.brand}
                                                            </h1>
                                                            <h1 className="flex items-center mb-6">
                                                                  <Ratings value={product.rating} />
                                                            </h1>
                                                      </div>
                                                      <div className="two">
                                                            <h1 className="flex items-center mb-6">
                                                                  <FaShoppingCart className="mr-2 text-pink-800 text-xl" /> Quantity:{" "}
                                                                  {product.quantity}
                                                            </h1>
                                                            <h1 className="flex items-center mb-6 w-[10rem]">
                                                                  <FaBox className="mr-2 text-pink-800 text-xl" /> In Stock:{" "}
                                                                  {product.countInStock}
                                                            </h1>
                                                      </div>
                                                </div>
                                                <div className="flex justify-between flex-wrap">
                                                      <div className="btn-container">
                                                            <button
                                                                  onClick={addToCartHandler}
                                                                  disabled={product.countInStock === 0}
                                                                  className="bg-gray-600 text-white px-8 py-2.5 rounded cursor-pointer">
                                                                  Add To Cart
                                                            </button>
                                                      </div>
                                                      {product.countInStock > 0 && (
                                                            <div>
                                                                  <select
                                                                        value={qty}
                                                                        onChange={(e) => setQty(e.target.value)}
                                                                        className="p-2 w-[6rem] rounded-lg text-black">
                                                                        {[...Array(product.countInStock).keys()].map((x) => (
                                                                              <option key={x + 1} value={x + 1}>
                                                                                    {x + 1}
                                                                              </option>
                                                                        ))}
                                                                  </select>
                                                            </div>
                                                      )}
                                                </div>
                                          </div>
                                          <div className="mt-[5rem] container flex flex-wrap items-center">
                                                <ProductTabs
                                                      loadingProductReview={loadingProductReview}
                                                      userInfo={userInfo}
                                                      submitHandler={submitHandler}
                                                      rating={rating}
                                                      setRating={setRating}
                                                      comment={comment}
                                                      setComment={setComment}
                                                      product={product} />
                                          </div>
                                    </div>
                              </>
                        )}
            </>
      );
};

export default ProductDetails;