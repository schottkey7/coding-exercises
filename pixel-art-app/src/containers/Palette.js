import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import * as actions from '../actions';
import PaletteColor from './PaletteColor';
import ColorPickerButton from './ColorPickerButton';


const Palette = ({ palette }) => {
    const { numColors, colors } = palette;
    let colorPalette = [];

    for (let i = 0; i < numColors; i++) {
        colorPalette.push(<PaletteColor key={i} color={colors[i]}/>);
    }

    return (
        <div className="ui segment">
            <div className="ui two column grid">
                <div className="ten wide column">
                    <h3>Pre-defined palette</h3>
                    {colorPalette}
                </div>
                <div className="four wide column">
                    <h3>Pick custom color</h3>
                    <ColorPickerButton />
                </div>
            </div>
        </div>
    );
};

Palette.propTypes = {
    palette: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    palette: state.palette
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Palette);
