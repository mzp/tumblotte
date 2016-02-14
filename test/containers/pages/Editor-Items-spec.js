import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy, match } from 'sinon';

import { Editor } from 'containers/pages/Editor';
import SidebarItem from 'components/SidebarItem';

describe('<Editor /> - Items', () => {
 const blogs = [
   { title: 'Snake oil', name: 'snake', selected: true }
 ];
 const authenticate = {};
 const post = {
   id: 1,
   content: 'thanks\n\nfish',
   selected: true,
   dirty: true
 };
 const posts = [
   post,
   { id: 2, content: 'xxx', selected: false }
 ];
 const loading = {};

 const blogAction = {};
 const postAction =  {
   create: spy(),
   fetch: spy(),
   remove: spy(),
   select: spy(),
   post: spy()
 };

 const subject = shallow(<Editor
     authenticate={authenticate}
     blogs={blogs}
     posts={posts}
     loading={loading}
     blogAction={blogAction}
     postAction={postAction} />);

 describe('SidebarItem', () => {
   it('renders <SidebarItem />', () => {
     expect(subject.find(SidebarItem).length).to.equal(2);
   });

   const item = subject.find(SidebarItem).first();
   it('passes #title', () => {
     expect(item).to.have.prop('title', 'thanks');
   });

   it('passes #body', () => {
     expect(item).to.have.prop('body', '\n\nfish');
   });

   it('passes #selected', () => {
     expect(item).to.have.prop('selected', true);
   });

   it('passes #dirty', () => {
     expect(item).to.have.prop('dirty', true);
   });

   it('calls action', () => {
     item.simulate('click');
     expect(postAction.select.calledWith(match({ id: 1 }))).to.equal(true);
   });
 });
});
