import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import Post from './PostComponent';
const Cast = () => {
  const [showModal, setShowModal] = useState(false);

  const videoURI =
    'https://d8vywknz0hvjw.cloudfront.net/fitenium-media-prod/videos/45fee890-a74f-11ea-8725-311975ea9616/proccessed_720.mp4';
  const [status, setStatus] = useState({});
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(1);
  const [currentPost, setCurrentPost] = useState(0);
  const [isPaused, setPaused] = useState(false);
  const [scrollEnb, setScrollEnb] = useState(true);

  const [data, setData] = useState([
    {
      id: 1,
      link: videoURI,
    },
    {
      id: 2,
      link: 'http://entwurf.thesquareware.de/tiktok1.mp4',
    },
    {
      id: 3,
      link: 'http://entwurf.thesquareware.de/tiktok2.mp4',
    },
    {
      id: 4,
      link: 'http://entwurf.thesquareware.de/tiktok2.mp4',
    },
    {
      id: 5,
      link: 'http://entwurf.thesquareware.de/tiktok2.mp4',
    },
  ]);

  const handleStatusChange = (playbackStatus) => {
    setLoading(!playbackStatus.isLoaded);
    setStatus(playbackStatus);
  };

  const count = useRef(0);

  const onViewRef = useRef(({ viewableItems, changed }) => {
    if (changed[0].isViewable) {
      setPaused(false);
      setPlaying(changed[0].item.id);
    }
    if (changed[0]?.index < changed[1]?.index) {
      count.current = count.current - 1;
    } else {
      count.current++;
    }
    setCurrentPost(changed[0].item.id);
  });

  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });

  const togglePlayPause = () => {
    setPaused((prev) => !prev);
  };

  useEffect(() => {
    setPlaying(true);
    setPaused(false);
  }, [viewConfigRef]);

  let offset = 0;

  const scrollhandler = (e) => {
    var currentOffset = e.nativeEvent.contentOffset.y;
    var direction = currentOffset > offset ? 'down' : 'up';
    offset = currentOffset;

    if (direction === 'down') {
    } else if (direction === 'up' && count.current === 0) {
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        scrollEnabled={scrollEnb}
        onScroll={scrollhandler}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        renderItem={({ item }) => (
          <Post
            onPressFilter={() => setShowModal(true)}
            item={item}
            handleStatusChange={handleStatusChange}
            playing={playing}
            togglePlayPause={togglePlayPause}
            isPaused={isPaused}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        pagingEnabled
        snapToInterval={Dimensions.get('screen').height}
        snapToAlignment='center'
        decelerationRate='fast'
        disableIntervalMomentum
      />

    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Cast;
