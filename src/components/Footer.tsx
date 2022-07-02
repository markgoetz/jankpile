import React from 'react';

const Footer: React.FC = () => {
    return (
        <div className="c-footer">
            <div className="o-split">
                <div role="contentinfo" className="u-txt--20 u-txt--heading u-txt--color-highlight">
                    <p>by Mark Goetz, © {new Date().getFullYear()}</p>
                    <p>Card art © {new Date().getFullYear()} Wizards of the Coast</p>
                    <p>Mana symbols © MTG Wiki</p>
                </div>
                <div>
                    <a href="https://www.buymeacoffee.com/jankpile" target="_blank" rel="noreferrer">
                        <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" width={217} height={60} alt="Buy Me A Coffee" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Footer;
