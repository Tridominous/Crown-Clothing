import { useContext } from "react";
import './shop.styles.scss';
import { ProductsContext } from "../../contexts/productsContext";
import ProductCard from "../../components/product-card/product-cardComponent";

const Shop = () => {
    const {products} = useContext(ProductsContext)
    return (
        <div className="products-container">
            {products.map((product) => (
               <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
};

export default Shop;