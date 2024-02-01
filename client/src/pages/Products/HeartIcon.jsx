import { useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { addToFavorites, removeFromFavorites, setFavorites, } from "../../redux/features/favorites/favoriteSlice";
import { addFavoriteToLocalStorage, getFavoritesFromLocalStorage, removeFavoriteFromLocalStorage, } from "../../Utils/localStorage";
// import Swal from "sweetalert2";

const HeartIcon = ({ product }) => {
      const dispatch = useDispatch();
      const favorites = useSelector((state) => state.favorites) || [];
      const isFavorite = favorites.some((p) => p._id === product._id);

      useEffect(() => {
            const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
            dispatch(setFavorites(favoritesFromLocalStorage));
      }, []);

      const toggleFavorites = () => {
            if (isFavorite) {
                  dispatch(removeFromFavorites(product));
                  removeFavoriteFromLocalStorage(product._id);
                  // Swal.fire({
                  //       position: "top-end",
                  //       icon: "success",
                  //       title: "Item removed from favorites",
                  //       showConfirmButton: false,
                  //       timer: 1000
                  // });
            } else {
                  dispatch(addToFavorites(product));
                  addFavoriteToLocalStorage(product);
                  // Swal.fire({
                  //       position: "top-end",
                  //       icon: "success",
                  //       title: "Item added to favorites",
                  //       showConfirmButton: false,
                  //       timer: 1000
                  // });
            }
      };

      return (
            <div
                  className="absolute top-2 right-5 cursor-pointer"
                  onClick={toggleFavorites}>
                  {isFavorite ? (
                        <FaHeart size={20} className="text-pink-500" />
                  ) : (
                        <FaRegHeart size={20} className="text-pink-300" />
                  )}
            </div>
      );
};

export default HeartIcon;