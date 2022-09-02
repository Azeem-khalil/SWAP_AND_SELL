import React, { useRef } from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  Image,
  StyleSheet,
  ScrollView,
  StatusBar,
  Animated,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const UPPER_HEADER_HEIGHT = 50;
const UPPER_HEADER_PADDING_TOP = 4;
const LOWER_HEADER_HEIGHT = 96;
const CustomHeader = props => {
  return (
    // render
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <SafeAreaView>
        <View style={styles.upperHeaderPlaceholder} />
      </SafeAreaView>

      <SafeAreaView style={styles.header}>
        <View style={styles.upperHeader}>
          <View style={styles.searchContainer}>
            <Ionicons
              name="search"
              //size={22}
              style={[styles.icon16, { marginLeft: 8 }]}
            />
            {/* <Image source={require('../../images/momo/search.png')} /> */}
            <TextInput
              placeholder="Tìm kiếm"
              placeholderTextColor="#696969"
              style={[styles.searchInput]}
            />
          </View>
          <Ionicons
            name="search"
            //size={22}
            style={styles.bell}
          />
          {/* <Image
            source={require('../../images/momo/bell.png')}
            style={styles.bell}
          /> */}
          <Image
            source={require('../../assets/images/user-profile.jpg')}
            style={styles.avatar}
          />
        </View>

        {/* <View style={[styles.lowerHeader]}>
          <Animated.View style={[styles.feature, depositViewAnimation]}>
            <Animated.Image
              source={require('../../images/momo/deposit.png')}
              style={[styles.featureIcon, featureIconAnimation]}
            />
            <Animated.Image
              source={require('../../images/momo/deposit-circle.png')}
              style={[styles.icon32, featureIconCircleAnimation]}
            />
            <Animated.Text style={[styles.featureName, featureNameAnimation]}>
              NẠP TIỀN
            </Animated.Text>
          </Animated.View>

          <Animated.View style={[styles.feature, withdrawViewAnimation]}>
            <Animated.Image
              source={require('../../images/momo/withdraw.png')}
              style={[styles.featureIcon, featureIconAnimation]}
            />
            <Animated.Image
              source={require('../../images/momo/withdraw-circle.png')}
              style={[styles.icon32, featureIconCircleAnimation]}
            />
            <Animated.Text style={[styles.featureName, featureNameAnimation]}>
              RÚT TIỀN
            </Animated.Text>
          </Animated.View>

          <Animated.View style={[styles.feature, qrViewAnimation]}>
            <Animated.Image
              source={require('../../images/momo/qr.png')}
              style={[styles.featureIcon, featureIconAnimation]}
            />
            <Animated.Image
              source={require('../../images/momo/qr-circle.png')}
              style={[styles.icon32, featureIconCircleAnimation]}
            />
            <Animated.Text style={[styles.featureName, featureNameAnimation]}>
              MÃ QR
            </Animated.Text>
          </Animated.View>

          <Animated.View style={[styles.feature, scanViewAnimation]}>
            <Animated.Image
              source={require('../../images/momo/scan.png')}
              style={[styles.featureIcon, featureIconAnimation]}
            />
            <Animated.Image
              source={require('../../images/momo/scan-circle.png')}
              style={[styles.icon32, featureIconCircleAnimation]}
            />
            <Animated.Text style={[styles.featureName, featureNameAnimation]}>
              QUÉT MÃ
            </Animated.Text>
          </Animated.View>
        </View> */}
      </SafeAreaView>

      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}
        onScroll={e => {
          const offsetY = e.nativeEvent.contentOffset.y;
          scrollDirection.current =
            offsetY - lastOffsetY.current > 0 ? 'down' : 'up';
          lastOffsetY.current = offsetY;
          animatedValue.setValue(offsetY);
        }}
        onScrollEndDrag={() => {
          scrollViewRef.current?.scrollTo({
            y: scrollDirection.current === 'down' ? 100 : 0,
            animated: true,
          });
        }}
        scrollEventThrottle={16}>
        <View style={styles.spaceForHeader} />
        <View style={styles.scrollViewContent} />
      </ScrollView> */}
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //width: 102,
    // height: 10277,
  },
  icon16: {
    width: 16,
    height: 16,
  },
  icon32: {
    width: 32,
    height: 32,
  },
  upperHeaderPlaceholder: {
    height: UPPER_HEADER_HEIGHT + UPPER_HEADER_PADDING_TOP,
    paddingTop: UPPER_HEADER_PADDING_TOP,
  },
  header: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#c0c0c0',
  },
  upperHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: UPPER_HEADER_HEIGHT + UPPER_HEADER_PADDING_TOP,
    paddingTop: UPPER_HEADER_PADDING_TOP,
  },
  searchContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  featureIcon: {
    width: 16,
    height: 16,
    position: 'absolute',
    top: 8,
  },
  bell: {
    width: 16,
    height: 16,
    marginHorizontal: 32,
  },
  avatar: {
    width: 28,
    height: 28,
  },
  lowerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: LOWER_HEADER_HEIGHT,
    paddingHorizontal: 16,
  },
  searchInput: {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    color: '#696969',
    borderRadius: 4,
    paddingVertical: 4,
    paddingLeft: 32,
  },
  feature: {
    alignItems: 'center',
  },
  featureName: {
    fontWeight: 'bold',
    fontSize: 12,
    lineHeight: 14,
    color: '#FFFFFF',
    marginTop: 12,
  },
  spaceForHeader: {
    height: LOWER_HEADER_HEIGHT,
  },
  scrollViewContent: {
    height: 1000,
    backgroundColor: 'white',
  },
});
