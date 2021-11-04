import React, { useEffect, useRef } from 'react';
import {
  View,
  Dimensions,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';

import { Video } from 'expo-av';
import CustomImage from './CustomImage';

const { height, width } = Dimensions.get('screen');

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Post = ({ item, playing, togglePlayPause, isPaused, onPressFilter }) => {
  const video = useRef(null);

  const playPause = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (!isPaused) {
      togglePlayPause();
      video.current.pauseAsync();
      return;
    }
    video.current.playAsync();
    togglePlayPause();
  };

  useEffect(() => {
    playPause();
  }, []);

  return (
    <TouchableOpacity onPress={playPause} activeOpacity={1}>
      <Video
        source={{ uri: item.link }}
        ref={video}
        status={false}
        // onPlaybackStatusUpdate={handleStatusChange}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay={playing === item.id}
        isLooping
        useNativeControls={false}
        style={{ height: height, width: width }}
      />
      <View style={styles.overlayContainer}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}
        >
          {isPaused ? (
            <TouchableOpacity onPress={playPause}>
              <CustomImage
                source={require('./assets/play.png')}
                style={{ height: 100, width: 100 }}
              />
            </TouchableOpacity>
          ) : (
            <View style={{ height: 100, width: 100 }} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    // paddingTop: '15%',
  },
});

export default Post;
