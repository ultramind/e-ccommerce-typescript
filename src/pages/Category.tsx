import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../ui/Loading";
import Container from "../ui/Container";
import CategoryFilters from "../ui/CategoryFilters";
import ProductCard from "../ui/ProductCard";
import { ProductProps } from "../../type";
import {products as productData} from "../../constants/data.ts"

const Category = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const formatedId = formatId(id!);
      const product:any = productData.filter((item:any)=>item.category == formatedId)
      setProducts(product)
      setLoading(false)
    }

    fetchData();
  }, [id]);

  // console.log("products", products)

  const formatId = (id: string) => {
    return id
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/(^\w|\s\w)/g, (match) => match.toUpperCase());
  };
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          <h2 className="text-4xl text-center font-semibold mb-5">
            {formatId(id!)}
          </h2>
          <div className="flex items-start gap-10">
            <CategoryFilters id={id} />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {products?.map((item: ProductProps) => (
                <ProductCard item={item} key={item?._id} />
              ))}
            </div>
          </div>
        </Container>
      )}
    </div>
  );
};

export default Category;
