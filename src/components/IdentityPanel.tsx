import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Color from '../definitions/Color';
import { selectFormat, selectColors, setIdentity } from '../redux-modules/identity';
import { fetchCommanders  } from '../redux-modules/commander';
import PanelHeading from './PanelHeading';
import Heading from './Heading';
import { fetchSpells } from '../redux-modules/spells';
import { jumpToCommander } from '../redux-modules/steps';
import { fetchNonBasicLands } from '../redux-modules/lands';
import Format from '../definitions/Format';
import Identity from '../definitions/Identity';

const IdentityPanel: React.FC = () => {
    const colorsFromStore = useSelector(selectColors);
    const formatFromStore = useSelector(selectFormat);

    const [colors, setColors] = useState<Color[]>(colorsFromStore);
    const [format, setFormat] = useState<Format>(formatFromStore);

    const toggleColor = (color: Color) => {
        if (colors.includes(color)) {
            setColors(colors.filter(c => c !== color));
        } else {
            setColors([...colors, color]);
        }
    };

    const dispatch = useDispatch();

    const onSearchClick = useCallback(
        () => {
            const identity: Identity = { colors, format };

            dispatch(setIdentity(identity));
            dispatch(fetchCommanders(identity));
            dispatch(fetchSpells(identity));
            dispatch(fetchNonBasicLands(identity));
            dispatch(jumpToCommander());
        },
        [dispatch, colors, format],
    );

    return (
        <PanelHeading>
            <div className="o-split">
                <div className="o-h-list o-h-list--x4">
                    <div className="o-h-list o-h-list--x2 o-h-list--baseline">
                        <Heading size="large"><h2>Format</h2></Heading>
                        <div>
                            <label>
                                <input type="radio" name="format" value="brawl" checked={format === 'brawl'} onChange={() => setFormat('brawl')} />Brawl
                            </label>
                            <label>
                                <input type="radio" name="format" value="historic" checked={format === 'historic'} onChange={() => setFormat('historic')} />Historic Brawl
                            </label>
                        </div>
                    </div>
                    <div className="o-h-list o-h-list--x2 o-h-list--baseline">
                        <Heading size="large"><h2>Colors</h2></Heading>
                        <div>
                            <label>
                                <input type="checkbox" name="color" value={Color.WHITE} checked={colors.includes(Color.WHITE)} onChange={() => toggleColor(Color.WHITE)} /> White
                            </label>
                            <label>
                                <input type="checkbox" name="color" value={Color.BLUE} checked={colors.includes(Color.BLUE)} onChange={() => toggleColor(Color.BLUE)} /> Blue
                            </label>
                            <label>
                                <input type="checkbox" name="color" value={Color.BLACK} checked={colors.includes(Color.BLACK)} onChange={() => toggleColor(Color.BLACK)} /> Black
                            </label>
                            <label>
                                <input type="checkbox" name="color" value={Color.RED} checked={colors.includes(Color.RED)} onChange={() => toggleColor(Color.RED)} /> Red
                            </label>
                            <label>
                                <input type="checkbox" name="color" value={Color.GREEN} checked={colors.includes(Color.GREEN)} onChange={() => toggleColor(Color.GREEN)} /> Green
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
