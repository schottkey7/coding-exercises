import React from 'react';
import {Link} from 'react-router';
import NavbarStore from '../stores/NavbarStore';
import NavbarActions from '../actions/NavbarActions';
import HomeStore from '../stores/HomeStore';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = NavbarStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  /*
   * Subscribe to NavbarStore and HomeStore and get a total
   * recipes count as defined in recipes.json
   */
  componentDidMount() {
    NavbarStore.listen(this.onChange);
    HomeStore.listen(this.onChange);
    this.state.recipesCount = HomeStore.getState().recipesCount;
  }

  /*
   * Unsubscribe from the stores
   */
  componentWillUnmount() {
    NavbarStore.unlisten(this.onChange);
    HomeStore.unlisten(this.onChange);
  }

  /*
   * Whenever the stores change - update the state
   */
  onChange(state) {
    this.setState(state);
  }

  render() {
    // Display the navigation bar
    return (
      <nav className='navbar navbar-default navbar-static-top'>
        <div id='navbar' className='navbar-collapse collapse'>
          <ul className='nav navbar-nav navbar-centered'>
            <li><Link to='/'>Home</Link></li>
          </ul>
          <form ref='searchForm'
                className='navbar-form navbar-centered'>
            <div className='input-group'>
              <input type='text'
                    className='form-control'
                    placeholder={`${this.state.recipesCount} recipes`}
                    value={this.state.searchQuery}
                    onChange={NavbarActions.updateSearchQuery} />
              <span className='input-group-btn'>
                <button className='btn btn-default' disabled>
                  <span className='glyphicon glyphicon-search'></span>
                </button>
              </span>
            </div>
            <label>
              <input  type="checkbox"
                      onChange={NavbarActions.handleCheckBox}> Only show starred
              </input>
            </label>
          </form>
        </div>
      </nav>
    );
  }
}

export default Navbar;
