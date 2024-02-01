import { useState } from "react";
import { useCreateCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation, useFetchCategoriesQuery, } from "../../redux/api/categoryApiSlice";
import CategoryForm from "../../components/CategoryForm";
import Modal from "../../components/Modal";
import AdminMenu from "./AdminMenu";
// import Swal from "sweetalert2";

const CategoryList = () => {
      const { data: categories, refetch } = useFetchCategoriesQuery();
      const [name, setName] = useState("");
      const [selectedCategory, setSelectedCategory] = useState(null);
      const [updatingName, setUpdatingName] = useState("");
      const [modalVisible, setModalVisible] = useState(false);
      const [createCategory] = useCreateCategoryMutation();
      const [updateCategory] = useUpdateCategoryMutation();
      const [deleteCategory] = useDeleteCategoryMutation();

      const handleCreateCategory = async (e) => {
            e.preventDefault();
            if (!name) {
                  // Swal.fire({
                  //       position: "top-end",
                  //       icon: "error",
                  //       title: "Category name is required",
                  //       showConfirmButton: false,
                  //       timer: 1000
                  // });
                  return;
            }
            try {
                  const result = await createCategory({ name }).unwrap();
                  if (result.error) {
                        // Swal.fire({
                        //       position: "top-end",
                        //       icon: "error",
                        //       title: result.error,
                        //       showConfirmButton: false,
                        //       timer: 1000
                        // });
                  } else {
                        setName("");
                        // Swal.fire({
                        //       position: "top-end",
                        //       icon: "success",
                        //       title: `${result.name} is created.`,
                        //       showConfirmButton: false,
                        //       timer: 1000
                        // });
                        refetch()
                  }
            } catch (error) {
                  console.error(error);
                  // Swal.fire({
                  //       position: "top-end",
                  //       icon: "error",
                  //       title: "Creating category failed, try again.",
                  //       showConfirmButton: false,
                  //       timer: 1000
                  // });
            }
      };

      const handleUpdateCategory = async (e) => {
            e.preventDefault();
            if (!updatingName) {
                  // Swal.fire({
                  //       position: "top-end",
                  //       icon: "error",
                  //       title: "Category name is required.",
                  //       showConfirmButton: false,
                  //       timer: 1000
                  // });
                  return;
            }
            try {
                  const result = await updateCategory({
                        categoryId: selectedCategory._id,
                        updatedCategory: {
                              name: updatingName,
                        },
                  }).unwrap();
                  if (result.error) {
                        // Swal.fire({
                        //       position: "top-end",
                        //       icon: "error",
                        //       title: result.error,
                        //       showConfirmButton: false,
                        //       timer: 1000
                        // })
                  } else {
                        // Swal.fire({
                        //       position: "top-end",
                        //       icon: "success",
                        //       title: `${result.name} is updated.`,
                        //       showConfirmButton: false,
                        //       timer: 1000
                        // })
                        setSelectedCategory(null);
                        setUpdatingName("");
                        setModalVisible(false);
                        refetch()
                  }
            } catch (error) {
                  console.error(error);
            }
      };

      const handleDeleteCategory = async () => {
            try {
                  const result = await deleteCategory(selectedCategory._id).unwrap();
                  if (result.error) {
                        // Swal.fire({
                        //       position: "top-end",
                        //       icon: "error",
                        //       title: result.error,
                        //       showConfirmButton: false,
                        //       timer: 1000
                        // })
                  } else {
                        // Swal.fire({
                        //       position: "top-end",
                        //       icon: "success",
                        //       title: `${result.name} is deleted.`,
                        //       showConfirmButton: false,
                        //       timer: 1000
                        // })
                        setSelectedCategory(null);
                        setModalVisible(false);
                        refetch()
                  }

            } catch (error) {
                  console.error(error);
                  // Swal.fire({
                  //       position: "top-end",
                  //       icon: "error",
                  //       title: "Category delection failed.Try again.",
                  //       showConfirmButton: false,
                  //       timer: 1000
                  // })
            }
      };

      return (
            <div className="flex flex-col md:flex-row justify-center">
                  <AdminMenu />
                  <div className="md:w-3/4 p-3">
                        <div className="h-12 font-extrabold">Manage Categories</div>
                        <CategoryForm
                              value={name}
                              setValue={setName}
                              handleSubmit={handleCreateCategory} />
                        <br />
                        <hr />
                        <div className="flex flex-wrap">
                              {categories?.map((category) => (
                                    <div key={category._id}>
                                          <button
                                                className="bg-gray-600 border border-black text-gray-100 py-2 px-4 rounded-lg m-3 hover:bg-black hover:text-white focus:outline-none foucs:ring-2 focus:ring-black focus:ring-opacity-50 capitalize"
                                                onClick={() => {
                                                      {
                                                            setModalVisible(true);
                                                            setSelectedCategory(category);
                                                            setUpdatingName(category.name);
                                                      }
                                                }}>
                                                {category.name}
                                          </button>
                                    </div>
                              ))}
                        </div>
                        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
                              <CategoryForm
                                    value={updatingName}
                                    setValue={(value) => setUpdatingName(value)}
                                    handleSubmit={handleUpdateCategory}
                                    buttonText="Update"
                                    handleDelete={handleDeleteCategory} />
                        </Modal>
                  </div>
            </div>
      );
};

export default CategoryList;