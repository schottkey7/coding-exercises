import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Cell from './Cell';
import * as actions from './actions';


const Grid = ({ actions, board, grid, boardNum }) => {
    const pixelSize = board.get('pixelSize');
    const size = board.get('board').size;
    const styles = {
        borderLeft: 'solid 1px #dcdcdc',
        borderTop: 'solid 1px #dcdcdc',
        height: '100%',
        width: `${size * pixelSize + 2}px`,
        lineHeight: '0em'
    };

    const resizeGrid = () => {
        const newSize = Math.ceil(document.getElementById('newSize').value);
        const newPixelSize = Math.floor(1000 / newSize);

        if (newSize <= 100 && newSize >= 1 && newPixelSize !== pixelSize) {
            actions.setNewPixelSize({ i: boardNum, size: newPixelSize });

            return actions.resizeBoard({
                size: newSize,
                name: board.get('name'),
                color: grid.defaultColor
            });
        }
    };

    return (
        <div className="ui segment"
             style={{ width: "100%", height: "100%" }}
             onMouseUp={() => actions.toggleDragging({ i: boardNum, on: false })}
             onMouseDown={() => actions.toggleDragging({ i: boardNum, on: true })}>

             <div style={{ marginBottom: "20px", marginTop: "5px" }}>
                <div className="ui input">
                    <input type="text"
                           id="newSize"
                           placeholder="Grid size (100 or less)" />
                </div>
                <button className="ui button"
                        style={{ marginLeft: "5px" }}
                        onClick={resizeGrid}>
                    Resize
                </button>
            </div>

             <div style={styles}>
                { board.get('board').map((row, i) => row.map((el, j) =>
                    (<Cell board={board} i={boardNum} row={i} col={j} />)
                ))}
            </div>
        </div>
    );
};

Grid.propTypes = {
    grid: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    boardNum: PropTypes.number.isRequired,
    board: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    grid: state.grid
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Grid);
