import React, {useRef, useState, useEffect} from 'react';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Platform,
} from 'react-native';
import {Icon} from 'react-native-elements'

const ENTRIES1 = [
  {
    illustration: 'https://i.imgur.com/UYiroysl.jpg',
  },
  {
    illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
  },
  {
    illustration: 'https://i.imgur.com/MABUbpDl.jpg',
  },
  {
    illustration: 'https://i.imgur.com/KZsmUi2l.jpg',
  },
  {
    illustration: 'https://i.imgur.com/2nCt3Sbl.jpg',
  },
];
const {width: screenWidth} = Dimensions.get('window');

const SubastaCarousel = ({ navigation: { goBack } }) => {
  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null);

  useEffect(() => {
    setEntries(ENTRIES1);
  }, []);

  const renderItem = ({item, index}, parallaxProps) => {
    return (

      <View style={styles.item}>
        <ParallaxImage
          source={{uri: item.illustration}}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
      </View>
    );
  };

  return (
    <>
      <View style={{display:'flex', flexDirection:'row', alignItems: 'center', justifyContent:'center'}}>
        <TouchableOpacity
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            marginTop: '15%',
            paddingLeft: 20,
            paddingBottom: 10,
            paddingTop: 10
          }}
          onPress={() => goBack()}>
          <Icon
            name='arrow-back-outline'
            type='ionicon'
            color='#000'
            size={25}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginTop: '15%',
            paddingRight: 20,
            paddingBottom: 10,
            paddingTop: 10
          }}
          onPress={() => console.log("hola")}>
          <Icon
            name='pricetags-outline'
            type='ionicon'
            color='#000'
          />
          <Text> Catálogo</Text>
        </TouchableOpacity>

      </View>
      <View style={styles.container}>
        <Carousel
          ref={carouselRef}
          sliderWidth={screenWidth}
          sliderHeight={screenWidth - 20}
          itemWidth={screenWidth - 60}
          itemHeight={screenWidth - 80}
          data={entries}
          renderItem={renderItem}
          hasParallaxImages={true}
        />
      </View>
    </>

  );
};

export default SubastaCarousel;

const styles = StyleSheet.create({
  item: {
    width: screenWidth - 60,
    height: 280
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 10,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
});