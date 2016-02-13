import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import { Editor } from 'containers/pages/Editor';
import DebounceTextArea from 'components/DebounceTextArea';
import IconButton from 'components/IconButton';

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
     expect(subject.find(DebounceTextArea)).to.not.present();
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

   describe('TextArea', () => {
     const textarea = subject.find(DebounceTextArea);
     it('renders TextArea', () => {
       expect(textarea).to.present();
     });

     it('pass #id', () => {
       expect(textarea).to.have.prop('contentId', 1);
     });

     it('pass #content', () => {
       expect(textarea).to.have.prop('content', 'baz');
     });

     it('calls action', () => {
       textarea.simulate('change', { target: { value: 'xyzzy' } });
       expect(postAction.change.calledWith({ post, value: 'xyzzy' })).to.equal(true);
     });
   });

   describe('Post button', () => {
     const button = subject.find('#main').find(IconButton).first();
     it('render rocket icon', () => {
       expect(button).to.have.prop('icon', 'rocket');
     });

     it('calls action', () => {
       button.simulate('click');
       expect(postAction.post.calledOnce).to.equal(true);
     });
   });

   describe('Open button', () => {
     const button = subject.find('#main').find(IconButton).last();
     it('is not open external', () => {
       expect(button).to.not.have.prop('icon', 'external-link');
     });
   });
 });

 context('Posted', () => {
   const subject = shallow(<Editor
       authenticate={authenticate}
       blogs={blogs}
       posts={[{ isPosted:true, ...post }]}
       loading={loading}
       blogAction={blogAction}
       postAction={postAction} />);

   describe('Open button', () => {
     const button = subject.find('#main').find(IconButton).last();
     it('renders open external button', () => {
       expect(button).to.have.prop('icon', 'external-link');
     });
   });
 });
});
