import React from 'react';

export default class Nav extends React.Component {
  render() {
    return (
        <div id='nav'>
          <div className='nav-inner'>
            <button className='primary-button pure-button'>Compose</button>
            <div className="pure-menu">
              <ul className="pure-menu-list">
                <li className="pure-menu-item"><a href="#" className="pure-menu-link">Posts</a></li>
                <li className="pure-menu-item"><a href="#" className="pure-menu-link">Drafts</a></li>
              </ul>
            </div>
          </div>
        </div>);
  }
}

