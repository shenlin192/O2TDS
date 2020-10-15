import React from 'react';
import { shallow } from 'enzyme';

import Breadcrumb from '..';

describe('Breadcrumb component', () => {
  let props;
  const getWrapper = () => shallow(<Breadcrumb {...props} />);
  const getIcons = (wrapper) => wrapper.find('.breadcrumb-icon');
  const getLinks = (wrapper) => wrapper.find('.breadcrumb-link');
  const getTitleAt = (wrapper, index) => getLinks(wrapper).at(index).text();
  const getHrefAt = (wrapper, index) => getLinks(wrapper).at(index).props().href;
  const getIconAt = (wrapper, index) => getIcons(wrapper).at(index).text();

  beforeEach(() => {
    props = {
      values: [
        {
          title: 'Epic Title',
          uri: 'epic/title/uri',
          icon: 'epic-icon',
        },
      ],
    };
  });

  test('should render basic component with title, href, and icon', () => {
    const wrapper = getWrapper();

    expect(wrapper.find('.ds-breadcrumb').exists()).toBe(true);
    expect(getTitleAt(wrapper, 0)).toEqual('Epic Title');
    expect(getHrefAt(wrapper, 0)).toEqual('epic/title/uri');
    expect(getIconAt(wrapper, 0)).toEqual('epic-icon');
  });

  test('should render truncated text when text is >40 characters', () => {
    props = {
      values: [
        {
          ...props.values[0],
          title: 'This is a super long title that will not display in its entirety',
        },
      ],
    };

    const wrapper = getWrapper();

    expect(getTitleAt(wrapper, 0)).toEqual('This is a super long title that will not...');
  });

  test('should render title as [untitled] when it is empty', () => {
    props = {
      values: [
        {
          ...props.values[0],
          title: '',
        },
      ],
    };

    const wrapper = getWrapper();

    expect(getTitleAt(wrapper, 0)).toEqual('[untitled]');
  });

  test('should render title as [unavailable] when authorized is false', () => {
    props = {
      values: [
        {
          ...props.values[0],
          authorized: false,
        },
      ],
    };

    const wrapper = getWrapper();

    expect(getTitleAt(wrapper, 0)).toEqual('[object unavailable]');
  });
});
