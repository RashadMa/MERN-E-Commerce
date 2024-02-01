import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../../components/Loader"
import { setCredentials } from "../../redux/features/auth/authSlice"
import { Link } from "react-router-dom"
import { useProfileMutation } from "../../redux/api/usersApiSlice"
import AdminMenu from "../Admin/AdminMenu"
// import Swal from "sweetalert2"

const Profile = () => {
      const [username, setUsername] = useState("")
      const [email, setEmail] = useState("")
      const [password, setPassword] = useState("")
      const [confirmPassword, setConfirmPassword] = useState("")
      const { userInfo } = useSelector(state => state.auth)
      const [updateProfile, { isloading: loadingUpdateProfile }] = useProfileMutation()

      const submitHandler = async (e) => {
            e.preventDefault();
            if (!email || !username) {
                  // Swal.fire({
                  //       position: "top-end",
                  //       icon: "error",
                  //       title: "Username or E-mail is required",
                  //       showConfirmButton: false,
                  //       timer: 1000
                  // });
            } else {
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
                              const res = await updateProfile({
                                    _id: userInfo._id,
                                    username,
                                    email,
                                    password,
                              }).unwrap();
                              dispatch(setCredentials({ ...res }));
                              // Swal.fire({
                              //       position: "top-end",
                              //       icon: "success",
                              //       title: "Profile updated successfully",
                              //       showConfirmButton: false,
                              //       timer: 1000
                              // });
                        } catch (err) {
                              // Swal.fire({
                              //       position: "top-end",
                              //       icon: "error",
                              //       title: err?.data?.message || err.error,
                              //       showConfirmButton: false,
                              //       timer: 1000
                              // });
                        }
                  }
            }
      };

      useEffect(() => {
            setUsername(userInfo.username)
            setEmail(userInfo.email)
      }, [userInfo.email, userInfo.username])
      const dispatch = useDispatch()

      return (
            <div className="container mx-auto p-4 mt-[10rem]">
                  {userInfo.isAdmin ? (
                        <AdminMenu />
                  ) : <></>}
                  <div className="flex justify-center align-center md:flex md:space-x-4">
                        <div className="md:w-1/3">
                              <div className="flex justify-around items-center">
                                    <h2 className="text-2xl font-semibold">Update Profile</h2>
                                    <Link
                                          to="/user-orders"
                                          className="bg-gray-600 text-gray-100 py-2 px-4 rounded hover:bg-black">
                                          My Orders
                                    </Link>
                              </div>
                              <form onSubmit={submitHandler}>
                                    <div className="mb-4">
                                          <label className="block text-white mb-2">Name</label>
                                          <input
                                                type="text"
                                                placeholder="Enter name"
                                                className="form-input p-4 rounded-sm w-full"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)} />
                                    </div>
                                    <div className="mb-4">
                                          <label className="block text-white mb-2">Email Address</label>
                                          <input
                                                type="email"
                                                placeholder="Enter email"
                                                className="form-input p-4 rounded-sm w-full"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div className="mb-4">
                                          <label className="block text-white mb-2">Password</label>
                                          <input
                                                type="password"
                                                placeholder="Enter password"
                                                className="form-input p-4 rounded-sm w-full"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                    <div className="mb-4">
                                          <label className="block text-white mb-2">Confirm Password</label>
                                          <input
                                                type="password"
                                                placeholder="Confirm password"
                                                className="form-input p-4 rounded-sm w-full"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)} />
                                    </div>
                                    <div className="flex justify-between">
                                          <button
                                                type="submit"
                                                className="bg-gray-600 text-gray-100 py-2 px-4 rounded hover:bg-black w-full">
                                                Update
                                          </button>

                                    </div>
                                    {loadingUpdateProfile && <Loader />}
                              </form>
                        </div>
                  </div>
            </div>
      )
}

export default Profile