import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Color from '../definitions/Color';
import { selectFormat, selectColors, setIdentity } from '../redux-modules/identity';
import { fetchCommanders  } from '../redux-modules/commander';
import PanelHeading from './PanelHeading';
import Heading from './common/Heading';
import { fetchSpells } from '../redux-modules/spells';
import { jumpToCommander } from '../redux-modules/steps';
import { fetchBasicLandArt, fetchNonBasicLands } from '../redux-modules/lands';
import Format from '../definitions/Format';
import Identity from '../definitions/Identity';
import Button from './common/Button';
import sleep from '../lib/utils/sleep';
import Selector from './common/Selector';
import ImageCheckboxGroup from './common/ImageCheckboxGroup';
import W_SVG from '../assets/images/W.svg';
import U_SVG from '../assets/images/U.svg';
import B_SVG from '../assets/images/B.svg';
import R_SVG from '../assets/images/R.svg';
import G_SVG from '../assets/images/G.svg';

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
        async () => {
            const identity: Identity = { colors, format };

            dispatch(setIdentity(identity));
            await sleep(100);
            dispatch(fetchCommanders(identity));
            await sleep(100);
            dispatch(fetchNonBasicLands(identity));

            colors.forEach(color => dispatch(fetchBasicLandArt({ color, isSnow: false })));

            dispatch(jumpToCommander());
        },
        [dispatch, colors, format],
    );

    const formatOptions = [
        { value: 'brawl', label: 'Brawl' },
        { value: 'historic', label: 'Historic Brawl' },
    ];

    const onFormatChange = useCallback(
        (value: string) => {
            const format = value as Format;
            setFormat(format);
        },
        []
    );

    return (
        <PanelHeading>
            <div className="o-split o-split--v-center">
                <div className="o-h-list o-h-list--x4">
                    <div className="o-h-list o-h-list--x2 o-h-list--center">
                        <Heading size="large"><h2>Format</h2></Heading>
                        <Selector
                            name="format"
                            options={formatOptions}
                            onChange={onFormatChange}
                            selectedValue={format}
                        />
                    </div>
                    <div className="o-h-list o-h-list--x2 o-h-list--center">
                        <Heading size="large"><h2>Colors</h2></Heading>
                        <div>
                            <ImageCheckboxGroup
                                className="o-h-list"
                                name="color"
                                options={[
                                    { value: Color.WHITE, label: 'White', imageUrl: W_SVG, imageWidth: 44, imageHeight: 44 },
                                    { value: Color.BLUE, label: 'Blue', imageUrl: U_SVG, imageWidth: 44, imageHeight: 44 },
                                    { value: Color.BLACK, label: 'Black', imageUrl: B_SVG, imageWidth: 44, imageHeight: 44 },
                                    { value: Color.RED, label: 'Red', imageUrl: R_SVG, imageWidth: 44, imageHeight: 44 },
                                    { value: Color.GREEN, label: 'Green', imageUrl: G_SVG, imageWidth: 44, imageHeight: 44 },
                                ]}
                                selected={colors}
                                onChange={(value) => toggleColor(value as Color)}
                            />
                        </div>
                    </div>
                </div>
                <Button onClick={onSearchClick}>Find Commanders</Button>
            </div>
        </PanelHeading>
    );
};

export default IdentityPanel;
