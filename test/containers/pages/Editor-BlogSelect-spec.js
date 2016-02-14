import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import { Editor } from 'containers/pages/Editor';
import SelectBox from 'components/SelectBox';

describe('<Editor /> - Blog Select', () => {
  const blogs = [
  { title: 'John Doe Blog', name: 'john', selected: false },
  { title: 'Snake oil', name: 'snake', selected: true }
  ];
  const authenticate = {};
  const posts = [];
  const loading = {};
  const blogAction = {
    select: spy()
  };
  const postAction = {
    create: spy()
  };

  const subject = shallow(<Editor
      authenticate={authenticate}
      blogs={blogs}
      posts={posts}
      loading={loading}
      blogAction={blogAction}
      postAction={postAction} />);

  it('renders select box', () => {
    expect(subject.find(SelectBox)).to.have.prop('items').deep.equal([
        { title: 'John Doe Blog', name: 'john', selected: false },
        { title: 'Snake oil', name: 'snake', selected: true }
    ]);
  });

  it('calls blogAction.select', () => {
    subject.find(SelectBox).simulate('select', 'snake');
    expect(blogAction.select.calledWith('snake')).to.equal(true);
  });
});
