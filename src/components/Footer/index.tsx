import React from "react";
import "./style.css"
import museumLogo from "../../assets/Footer/museum-logo.svg";
import modsenLogo from "../../assets/Footer/modsen-logo.svg"

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <section className="footer__container">
                <div className="footer__logo-museum">
                    <a href="/" className="footer__logo-museum-link">
                        <img className="footer__logo-museum-image" src={museumLogo} alt="logo-museum" />
                    </a>
                </div>  
                <div className="footer__logo">
                    <a className="footer__logo-link" href="https://www.modsen.by/">
                        <img className="footer__logo-image" src={modsenLogo} alt="logo-modsen" />
                    </a>
                </div>
            </section>
        </footer>
    );
}

export default Footer;