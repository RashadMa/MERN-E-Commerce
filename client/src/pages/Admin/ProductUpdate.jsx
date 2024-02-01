import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateProductMutation, useDeleteProductMutation, useGetProductByIdQuery, useUploadProductImageMutation } from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
// import Swal from "sweetalert2";

const AdminProductUpdate = () => {
      const params = useParams();
      const { data: productData } = useGetProductByIdQuery(params._id);
      const [image, setImage] = useState(productData?.image || "");
      const [name, setName] = useState(productData?.name || "");
      const [description, setDescription] = useState(productData?.description || "");
      const [price, setPrice] = useState(productData?.price || "");
      const [category, setCategory] = useState(productData?.category || "");
      const [quantity, setQuantity] = useState(productData?.quantity || "");
      const [brand, setBrand] = useState(productData?.brand || "");
      const [stock, setStock] = useState(productData?.countInStock);
      // const navigate = useNavigate();
      const { data: categories = [] } = useFetchCategoriesQuery();
      const [uploadProductImage] = useUploadProductImageMutation();
      const [updateProduct] = useUpdateProductMutation();
      const [deleteProduct] = useDeleteProductMutation();

      useEffect(() => {
            if (productData && productData._id) {
                  setName(productData.name);
                  setDescription(productData.description);
                  setPrice(productData.price);
                  setCategory(productData.category?._id);
                  setQuantity(productData.quantity);
                  setBrand(productData.brand);
                  setImage(productData.image);
            }
      }, [productData]);

      const uploadFileHandler = async (e) => {
            const formData = new FormData();
            formData.append("image", e.target.files[0]);
            try {
                  const res = await uploadProductImage(formData).unwrap();
                  // Swal.fire({
                  //       position: "top-end",
                  //       icon: "success",
                  //       title: "Item added successfully.",
                  //       showConfirmButton: false,
                  //       timer: 1500
                  // });
                  setImage(res.image);
            } catch (err) {
                  // Swal.fire({
                  //       position: "top-end",
                  //       icon: "error",
                  //       title: "Item added failed. Try again.",
                  //       showConfirmButton: false,
                  //       timer: 1500
                  // });
            }
      };

      const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                  const formData = new FormData();
                  formData.append("image", image);
                  formData.append("name", name);
                  formData.append("description", description);
                  formData.append("price", price);
                  formData.append("category", category);
                  formData.append("quantity", quantity);
                  formData.append("brand", brand);
                  formData.append("countInStock", stock);
                  const data = await updateProduct({ productId: params._id, formData });

                  if (data?.error) {
                        // Swal.fire({
                        //       position: "top-end",
                        //       icon: "error",
                        //       title: data.error,
                        //       showConfirmButton: false,
                        //       timer: 1500
                        // });
                  } else {
                        // Swal.fire({
                        //       position: "top-end",
                        //       icon: "success",
                        //       title: "Product successfully updated.",
                        //       showConfirmButton: false,
                        //       timer: 1500
                        // });
                  }
            } catch (err) {
                  // console.log(err);
                  // Swal.fire({
                  //       position: "top-end",
                  //       icon: "error",
                  //       title: "Product update failed. Try again.",
                  //       showConfirmButton: false,
                  //       timer: 1500
                  // });
            }
      };

      const handleDelete = async () => {

            const { data } = await deleteProduct(params._id);
            console.log(data);
      };

      return (
            <>
                  <div className="container mx-auto mt-5 p-5">
                        <AdminMenu />
                        <div className="p-3 flex">
                              <div className="mx-auto p-3 bg-gray-100 rounded-md">
                                    <div className="h-12 mb-4 text-2xl font-bold">Update / Delete Product</div>
                                    {image && (
                                          <div className="text-center">
                                                <img src={image} alt="product" className="block mx-auto w-[10rem] h-full" />
                                          </div>
                                    )}
                                    <div className="mb-3">
                                          <label className="py-2 px-4 block  text-center rounded-lg cursor-pointer font-bold">
                                                {image ? image.name : "Upload image"}
                                                <input
                                                      type="file"
                                                      name="image"
                                                      accept="image/*"
                                                      onChange={uploadFileHandler}
                                                      className="w-[40%]" />
                                          </label>
                                    </div>
                                    <div className="grid grid-cols-1 gap-4">
                                          <div className="mb-4">
                                                <label htmlFor="name" className="text-lg font-semibold">
                                                      Name
                                                </label>
                                                <input
                                                      type="text"
                                                      className="p-2 w-full border rounded-md bg-gray-200"
                                                      value={name}
                                                      onChange={(e) => setName(e.target.value)} />
                                          </div>
                                          <div className="mb-4">
                                                <label htmlFor="price" className="text-lg font-semibold">
                                                      Price
                                                </label>
                                                <input
                                                      type="number"
                                                      className="p-2 w-full border rounded-md bg-gray-200"
                                                      value={price}
                                                      onChange={(e) => setPrice(e.target.value)}
                                                />
                                          </div>
                                          <div className="mb-4">
                                                <label htmlFor="quantity" className="text-lg font-semibold">
                                                      Quantity
                                                </label>
                                                <input
                                                      type="number"
                                                      min="1"
                                                      className="p-2 w-full border rounded-md bg-gray-200"
                                                      value={quantity}
                                                      onChange={(e) => setQuantity(e.target.value)}
                                                />
                                          </div>
                                          <div className="mb-4">
                                                <label htmlFor="brand" className="text-lg font-semibold">
                                                      Brand
                                                </label>
                                                <input
                                                      type="text"
                                                      className="p-2 w-full border rounded-md bg-gray-200"
                                                      value={brand}
                                                      onChange={(e) => setBrand(e.target.value)}
                                                />
                                          </div>
                                          <div className="mb-4">
                                                <label htmlFor="description" className="text-lg font-semibold">
                                                      Description
                                                </label>
                                                <textarea
                                                      type="text"
                                                      className="p-2 w-full border rounded-md bg-gray-200"
                                                      value={description}
                                                      onChange={(e) => setDescription(e.target.value)}
                                                />
                                          </div>
                                          <div className="flex justify-between mb-4">
                                                <div className="w-full mr-4">
                                                      <label htmlFor="stock" className="text-lg font-semibold">
                                                            Count In Stock
                                                      </label>
                                                      <input
                                                            type="text"
                                                            className="p-2 w-full border rounded-md bg-gray-200"
                                                            value={stock}
                                                            onChange={(e) => setStock(e.target.value)}
                                                      />
                                                </div>
                                                <div className="w-full">
                                                      <label htmlFor="category" className="text-lg font-semibold">
                                                            Category
                                                      </label>
                                                      <select
                                                            className="p-2 w-full border rounded-md bg-gray-200"
                                                            onChange={(e) => setCategory(e.target.value)}
                                                      >
                                                            <option value="" disabled selected>
                                                                  Choose Category
                                                            </option>
                                                            {categories?.map((c) => (
                                                                  <option key={c._id} value={c._id}>
                                                                        {c.name}
                                                                  </option>
                                                            ))}
                                                      </select>
                                                </div>
                                          </div>
                                          <div className="flex justify-between">
                                                <button
                                                      onClick={handleDelete}
                                                      className="py-2 px-6 bg-red-500 text-white rounded-md font-semibold hover:bg-red-600">
                                                      Delete
                                                </button>
                                                <button
                                                      onClick={handleSubmit}
                                                      className="py-2 px-6 bg-green-500 text-white rounded-md font-semibold hover:bg-green-600">
                                                      Update
                                                </button>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
            </>
      );
};

export default AdminProductUpdate;
