import React, {useState} from 'react';
import {urlFor, client} from "../../lib/client";
import {AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar} from "react-icons/ai";
import {Product} from "../../components";
import {useStateContext} from "../../context/StateContext";

const ProductDetails = ({product, products}) => {
    const {image, name, details, price} = product;
    const [index, setIndex] = useState(0);
    const {incQty, decQty, qty, onAdd} = useStateContext();
    return (
        <div>
            <div className={'product-detail-container'}>
                <div>
                    <div>
                        <img src={urlFor(image && image[index])} alt="product-image" className={'product-detail-image'}/>
                    </div>
                    <div className={'small-images-container'}>
                        {image?.map( (img,ix) => (
                            <img src={urlFor(img)} key={img._key} alt={'img'} className={ix === index ? 'small-image selected-image' : 'small-image'} onMouseEnter={() => setIndex(ix)} />
                        ))}
                    </div>
                </div>
                <div className={'product-detail-desc'}>
                    <h1>{name}</h1>
                    <div className={'reviews'}>
                        <div>
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiOutlineStar />
                        </div>
                        <p>(20)</p>
                    </div>
                    <h4>Details:</h4>
                    <p>{details}</p>
                    <p className={'price'}>${price}</p>
                    <div className={'quantity'}>
                        <h3>Quantity:</h3>
                        <p className={'quantity-desc'}>
                            <span className={'minus'} onClick={decQty}><AiOutlineMinus /></span>
                            <span className={'num'}>{qty}</span>
                            <span className={'plus'} onClick={incQty}><AiOutlinePlus /></span>
                        </p>
                    </div>
                    <div className={'buttons'}>
                        <button className={'add-to-cart'} onClick={() => onAdd(product, qty)}>Add to Cart</button>
                        <button className={'buy-now'}>Buy Now</button>
                    </div>
                </div>
            </div>
            <div className={'maylike-products-wrapper'}>
                <h2>You may also like</h2>
                <div className={'marquee'}>
                    <div className={'maylike-products-container track'}>
                        {products?.map( (item) => (
                        <Product key={item._id} product={item}/>
                        ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;

export const getStaticPaths = async () => {
    const query = `*[_type == "product"]{
        slug{
            current
            }
    }`;

    const products = await client.fetch(query);
    const paths = products.map( (p) => ({
        params: {
            slug: p.slug.current
        }
    }))

    return {
        paths,
        fallback: 'blocking'
    }
}
export const getStaticProps = async ({params: {slug}}) => {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const queryAllProducts = '*[_type == "product"]';
    const product = await client.fetch(query);
    const products = await client.fetch(queryAllProducts);

    return {
        props: {
            products, product
        }
    }
}
