import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Color from '../definitions/Color';
import { setFormat, selectFormat, toggleColor, selectColors } from '../redux-modules/identity';
import { fetchCommanders  } from '../redux-modules/commander';
import PanelHeading from './PanelHeading';
import Heading from './Heading';
import { fetchSpells } from '../redux-modules/spells';
import { jumpToCommander } from '../redux-modules/steps';

const IdentityPanel: React.FC = () => {
    const colors = useSelector(selectColors);
    const format = useSelector(selectFormat);
    const dispatch = useDispatch();

    const onSearchClick = useCallback(
        () => {
            dispatch(fetchCommanders({ colors, format }));
            dispatch(fetchSpells({ colors, format }));
            dispatch(jumpToCommander());
        },
        [dispatch, colors, format],
    );

    return (
        <PanelHeading>
            <div className="o-split">
                <div className="o-h-list o-h-list--x4">
                    <div className="o-h-list o-h-list--x2 o-h-list--baseline">
                        <Heading size="normal"><h2>Format</h2></Heading>
                        <div>
                            <label>
                                <input type="radio" name="format" value="brawl" checked={format === 'brawl'} onChange={() => dispatch(setFormat('brawl'))} />Brawl
                            </label>
                            <label>
                                <input type="radio" name="format" value="historic" checked={format === 'historic'} onChange={() => dispatch(setFormat('historic'))} />Historic Brawl
                            </label>
                        </div>
                    </div>
                    <div className="o-h-list o-h-list--x2 o-h-list--baseline">
                        <Heading size="normal"><h2>Colors</h2></Heading>
                        <div>
                            <label>
                                <input type="checkbox" name="color" value={Color.WHITE} checked={colors.includes(Color.WHITE)} onChange={() => dispatch(toggleColor(Color.WHITE))} /> White
                            </label>
                            <label>
                                <input type="checkbox" name="color" value={Color.BLUE} checked={colors.includes(Color.BLUE)} onChange={() => dispatch(toggleColor(Color.BLUE))} /> Blue
                            </label>
                            <label>
                                <input type="checkbox" name="color" value={Color.BLACK} checked={colors.includes(Color.BLACK)} onChange={() => dispatch(toggleColor(Color.BLACK))} /> Black
                            </label>
                            <label>
                                <input type="checkbox" name="color" value={Color.RED} checked={colors.includes(Color.RED)} onChange={() => dispatch(toggleColor(Color.RED))} /> Red
                            </label>
                            <label>
                                <input type="checkbox" name="color" value={Color.GREEN} checked={colors.includes(Color.GREEN)} onChange={() => dispatch(toggleColor(Color.GREEN))} /> Green
                            </label>
                        </div>
                    </div>
                </div>
                <button type="button" onClick={onSearchClick}>Find Commanders</button>
            </div>
        </PanelHeading>
    );
};

export default IdentityPanel;
