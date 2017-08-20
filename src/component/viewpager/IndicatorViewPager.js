/**
 * Created by vison on 17/8/20.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import ViewPager from './ViewPager';

const VIEWPAGER_REF = 'viewPager';
const INDICATOR_REF = 'indicator';

const styles = StyleSheet.create({
  container: {},
  pager: {
    flex: 1
  }
});

export default class IndicatorViewPager extends Component {
  static propTypes = {
    ...ViewPager.propTypes,
    indicator: PropTypes.node,
    pagerStyle: View.propTypes.style
  };
  static defaultProps = {
    indicator: null,
    initialPage: 0
  };

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <ViewPager
          {...this.props}
          ref={VIEWPAGER_REF}
          style={[styles.pager, this.props.pagerStyle]}
          onPageScroll={this._onPageScroll}
          onPageSelected={this._onPageSelected}
        />
        {this._renderIndicator()}
      </View>
    );
  }

  _onPageScroll = (params) => {
    const indicator = this.refs[INDICATOR_REF];
    indicator && indicator.onPageScroll && indicator.onPageScroll(params);
    this.props.onPageScroll && this.props.onPageScroll(params);
  };

  _onPageSelected = (params) => {
    const indicator = this.refs[INDICATOR_REF];
    indicator && indicator.onPageSelected && indicator.onPageSelected(params);
    this.props.onPageSelected && this.props.onPageSelected(params);
  };

  _renderIndicator() {
    const { indicator, initialPage } = this.props;
    if (!indicator) return null;
    return React.cloneElement(indicator, {
      ref: INDICATOR_REF,
      pager: this,
      initialPage
    });
  }

  setPage(selectedPage) {
    this.refs[VIEWPAGER_REF].setPage(selectedPage);
  }

  setPageWithoutAnimation(selectedPage) {
    this.refs[VIEWPAGER_REF].setPageWithoutAnimation(selectedPage);
  }
}

