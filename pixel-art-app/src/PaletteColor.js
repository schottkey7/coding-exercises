import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from './actions';


const PaletteColor = ({ palette, color, actions }) => {
    const { size, selectedColor } = palette;
    const borderColor = color === selectedColor ? '#2b2b2b' : '#FFF';

    const styles = {
        clasName: 'palette-color',
        verticalAlign: 'top',
        border: `solid 2px ${borderColor}`,
        display: 'inline-block',
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color
    };

    const changeActiveColor = (e) => actions.selectColor({ color });

    return <div style={styles} onClick={changeActiveColor} />;
};


PaletteColor.propTypes = {
    actions: PropTypes.object.isRequired,
    palette: PropTypes.object.isRequired,
    color: PropTypes.string.isRequired
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
)(PaletteColor);
