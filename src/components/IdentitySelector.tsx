import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Color from '../definitions/Color';
import { setFormat, selectFormat, toggleColor, selectColors } from '../redux-modules/identity';

const IdentitySelector: React.FC = () => {
    const colors = useSelector(selectColors);
    const format = useSelector(selectFormat);
    const dispatch = useDispatch();

    return (
        <div>
            <div>
                <h2>Format</h2>
                <label>
                    <input type="radio" name="format" value="brawl" checked={format === 'brawl'} onChange={() => dispatch(setFormat('brawl'))} />Brawl
                </label>
                <label>
                    <input type="radio" name="format" value="historic" checked={format === 'historic'} onChange={() => dispatch(setFormat('historic'))} />Historic Brawl
                </label>
            </div>
            <div>
                <h2>Colors</h2>
                <label>
                    <input type="checkbox" name="color" value="W" checked={colors.includes('W')} onChange={() => dispatch(toggleColor(Color.WHITE))} /> White
                </label>
                <label>
                    <input type="checkbox" name="color" value="U" checked={colors.includes('U')} onChange={() => dispatch(toggleColor(Color.BLUE))} /> Blue
                </label>
                <label>
                    <input type="checkbox" name="color" value="B" checked={colors.includes('B')} onChange={() => dispatch(toggleColor(Color.BLACK))} /> Black
                </label>
                <label>
                    <input type="checkbox" name="color" value="R" checked={colors.includes('R')} onChange={() => dispatch(toggleColor(Color.RED))} /> Red
                </label>
                <label>
                    <input type="checkbox" name="color" value="G" checked={colors.includes('G')} onChange={() => dispatch(toggleColor(Color.GREEN))} /> Green
                </label>
            </div>
            <div>
                <button type="button">Find Commanders</button>
            </div>
        </div>
    );
};

export default IdentitySelector;
