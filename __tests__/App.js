import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import { shallow } from 'enzyme';
import { createMockStore } from 'redux-mock-store';

import App from '../App';
import { Login, foo } from '../App';

it('renders correctly', () => {
  const wrapper = shallow(<App />);
});

// it('should work', () => {
//   const wrapper = shallow(<Login />, {context: {store}});
// });

it('foo is 42', function() {
    expect(foo).toEqual(42);
});

