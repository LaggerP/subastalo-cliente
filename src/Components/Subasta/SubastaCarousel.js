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

const {width: screenWidth} = Dimensions.get('window');

const SubastaCarousel = ({ navigation: { goBack, navigate }, fotos, setIntervalStatus, idSubasta }) => {
  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null);

  useEffect(() => {
    setEntries(fotos);
  }, []);

  const renderItem = ({item, index}, parallaxProps) => {
    return (

      <View style={styles.item}>
        <ParallaxImage
          source={{uri: item.foto}}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.6}
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
      <View style={{ flexDirection:'row', alignItems: 'flex-start', justifyContent:'flex-start'}}>
        <TouchableOpacity
          style={{
            justifyContent: 'flex-start',
            marginTop: '12%',
            paddingLeft: 20,
            paddingBottom: 10,
            paddingTop: 10
          }}
          onPress={() => {
            goBack()
            setIntervalStatus(false)
          }}>
          <Icon
            name='arrow-back-outline'
            type='ionicon'
            color='#000'
            size={25}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginTop: '12%',
            paddingRight: 20,
            paddingBottom: 10,
            paddingTop: 10
          }}
          onPress={() => navigate('Catalogo', {idSubasta: idSubasta})}>
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
          loop={true}
          enableSnap={true}
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
    height: 280,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
  },
});