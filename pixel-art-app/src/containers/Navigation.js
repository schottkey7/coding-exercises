import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List as list } from 'immutable';
import { Link } from 'react-router-dom';

import { numToWordMapping } from '../constants';
import * as actions from '../actions';
import { keyValPairInListOfObjects } from '../utils';


const Navigation = ({ boards, navigation, actions, linkedBoardName }) => {
    let activeBoardName = boards.size ? boards.filter(b => b.get('active')).getIn([0, 'name']) : null;

    const tabs = [];
    const numTabs = boards.size + 1;
    const tabsClass = `ui ${numToWordMapping[numTabs]} item stackable tabs menu`;

    const addBoard = () => {
        if (boards.size < navigation.maxBoards || boards.length < navigation.maxBoards) {
            actions.addBoard();
        }
    };

    if (linkedBoardName && keyValPairInListOfObjects(boards, 'name', linkedBoardName)) {
        activeBoardName = linkedBoardName;
    }

    boards.forEach((b, i) => {
        tabs.push(
            <Link to={b.get('name')}
                  key={i}
                  className={b.get('name') === activeBoardName ? "active item" : "item"}
                  data-tab={b.get('name')}
                  onClick={() => actions.makeBoardActive({ i })}>

                {b.get('name')}
            </Link>
        );
    });

    return (
        <div className={tabsClass}>
            {tabs}
            <a className="item" data-tab="add" onClick={addBoard}>
                <h2>+</h2>
            </a>
        </div>
    );
};

Navigation.propTypes = {
    boards: PropTypes.oneOfType([
        PropTypes.instanceOf(list).isRequired,
        PropTypes.array.isRequired
    ]),
    navigation: PropTypes.PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    linkedBoardName: PropTypes.string
};

const mapStateToProps = (state) => ({
    boards: state.boards,
    navigation: state.navigation
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Navigation);
