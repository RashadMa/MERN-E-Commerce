import { useState } from "react";
import { useCreateProductMutation, useUploadProductImageMutation } from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import AdminMenu from "./AdminMenu";
// import Swal from "sweetalert2";

const ProductList = () => {
      const [image, setImage] = useState("");
      const [name, setName] = useState("");
      const [description, setDescription] = useState("");
      const [price, setPrice] = useState("");
      const [category, setCategory] = useState("");
      const [quantity, setQuantity] = useState("");
      const [brand, setBrand] = useState("");
      const [stock, setStock] = useState(0);
      const [imageUrl, setImageUrl] = useState(null);
      const [uploadProductImage] = useUploadProductImageMutation();
      const [createProduct] = useCreateProductMutation();
      const { data: categories } = useFetchCategoriesQuery();

      const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                  const productData = new FormData();
                  productData.append("image", image);
                  productData.append("name", name);
                  productData.append("description", description);
                  productData.append("price", price);
                  productData.append("category", category);
                  productData.append("quantity", quantity);
                  productData.append("brand", brand);
                  productData.append("countInStock", stock);
                  const { data } = await createProduct(productData);
                  if (data.error) {
                        // Swal.fire({
                        //       position: "top-end",
                        //       icon: "error",
                        //       title: "Product create failed. Try Again.",
                        //       showConfirmButton: false,
                        //       timer: 1500
                        // });
                  } else {
                        // Swal.fire({
                        //       position: "top-end",
                        //       icon: "success",
                        //       title: `${data.name} is created.`,
                        //       showConfirmButton: false,
                        //       timer: 1500
                        // });
                        setName("")
                        setPrice("")
                        setQuantity("")
                        setBrand("")
                        setCategory("")
                        setDescription("")
                        setImage("")
                        setStock("")
                        setImageUrl(null)
                  }
            } catch (error) {
                  console.error(error);
                  // Swal.fire({
                  //       position: "top-end",
                  //       icon: "error",
                  //       title: "Product create failed. Try Again.",
                  //       showConfirmButton: false,
                  //       timer: 1500
                  // });
            }
      };

      const uploadFileHandler = async (e) => {
            const formData = new FormData();
            formData.append("image", e.target.files[0]);

            try {
                  const res = await uploadProductImage(formData).unwrap();
                  // Swal.fire({
                  //       position: "top-end",
                  //       icon: "success",
                  //       title: res.message,
                  //       showConfirmButton: false,
                  //       timer: 1500
                  // });
                  setImage(res.image);
                  setImageUrl(res.image);
            } catch (error) {
                  // Swal.fire({
                  //       position: "top-end",
                  //       icon: "error",
                  //       title: error?.data?.message || error.error,
                  //       showConfirmButton: false,
                  //       timer: 1500
                  // });
            }
      };

      return (
            <div className="container mx-auto mt-5 p-5">
                  <AdminMenu />
                  <div className="p-3 flex">
                        <div className="mx-auto p-3 bg-gray-100 rounded-md">
                              <div className="h-12 mb-4 text-2xl font-bold">Create Product</div>
                              {imageUrl && (
                                    <div className="text-center">
                                          <img src={imageUrl} alt="product" className="block mx-auto w-[10rem] h-full" />
                                    </div>
                              )}
                              <div className="mb-3">
                                    <label className="py-2 px-4 block  text-center rounded-lg cursor-pointer font-bold">
                                          {image ? image.name : "Upload Image"}
                                          <input
                                                type="file"
                                                name="image"
                                                accept="image/*"
                                                onChange={uploadFileHandler}
                                                className={!image ? "hidden" : ""}
                                          />
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
                                                onChange={(e) => setPrice(e.target.value)} />
                                    </div>
                                    <div className="mb-4">
                                          <label htmlFor="quantity" className="text-lg font-semibold">
                                                Quantity
                                          </label>
                                          <input
                                                type="number"
                                                className="p-2 w-full border rounded-md bg-gray-200"
                                                value={quantity}
                                                onChange={(e) => setQuantity(e.target.value)} />
                                    </div>
                                    <div className="mb-4">
                                          <label htmlFor="brand" className="text-lg font-semibold">
                                                Brand
                                          </label>
                                          <input
                                                type="text"
                                                className="p-2 w-full border rounded-md bg-gray-200"
                                                value={brand}
                                                onChange={(e) => setBrand(e.target.value)} />
                                    </div>
                                    <div className="mb-4">
                                          <label htmlFor="description" className="text-lg font-semibold">
                                                Description
                                          </label>
                                          <textarea
                                                type="text"
                                                className="p-2 w-full border rounded-md bg-gray-200"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)} />
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
                                                      onChange={(e) => setStock(e.target.value)} />
                                          </div>
                                          <div className="w-full">
                                                <label htmlFor="category" className="text-lg font-semibold">
                                                      Category
                                                </label>
                                                <select
                                                      className="p-2 w-full border rounded-md bg-gray-200"
                                                      onChange={(e) => setCategory(e.target.value)}>
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
                              </div>
                              <button
                                    onClick={handleSubmit}
                                    className="py-2 px-6 bg-green-500 text-white rounded-md font-semibold hover:bg-green-600">
                                    Create
                              </button>
                        </div>
                  </div>
            </div>
      );
};

export default ProductList;