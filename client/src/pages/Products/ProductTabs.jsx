import { useState } from "react";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import { FaStar } from "react-icons/fa";

const ProductTabs = ({ loadingProductReview, userInfo, submitHandler, rating, setRating, comment, setComment, product, }) => {
      const { isLoading } = useGetTopProductsQuery();
      const [activeTab, setActiveTab] = useState(1);
      const [hoverRating, setHoverRating] = useState(null);
      if (isLoading) {
            return <Loader />;
      }
      const handleTabClick = (tabNumber) => {
            setActiveTab(tabNumber);
      };
      return (
            <div className="container mx-auto flex flex-col md:flex-row gap-11">
                  <section className="w-[12rem] h-full rounded-md bg-gray-200">
                        <div
                              className={`flex-1 p-4 cursor-pointer text-lg ${activeTab === 1 ? "font-bold" : ""}`} onClick={() => handleTabClick(1)}>
                              Write Your Review
                        </div>
                        <div
                              className={`flex-1 p-4 cursor-pointer text-lg ${activeTab === 2 ? "font-bold" : ""}`} onClick={() => handleTabClick(2)}>
                              All Comments ({product.reviews.length})
                        </div>
                  </section>
                  <div>
                        <section>
                              {activeTab === 1 && (
                                    <div className="bg-gray-200 p-4 rounded-lg xl:w-[50rem] sm:w-[24rem]">
                                          {userInfo ? (
                                                <form onSubmit={submitHandler}>
                                                      <div className="flex">
                                                            <label htmlFor="rating" className="block font-bold text-xl mr-2">
                                                                  Rating
                                                            </label>
                                                            <div className="flex items-center">
                                                                  {[1, 2, 3, 4, 5].map((value) => (
                                                                        <FaStar
                                                                              key={value}
                                                                              id="rating"
                                                                              required
                                                                              value={rating}
                                                                              className={`text-gray-400 cursor-pointer ${value <= (hoverRating !== null ? hoverRating : rating) ? 'text-yellow-500' : ''
                                                                                    }`}
                                                                              onMouseEnter={() => setHoverRating(value)}
                                                                              onMouseLeave={() => setHoverRating(null)}
                                                                              onClick={() => setRating(value)}
                                                                        />
                                                                  ))}
                                                            </div>
                                                      </div>
                                                      <div className="my-2">
                                                            <label htmlFor="comment" className="block text-xl mb-2">
                                                                  Comment
                                                            </label>
                                                            <textarea
                                                                  id="comment"
                                                                  rows="3"
                                                                  required
                                                                  value={comment}
                                                                  onChange={(e) => setComment(e.target.value)}
                                                                  className="p-2 border rounded-lg xl:w-[40rem] text-black">
                                                            </textarea>
                                                      </div>
                                                      <button
                                                            type="submit"
                                                            disabled={loadingProductReview}
                                                            className="bg-gray-600 text-white px-8 py-2.5 rounded cursor-pointer">
                                                            Submit
                                                      </button>
                                                </form>
                                          ) : (
                                                <p>
                                                      Please <Link to="/login" className="hover:underline font-bold">Login</Link> to write a review
                                                </p>
                                          )}
                                    </div>
                              )}
                        </section>
                        <section>
                              {activeTab === 2 && (
                                    <>
                                          <div>{product.reviews.length === 0 && <p>No Reviews</p>}</div>
                                          <div>
                                                {product.reviews.map((review) => (
                                                      <div
                                                            key={review._id}
                                                            className="bg-gray-200 p-4 rounded-lg xl:w-[50rem] sm:w-[24rem] mb-5">
                                                            <div className="flex justify-between">
                                                                  <strong className="capitalize">{review.name}</strong>
                                                                  <p className="">
                                                                        {review.createdAt.substring(0, 10)}
                                                                  </p>
                                                            </div>
                                                            <p className="my-4">{review.comment}</p>
                                                            <Ratings value={review.rating} />
                                                      </div>
                                                ))}
                                          </div>
                                    </>
                              )}
                        </section>
                  </div>
            </div>
      );
};

export default ProductTabs;