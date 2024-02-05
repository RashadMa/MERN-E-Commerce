import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import "./Navigation.scss";

const Login = () => {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const dispatch = useDispatch();
      const navigate = useNavigate();
      const [login, { isLoading }] = useLoginMutation();
      const { userInfo } = useSelector((state) => state.auth);
      const { search } = useLocation();
      const sp = new URLSearchParams(search);
      const redirect = sp.get("redirect") || "/";

      useEffect(() => {
            if (userInfo) {
                  navigate(redirect);
            }
      }, [navigate, redirect, userInfo]);

      const submitHandler = async (e) => {
            e.preventDefault();
            try {
                  const res = await login({ email, password }).unwrap();
                  dispatch(setCredentials({ ...res }));
                  navigate(redirect);
                  console.log(res);
            } catch (err) {
                  console.log(err);
            }
      };

      return (
            <div>
                  <section className="container md:mt-36 sm:mt-10 justify-evenly mx-auto flex flex-wrap">
                        <div className="h-[500px] w-[400px] xl:block sm:hidden test">
                              <img
                                    src="https://raw.githubusercontent.com/RashadMa/React-promusic.az/main/promusic.az/src/assets/images/background/login.png"
                                    className="w-full h-full" />
                        </div>
                        <div className="xl:ml-[4rem] md:ml-0 sm:ml-0">
                              <h1 className="title">Login</h1>
                              <h1 className="subtitle">Login for shopping or create a new account!</h1>
                              <form onSubmit={submitHandler} className="form-container w-[40rem]">
                                    <div className="my-[2rem]">
                                          <label
                                                htmlFor="email"
                                                className="block text-lg font-normal"
                                                style={{ color: "#212529" }}>
                                                Email
                                          </label>
                                          <input
                                                type="email"
                                                id="email"
                                                className="input-cred"
                                                placeholder="Enter email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div className="mb-4">
                                          <label
                                                htmlFor="password"
                                                className="block text-lg font-normal"
                                                style={{ color: "#212529" }}>
                                                Password
                                          </label>
                                          <input
                                                type="password"
                                                id="password"
                                                className="input-cred"
                                                placeholder="Enter password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                    <button
                                          disabled={isLoading}
                                          type="submit"
                                          className="bg-gray-600 text-white px-8 py-2.5 rounded cursor-pointer my-[1rem]">
                                          {isLoading ? "Signing In..." : "Login"}
                                    </button>
                                    {isLoading && <Loader />}
                              </form>
                              <div className="mt-4">
                                    <p className="">
                                          Don't have any account ? {" "}
                                          <Link
                                                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                                                className="text-red-500 hover:underline"
                                          >
                                                Register
                                          </Link>
                                    </p>
                              </div>
                        </div>
                  </section>
            </div>
      );
};

export default Login;