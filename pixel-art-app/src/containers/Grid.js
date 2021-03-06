import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ResizeAware from 'react-resize-aware';

import Cell from './Cell';
import * as actions from '../actions';


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

    // TODO: improve this
    // ref: https://semantic-ui.com/elements/container.html
    const getGridContainerSize = () => {
        let size = -50;
        if (grid.windowSize < 768) {
            size += grid.windowSize;
        } else if (grid.windowSize >= 768 && grid.windowSize <= 991) {
            size += 723;
        } else if (grid.windowSize >= 992 && grid.windowSize <= 1200) {
            size += 933
        } else {
            size += 1127;
        }
        return size;
    };

    const resizeGrid = () => {
        const newSize = Math.ceil(document.getElementById('newSize').value);
        const newPixelSize = Math.floor(getGridContainerSize() / newSize);

        if (newSize <= 100 && newSize >= 1 && newPixelSize !== pixelSize) {
            actions.setNewPixelSize({ i: boardNum, size: newPixelSize });

            return actions.resizeBoard({
                size: newSize,
                name: board.get('name'),
                color: grid.defaultColor
            });
        }
    };

    const handleWindowResize = () => {
        const newPixelSize = Math.floor(getGridContainerSize() / size);

        actions.setWindowSize({ size: window.innerWidth });
        actions.setNewPixelSize({ i: boardNum, size: newPixelSize });

        return actions.resizeBoard({
            size,
            name: board.get('name'),
            color: grid.defaultColor
        });
    };

    const removeBoard = () => {
        actions.removeBoard({ i: boardNum });
        actions.makeBoardActive({ i: 0 });
    };


    return (
        <ResizeAware onResize={handleWindowResize}>
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

                    <button className="ui button" onClick={removeBoard}>
                        Remove board
                    </button>
                </div>

                 <div style={styles}>
                    { board.get('board').map((row, i) => row.map((el, j) =>
                        (<Cell board={board} i={boardNum} row={i} col={j} />)
                    ))}
                </div>
            </div>
        </ResizeAware>
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
