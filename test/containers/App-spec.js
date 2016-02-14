import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import { App } from 'containers/App';
import Login from 'containers/pages/Login';
import Authenticate from 'containers/pages/Authenticate';
import Editor from 'containers/pages/Editor';

describe('<App />', () => {
  describe('<Login />', () => {
    const subject = shallow(<App authenticate={{}} />);
    it('renders <Login />', () =>{
      expect(subject).to.contain(<Login />);
    });
  });

  describe('<Authenticate />', () => {
    const subject = shallow(<App authenticate={{ authorizeUrl: 'http://example.com' }} />);
    it('renders <Authenticate />', () =>{
      expect(subject).to.contain(<Authenticate />);
    });
  });

  describe('<Editor />', () => {
    const subject = shallow(<App authenticate={{ accessToken: 'access token' }} />);
    it('renders <Editor />', () =>{
      expect(subject.find(Editor)).to.contain(<Editor />);
    });
  });
});
