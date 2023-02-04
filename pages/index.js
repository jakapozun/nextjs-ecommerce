import React from 'react';
import {HeroBanner, Footer} from "../components";

const Home = () => {
    return (
        <>
         <HeroBanner />
         <div className={'products-heading'}>
             <h2>Best selling products</h2>
             <p>Speakers of many variations</p>
         </div>
            <div className={'product-container'}>
                {
                    ['p1','p2'].map( (p) => p)
                }
            </div>

            <Footer />
        </>
    );
};

export default Home;
