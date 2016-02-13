import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import { Editor } from 'containers/pages/Editor';
import Preview from 'components/Preview';

describe('<Editor /> - Edit', () => {
 const blogs = [
   { title: 'Snake oil', name: 'snake', selected: true }
 ];
 const authenticate = {};
 const post = {
   id: 1,
   title: 'thanks',
   body: 'fish',
   content: 'baz',
   selected: true,
   dirty: true
 };
 const posts = [post];
 const loading = {};
 const blogAction = {};
 const postAction =  {
   create: spy(),
   fetch: spy(),
   remove: spy(),
   select: spy(),
   post: spy(),
   change: spy()
 };

 context('Empty', () => {
   const subject = shallow(<Editor
       authenticate={authenticate}
       blogs={blogs}
       posts={[]}
       loading={loading}
       blogAction={blogAction}
       postAction={postAction} />);

   it('doesnt render TextArea', () => {
     expect(subject.find(Preview)).to.not.present();
   });
 });

 context('Select Post', () => {
   const subject = shallow(<Editor
       authenticate={authenticate}
       blogs={blogs}
       posts={posts}
       loading={loading}
       blogAction={blogAction}
       postAction={postAction} />);

   describe('<Preview />', () => {
     const preview = subject.find(Preview);
     it('renders Preview', () => {
       expect(preview).to.present();
     });

     it('pass #title', () => {
       expect(preview).to.have.prop('title', post.title);
     });

     it('pass #body', () => {
       expect(preview).to.have.prop('body', post.body);
     });
   });
 });
});
