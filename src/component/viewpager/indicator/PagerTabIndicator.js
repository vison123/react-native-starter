/**
 * Created by vison on 17/8/20.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import IndicatorViewPager from '../IndicatorViewPager';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 8,
    paddingBottom: 4,
    borderTopWidth: 0.5,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#F7F7F7'
  },
  itemContainer: {
    alignItems: 'center',
    flex: 1
  },
  image: {},
  text: {
    marginTop: 4,
    fontSize: 11,
    color: '#999999'
  },
  textSelected: {
    marginTop: 4,
    fontSize: 11,
    color: '#3584F6'
  }
});

export default class PagerTabIndicator extends Component {
  static propTypes = {
    ...View.propTypes,
    initialPage: PropTypes.number,
    pager: PropTypes.instanceOf(IndicatorViewPager),
    tabs: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string,
      iconSource: Image.propTypes.source,
      selectedIconSource: Image.propTypes.source
    })).isRequired,
    itemStyle: View.propTypes.style,
    selectedItemStyle: View.propTypes.style,
    iconStyle: Image.propTypes.style,
    selectedIconStyle: Image.propTypes.style,
    textStyle: Text.propTypes.style,
    selectedTextStyle: Text.propTypes.style
  };

  static defaultProps = {
    tabs: []
  };

  state = {
    selectedIndex: this.props.initialPage
  };

  showBadge = badge => {
    if (badge > 99) {
      return '99+';
    }
    return badge;
  };

  renderBadge = (index, badge) => {
    if (index === 3 && badge > 0) {
      return (
        <View
          style={[{
            position: 'absolute',
            top: 6,
            right: 12,
            borderRadius: 9,
            height: 18,
            width: 18,
            flexDirection: 'row',
            backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center' },
            badge > 99 && {
              height: 20,
              width: 22,
            }]}
        >
          <Text style={{ color: 'white', fontSize: 11 }}>
            {this.showBadge(badge)}
          </Text>
        </View>
      );
    }
    return (
      <View />
    );
  };

  render() {
    const {
      tabs, pager, style, itemStyle, selectedItemStyle, iconStyle,
      selectedIconStyle, textStyle, selectedTextStyle,
      jumpPage, badge
      } = this.props;
    if (!tabs || tabs.length === 0) return null;

    let tabsView = tabs.map((tab, index) => {
      const isSelected = this.state.selectedIndex === index;
      if (index !== 2) {
        return (
          <TouchableOpacity
            style={[styles.itemContainer, isSelected ? selectedItemStyle : itemStyle]}
            activeOpacity={0.6}
            key={index}
            onPress={() => !isSelected && pager.setPageWithoutAnimation(index)}
          >
            <Image
              style={[styles.image, isSelected ? selectedIconStyle : iconStyle]}
              source={isSelected ? tab.selectedIconSource : tab.iconSource}
            />
            {this.renderBadge(index, badge)}
            <Text
              style={[isSelected ? styles.textSelected : styles.text, isSelected ? selectedTextStyle : textStyle]}
            >
              {tab.text}
            </Text>
          </TouchableOpacity>
        );
      }
      return (
        <TouchableOpacity
          style={[styles.itemContainer, { marginTop: 5 }]}
          activeOpacity={0.6}
          key={index}
          onPress={() => jumpPage && jumpPage()}
        >
          <Image
            style={[{ width: 45, height: 45, resizeMode: 'cover' }]}
            source={tab.selectedIconSource}
          />
        </TouchableOpacity>
      );
    });
    return (
      <View style={[styles.container, style]}>
        {tabsView}
      </View>
    );
  }

  onPageSelected(e) {
    this.setState({ selectedIndex: e.position });
  }
}

