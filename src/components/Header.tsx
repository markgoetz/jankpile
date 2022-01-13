import React from 'react';

const Header: React.FC = () => {
    return (
        <div className="c-header">
            <div className="o-split o-split--v-center">
                <div className="c-logo-lockup">
                    <div className="c-logo-lockup--logo">
                        logo!
                    </div>
                    <div className="c-logo-lockup--title">
                        <h1 className="u-txt--letter-spacing-2 u-txt--heading u-txt--weight-black u-txt--50 u-txt--color-white">
                            jankpile
                        </h1>
                    </div>
                    <div className="c-logo-lockup--subheading">
                        <p className="u-txt--heading u-txt--24 u-txt--color-highlight">
                            No meta.  Just jank.
                        </p>
                    </div>
                </div>
                <p className="u-txt--20 u-txt--heading u-txt--color-highlight">
                    by Mark Goetz, © {new Date().getFullYear()}
                </p>
            </div>
        </div>
    );
};

export default Header;
