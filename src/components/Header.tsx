import React from 'react';
import logo from '../assets/images/logo.svg';

const Header: React.FC = () => {
    return (
        <div className="c-header">
            <div className="o-split o-split--v-center">
                <div className="c-logo-lockup">
                    <div className="c-logo-lockup--logo">
                        <img src={logo} width="66" height="77" alt="A badly shuffled pile of cards" />
                    </div>
                    <div className="c-logo-lockup--title">
                        <h1 className="u-txt--letter-spacing-1 u-txt--heading u-txt--weight-black u-txt--50 u-txt--color-white">
                            jankpile
                        </h1>
                    </div>
                    <div className="c-logo-lockup--subheading">
                        <p className="u-txt--heading u-txt--24 u-txt--color-highlight">
                            No meta.  Just jank.
                        </p>
                    </div>
                </div>
                <div role="contentinfo" className="u-txt--20 u-txt--heading u-txt--color-highlight">
                    <p>by Mark Goetz, © {new Date().getFullYear()}</p>
                    <p>All card art © {new Date().getFullYear()} Wizards of the Coast</p>
                </div>
            </div>
        </div>
    );
};

export default Header;
