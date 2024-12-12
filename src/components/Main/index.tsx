import React from "react";
import "./style.css"
import HeroSearch from "./HeroSearch";
import Gallery from "./Gallery";
import OtherGallery from "./OtherGallery";

const Main: React.FC = () => {
    return (
        <main className="main">
            <section className="main__container">
                <HeroSearch/>
                <Gallery/>
                <OtherGallery/>
            </section>
        </main>
    );
}

export default Main;
