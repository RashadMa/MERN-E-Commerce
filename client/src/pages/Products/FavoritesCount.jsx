import { useSelector } from "react-redux";

const FavoritesCount = () => {
      const favorites = useSelector((state) => state.favorites);
      const favoriteCount = favorites.length;

      return (
            <div className="absolute left-3 md:left-24 -top-3 flex">
                  {favoriteCount > 0 && (
                        <span className="px-1 py-0 text-xs text-white bg-pink-500 rounded-full">
                              {favoriteCount}
                        </span>
                  )}
            </div>
      );
};

export default FavoritesCount;