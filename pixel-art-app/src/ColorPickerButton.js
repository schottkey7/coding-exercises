import React from 'react';
import reactCSS from 'reactcss';
import { SketchPicker } from 'react-color';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from './actions';


const ColorPickerButton = ({ actions, palette }) => {
    const { selectedColor, displayColorPicker } = palette;
    const styles = reactCSS({
        default: {
            color: {
                width: '36px',
                height: '14px',
                borderRadius: '2px',
                background: selectedColor
            },
            swatch: {
                padding: '5px',
                background: '#fff',
                borderRadius: '1px',
                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                display: 'inline-block',
                cursor: 'pointer'
            },
            popover: {
                position: 'absolute',
                zIndex: '2'
            },
            cover: {
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px'
            }
        }
    });

    const handleClick = () => {
        return actions.toggleDisplayColorPicker();
    };

    const handleClose = () => {
        return actions.toggleDisplayColorPicker();
    };

    const changeActiveColor = (color) => {
        actions.selectColor({ color: color.hex });
    };

    return (
        <div style={{ marginTop: "10px" }}>
            <div style={styles.swatch} onClick={handleClick}>
                <div style={styles.color} />
            </div>
            {displayColorPicker ?
                <div style={styles.popover}>
                    <div style={styles.cover} onClick={handleClose}/>
                    <SketchPicker color={selectedColor} onChange={changeActiveColor}/>
                </div> : null }

        </div>
    );
};

ColorPickerButton.propTypes = {
    actions: PropTypes.object.isRequired,
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
)(ColorPickerButton);
