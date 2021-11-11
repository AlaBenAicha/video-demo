import React, { useState, useRef, useCallback, useEffect } from 'react';
import { View, StyleSheet, Dimensions, FlatList, Modal, Text, Button } from 'react-native';
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
  const [show, setShow] = useState(true)

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

  const handleStatusChange = playbackStatus => {
    setLoading(!playbackStatus.isLoaded);
    setStatus(playbackStatus);
  };

  const [visible, setVisible] = useState(true);
  const count = useRef(0);
  const limitScroll = useRef(0);
  const indexx = useRef(0);
  const modalVisible = useRef(false);
  const listRef = useRef();
  const onViewRef = useRef(({ viewableItems, changed }) => {
    if (changed[0].isViewable) {
      setPaused(false);
      setPlaying(changed[0].item.id);

      if (changed[0].index > indexx.current) {
        limitScroll.current = 0;
        indexx.current = changed[0].index;
      } else if (changed[0].index === indexx.current){indexx.current = changed[0].index;}
      else {
        
        if (limitScroll.current === 1) {
          setPaused(true);
          setPlaying(0);
          modalVisible.current = true;
        } else {
          limitScroll.current = 1;
          indexx.current = changed[0].index;
        }
      }
    }
    if (changed[0]?.index < changed[1]?.index) {
      count.current = count.current - 1;
    } else {
      count.current++;
    }
    setCurrentPost(changed[0].item.id);
  });

  const handle = () => {
    modalVisible.current = false,
    listRef.current.scrollToIndex({animated:true, index:indexx.current})
    setShow(!show)
  };

  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });

  const togglePlayPause = () => {
    setPaused(prev => !prev);
  };

  useEffect(() => {
    setPlaying(true);
    setPaused(false);
  }, [viewConfigRef]);

  useEffect(() => { // this only gets triggered when the component mounts
  }, [modalVisible.current]);

  let offset = 0;

  const scrollhandler = e => {
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
        ref={listRef}
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
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        pagingEnabled
        snapToInterval={Dimensions.get('screen').height}
        snapToAlignment="center"
        decelerationRate="fast"
        disableIntervalMomentum
      />

      {modalVisible.current === true && (
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible.current}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              modalVisible.current === false;
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>You need premiun access</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Button style={[styles.button, styles.buttonClose]} title="Press me" />
                  <Button style={[styles.button, styles.buttonOpen]} onPress={() => handle()} title="Press" />
                </View>
              </View>
            </View>
          </Modal>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 10,
    height: '40%',
    width: '80%',
    alignSelf: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: 'red',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
export default Cast;
