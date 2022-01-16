import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Color from '../definitions/Color';
import { setFormat, selectFormat, toggleColor, selectColors } from '../redux-modules/identity';
import { fetchCommanders  } from '../redux-modules/commander';

const IdentitySelector: React.FC = () => {
    const colors = useSelector(selectColors);
    const format = useSelector(selectFormat);
    const dispatch = useDispatch();

    const onSearchClick = useCallback(
        () => {
            dispatch(fetchCommanders({ colors, format }));
        },
        [dispatch, colors, format],
    );

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
                    <input type="checkbox" name="color" value="W" checked={colors.includes(Color.WHITE)} onChange={() => dispatch(toggleColor(Color.WHITE))} /> White
                </label>
                <label>
                    <input type="checkbox" name="color" value="U" checked={colors.includes(Color.BLUE)} onChange={() => dispatch(toggleColor(Color.BLUE))} /> Blue
                </label>
                <label>
                    <input type="checkbox" name="color" value="B" checked={colors.includes(Color.BLACK)} onChange={() => dispatch(toggleColor(Color.BLACK))} /> Black
                </label>
                <label>
                    <input type="checkbox" name="color" value="R" checked={colors.includes(Color.RED)} onChange={() => dispatch(toggleColor(Color.RED))} /> Red
                </label>
                <label>
                    <input type="checkbox" name="color" value="G" checked={colors.includes(Color.GREEN)} onChange={() => dispatch(toggleColor(Color.GREEN))} /> Green
                </label>
            </div>
            <div>
                <button type="button" onClick={onSearchClick}>Find Commanders</button>
            </div>
        </div>
    );
};

export default IdentitySelector;
