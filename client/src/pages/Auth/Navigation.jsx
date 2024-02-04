import { useState } from "react";
import { AiOutlineHome, AiOutlineShopping, AiOutlineLogin, AiOutlineUserAdd, AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";
import "./Navigation.scss";

const Navigation = () => {
      const { userInfo } = useSelector((state) => state.auth);
      const { cartItems } = useSelector((state) => state.cart);
      const [dropdownOpen, setDropdownOpen] = useState(false);
      const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
      const dispatch = useDispatch();
      const navigate = useNavigate();
      const [logoutApiCall] = useLogoutMutation();

      const logoutHandler = async () => {
            try {
                  await logoutApiCall().unwrap();
                  dispatch(logout());
                  navigate("/login");
            } catch (error) {
                  console.error(error);
            }
      };

      return (
            <nav className="flex justify-between items-center bg-[#000] p-4 text-white">
                  <div className="flex items-center space-x-4">
                        <Link to="/" className="flex items-center">
                              <span className="mr-2 hidden md:inline">Home</span>
                              <AiOutlineHome size={26} />
                        </Link>
                        <Link to="/shop" className="flex items-center mr-2">
                              <span className="mr-2 hidden md:inline">Shop</span>
                              <AiOutlineShopping size={26} />
                        </Link>
                        <Link to="/cart" className="flex relative items-center mr-2">
                              <span className="mr-2 hidden md:inline">Cart</span>
                              <AiOutlineShoppingCart size={26} />
                              {cartItems.length > 0 && (
                                    <span className="absolute -top-3 -right-3 px-1 py-0 text-xs text-white bg-pink-500 rounded-full">
                                          {cartItems.reduce((a, c) => a + c.qty, 0)}
                                    </span>
                              )}
                        </Link>
                        <Link to="/favorites" className="flex relative items-center mr-2">
                              <span className="mr-2 hidden md:inline">Favorites</span>
                              <AiOutlineHeart size={26} />
                              <FavoritesCount />
                        </Link>
                  </div>
                  <div className="flex items-center">
                        <button onClick={toggleDropdown} className="mr-4 focus:outline-none flex items-center">
                              {userInfo ? (
                                    <>
                                          <span className="text-white capitalize">{userInfo.username}</span>
                                          <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className={`h-4 w-4 ml-1 ${dropdownOpen ? "transform rotate-180" : ""}`}
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="white">
                                                <path d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                          </svg>
                                    </>
                              ) : null}
                        </button>
                        {dropdownOpen && userInfo && (
                              <ul
                                    style={{ zIndex: 100 }}
                                    className={`absolute right-0 mr-4 space-y-2 bg-black text-white ${!userInfo.isAdmin ? "top-12" : "top-12"}`}>
                                    {userInfo.isAdmin && (
                                          <>
                                                <li>
                                                      <Link to="/admin/dashboard" className="block px-4 py-2 hover:bg-gray-800">
                                                            Dashboard
                                                      </Link>
                                                </li>
                                                <li>
                                                      <Link to="/admin/productlist" className="block px-4 py-2 hover:bg-gray-800">
                                                            Products
                                                      </Link>
                                                </li>
                                                <li>
                                                      <Link to="/admin/categorylist" className="block px-4 py-2 hover:bg-gray-800">
                                                            Category
                                                      </Link>
                                                </li>
                                                <li>
                                                      <Link to="/admin/orderlist" className="block px-4 py-2 hover:bg-gray-800">
                                                            Orders
                                                      </Link>
                                                </li>
                                                <li>
                                                      <Link to="/admin/userlist" className="block px-4 py-2 hover:bg-gray-800">
                                                            Users
                                                      </Link>
                                                </li>
                                          </>
                                    )}
                                    <li>
                                          <Link to="/profile" className="block px-4 py-2 hover:bg-gray-800">
                                                Profile
                                          </Link>
                                    </li>
                                    <li>
                                          <button onClick={logoutHandler} className="block w-full px-4 py-2 text-left hover:bg-gray-800">
                                                Logout
                                          </button>
                                    </li>
                              </ul>
                        )}
                        {!userInfo && (
                              <ul className="flex items-center space-x-4">
                                    <li>
                                          <Link to="/login" className="flex items-center transition-transform transform hover:-translate-y-0.5">
                                                <AiOutlineLogin size={26} />
                                                <span className="nav-item-name hidden md:inline">Login</span>
                                          </Link>
                                    </li>
                                    <li>
                                          <Link to="/register" className="flex items-center transition-transform transform hover:-translate-y-0.5">
                                                <AiOutlineUserAdd size={26} />
                                                <span className="nav-item-name hidden md:inline">Register</span>
                                          </Link>
                                    </li>
                              </ul>
                        )}
                  </div>
            </nav>
      );
};

export default Navigation;
