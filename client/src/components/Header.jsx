import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";

const Header = () => {
      const { data, isLoading, error } = useGetTopProductsQuery();
      if (isLoading) {
            return <Loader />;
      }
      if (error) {
            return <h1>ERROR</h1>;
      }
      return (
            <>
                  <div className="flex justify-around">
                        <div className="grid sm:grid-cols-2 gap-6">
                              {data.map((product) => (
                                    <div className="shadow-lg" key={product._id}>
                                          <SmallProduct product={product} />
                                    </div>
                              ))}
                        </div>
                        <ProductCarousel />
                  </div>
            </>
      );
};

export default Header;