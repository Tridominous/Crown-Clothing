import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/product-card/product-cardComponent';
import { CategoriesContext } from '../../contexts/categoriesContext';
import './category.styles.scss';


const Category = () => {
    const {category} = useParams();
    const {categoriesMap} = useContext(CategoriesContext);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);
    return (
        <div className='category-container'>
            {products && products.map((product) => (
                <ProductCard key={product.id} product={product}/>
            ))};
        </div>
    )
};

export default Category;