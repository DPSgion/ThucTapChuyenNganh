import Footer from './Footer';
import { useState } from 'react';
import LinkCssJs from "./LinkCssJs";



function CarRent(){
    const [resourcesLoaded, setResourcesLoaded] = useState(false);

    return (
        <>
            <LinkCssJs onLoaded={() => setResourcesLoaded(true)} />

            {/* Loading indicator */}
            {!resourcesLoaded && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999
                }}>
                    <div style={{
                        fontSize: '24px',
                        color: '#333'
                    }}>Loading...</div>
                </div>
            )}


            {resourcesLoaded && (

                <>
                    <div class="hero-wrap js-fullheight" style={{ backgroundImage: 'url(/images/bg_1.jpg)' }}>
                        <div class="overlay"></div>
                        <div class="container">
                            <div class="row no-gutters slider-text js-fullheight align-items-center justify-content-center" data-scrollax-parent="true">
                                <div class="col-md-9 text-center ftco-animate" data-scrollax=" properties: { translateY: '70%' }">
                                    <p class="breadcrumbs" data-scrollax="properties: { translateY: '30%', opacity: 1.6 }"><span class="mr-2"><a href="/">Home</a></span> <span>Car Rent</span></p>
                                    <h1 class="mb-3 bread" data-scrollax="properties: { translateY: '30%', opacity: 1.6 }">Car Rent</h1>
                                </div>
                            </div>
                        </div>
                    </div>


                    <Footer/>
                </>

            )}
        </>
    )
}

export default CarRent;