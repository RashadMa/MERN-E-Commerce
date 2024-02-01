import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";

const Favorites = () => {
      const favorites = useSelector(selectFavoriteProduct);
      return (
            <div className="">
                  <h1 className="text-lg font-bold ml-[3rem] my-[3rem]">
                        FAVORITE PRODUCTS
                  </h1>
                  <div className="flex flex-wrap justify-around">
                        {favorites.map((product) => (
                              <Product key={product._id} product={product} />
                        ))}
                  </div>
            </div>
      );
};

export default Favorites;