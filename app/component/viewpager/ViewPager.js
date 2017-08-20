/**
 * Created by tangzhibin on 16/2/28.
 */

import React, { Component } from 'react';
import { View, ViewPagerAndroid, ScrollView, Platform, PanResponder } from 'react-native';

const SCROLLVIEW_REF = 'scrollView';
const VIEWPAGER_REF = 'viewPager';

const SCROLL_STATE = {
  idle: 'idle',
  settling: 'settling',
  dragging: 'dragging'
};
export default class ViewPager extends Component {
  static propTypes = { ...ViewPagerAndroid.propTypes };

  static defaultProps = {
    initialPage: 0,
    keyboardDismissMode: 'on-drag',
    onPageScroll: null,
    onPageSelected: null,
    onPageScrollStateChanged: null,
    pageMargin: 0
  };

  state = { width: 0, height: 0 };

  _scrollState = SCROLL_STATE.idle;

  _panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => this._setScrollState(SCROLL_STATE.dragging),
    onPanResponderMove: () => null,
    onPanResponderRelease: () => this._setScrollState(SCROLL_STATE.settling),
    onPanResponderTerminate: () => null,
    onPanResponderTerminationRequest: () => true,
  });

  render() {
    return Platform.OS === 'ios' ? this._renderOnIOS() : (
      <ViewPagerAndroid
        {...this.props}
        ref={VIEWPAGER_REF}
        onPageScroll={this._onPageScrollOnAndroid}
        onPageSelected={this._onPageSelectedOnAndroid}
      />
    );
  }

  _onPageScrollOnAndroid = (e) => {
    if (this.props.onPageScroll) this.props.onPageScroll(e.nativeEvent);
  };

  _onPageSelectedOnAndroid = (e) => {
    if (this.props.onPageSelected) this.props.onPageSelected(e.nativeEvent);
  };

  _renderOnIOS() {
    const childrenCount = this.props.children ? this.props.children.length : 0;
    const initialPage = Math.min(Math.max(0, this.props.initialPage), childrenCount - 1);
    const needMonitorScroll = !!this.props.onPageScroll ||
      !!this.props.onPageSelected || !!this.props.onPageScrollStateChanged;
    const needMonitorTouch = !!this.props.onPageScrollStateChanged;
    let scrollEventThrottle = 0;
    if (needMonitorScroll) {
      if (this.props.onPageScroll) {
        scrollEventThrottle = 8;
      } else {
        scrollEventThrottle = 1;
      }
    }
    let props = {
      ...this.props,
      ref: SCROLLVIEW_REF,
      onLayout: this._onScrollViewLayout.bind(this),
      horizontal: true,
      pagingEnabled: true,
      scrollsToTop: false,
      showsHorizontalScrollIndicator: false,
      showsVerticalScrollIndicator: false,
      children: this._childrenWithOverridenStyle(),
      contentOffset: { x: this.state.width * initialPage, y: 0 },
      decelerationRate: 0.9,
      onScroll: needMonitorScroll ? this._onScrollOnIOS.bind(this) : null,
      scrollEventThrottle
    };
    if (needMonitorTouch) props = Object.assign(props, this._panResponder.panHandlers);
    if (this.props.style && !this.props.style.height) {
      return <ScrollView {...props} />;
    }
    return (
      <View style={this.props.style}>
        <ScrollView {...props} style={null} />
      </View>
    );
  }

  _onScrollOnIOS(e) {
    const { x } = e.nativeEvent.contentOffset;
    const position = Math.floor(x / this.state.width);
    const offset = x / this.state.width - position;
    if (this.props.onPageScroll) this.props.onPageScroll({ offset, position });
    if (this.props.onPageSelected && offset === 0) {
      this.props.onPageSelected({ position });
      this.props.onPageScrollStateChanged && this._setScrollState(SCROLL_STATE.idle);
    }
  }

  _onScrollViewLayout(event) {
    const { width, height } = event.nativeEvent.layout;
    this.setState({ width, height });
  }

  _childrenWithOverridenStyle() {
    if (this.state.width === 0 || this.state.height === 0) return null;
    return React.Children.map(this.props.children, (child) => {
      if (!child) return null;
      const newProps = {
        ...child.props,
        style: [child.props.style, {
          width: this.state.width,
          height: this.state.height,
          position: null
        }],
        collapsable: false
      };
      if (child.type &&
        child.type.displayName &&
        (child.type.displayName !== 'RCTView') &&
        (child.type.displayName !== 'View')) {
        /* eslint-disable no-console */
        console.warn('Each ViewPager child must be a <View>. Was ' + child.type.displayName);
      }
      return React.createElement(child.type, newProps);
    });
  }

  _setScrollState(scrollState) {
    if (scrollState === this._scrollState) return;
    this.props.onPageScrollStateChanged && this.props.onPageScrollStateChanged(scrollState);
    this._scrollState = scrollState;
  }

  setPageWithoutAnimation(selectedPage) {
    if (Platform.OS === 'ios') {
      this.refs[SCROLLVIEW_REF].scrollTo({ x: this.state.width * selectedPage, animated: false });
    } else {
      this.refs[VIEWPAGER_REF].setPageWithoutAnimation(selectedPage);
      if (this.props.onPageSelected) this.props.onPageSelected({ position: selectedPage });
    }
  }

  setPage(selectedPage) {
    if (Platform.OS === 'ios') {
      this.refs[SCROLLVIEW_REF].scrollTo({ x: this.state.width * selectedPage });
    } else {
      this.refs[VIEWPAGER_REF].setPage(selectedPage);
      if (this.props.onPageSelected) this.props.onPageSelected({ position: selectedPage });
    }
  }
}
