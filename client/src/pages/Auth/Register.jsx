import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import "./Navigation.scss";
// import Swal from "sweetalert2";

const Register = () => {
      const [username, setName] = useState("");
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [confirmPassword, setConfirmPassword] = useState("");
      const dispatch = useDispatch();
      const navigate = useNavigate();
      const [register, { isLoading }] = useRegisterMutation();
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

            if (password !== confirmPassword) {
                  // Swal.fire({
                  //       position: "top-end",
                  //       icon: "error",
                  //       title: "Password do not match",
                  //       showConfirmButton: false,
                  //       timer: 1000
                  // });
            } else {
                  try {
                        const res = await register({ username, email, password }).unwrap();
                        dispatch(setCredentials({ ...res }));
                        navigate(redirect);
                        // Swal.fire({
                        //       position: "top-end",
                        //       icon: "success",
                        //       title: "User successfully registered",
                        //       showConfirmButton: false,
                        //       timer: 1000
                        // });
                  } catch (err) {
                        console.log(err);
                        // Swal.fire({
                        //       position: "top-end",
                        //       icon: "error",
                        //       title: err.data.message,
                        //       showConfirmButton: false,
                        //       timer: 1000
                        // });
                  }
            }
      };

      return (
            <section className="container md:mt-36 sm:mt-10 justify-evenly mx-auto flex flex-wrap">
                  <div className="h-[500px] w-[400px] xl:block sm:hidden test">
                        <img
                              src="https://raw.githubusercontent.com/RashadMa/React-promusic.az/main/promusic.az/src/assets/images/background/login.png"
                              className="w-full h-full" />
                  </div>
                  <div className="xl:ml-[4rem] md:ml-0 sm:ml-0">
                        <h1 className="title">Create a new account</h1>
                        <h1 className="subtitle">Log in to your account by confirming your mobile number and easily manage your orders.</h1>
                        <form onSubmit={submitHandler} className="container">
                              <div className="grid  sm:grid-cols-2 gap-7">
                                    <div className="my-[2rem]">
                                          <label
                                                htmlFor="name"
                                                className="block text-lg font-normal">
                                                Name
                                          </label>
                                          <input
                                                type="text"
                                                id="name"
                                                className="input-cred w-full"
                                                placeholder="Enter name"
                                                value={username}
                                                onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    <div className="my-[2rem]">
                                          <label
                                                htmlFor="email"
                                                className="block text-lg font-normal">
                                                Email
                                          </label>
                                          <input
                                                type="email"
                                                id="email"
                                                className="input-cred w-full"
                                                placeholder="Enter email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div className="my-[2rem]">
                                          <label
                                                htmlFor="password"
                                                className="block text-lg font-normal">
                                                Password
                                          </label>
                                          <input
                                                type="password"
                                                id="password"
                                                className="input-cred w-full"
                                                placeholder="Enter password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                    <div className="my-[2rem]">
                                          <label
                                                htmlFor="confirmPassword"
                                                className="block text-lg font-normal">
                                                Confirm Password
                                          </label>
                                          <input
                                                type="password"
                                                id="confirmPassword"
                                                className="input-cred w-full"
                                                placeholder="Confirm password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)} />
                                    </div>
                              </div>
                              <button
                                    disabled={isLoading}
                                    type="submit"
                                    className="bg-gray-600 text-white px-8 py-2.5 rounded cursor-pointer my-[1rem]">
                                    {isLoading ? "Registering..." : "Register"}
                              </button>
                              {isLoading && <Loader />}
                        </form>
                        <div className="mt-4">
                              <p className="">
                                    Already have an account?{" "}
                                    <Link
                                          to={redirect ? `/login?redirect=${redirect}` : "/login"}
                                          className="text-red-500 hover:underline">
                                          Login
                                    </Link>
                              </p>
                        </div>
                  </div>
            </section>
      );
};

export default Register;