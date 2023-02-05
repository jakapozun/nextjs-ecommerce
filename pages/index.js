import React from 'react';
import {HeroBanner, Product, FooterBanner} from "../components";
import {client} from "../lib/client";

const Home = ({products, banner}) => {
    return (
        <div>
         <HeroBanner  heroBanner={banner.length && banner[0]}/>
         <div className={'products-heading'}>
             <h2>Best selling products</h2>
             <p>Speakers of many variations</p>
         </div>
            <div className={'products-container'}>
                {
                    products?.map( (p) => <Product key={p.slug} product={p} />)
                }
            </div>

            <FooterBanner footerBanner={banner && banner[0]} />
        </div>
    );
};

export default Home;

export const getServerSideProps = async () => {
    const query = '*[_type == "product"]';
    const bannerQuery = '*[_type == "banner"]';
    const products = await client.fetch(query);
    const banner = await client.fetch(bannerQuery);

    return {
        props: {
            products, banner
        }
    }
}
