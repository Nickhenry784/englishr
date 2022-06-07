import { 
  View, 
  StyleSheet, 
  TouchableOpacity,
  Text, Dimensions,
  FlatList, 
  ImageBackground, 
  Image, 
  Alert  } from "react-native";
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {decrement} from '../redux/pointSlice';
import {useDispatch, useSelector} from 'react-redux';
import { data } from "../assets/quesiton";
import { images } from "../assets";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;
const numCol = 3;
const dataQuestion = [
  {id: 1, image: images.el1},
  {id: 2, image: images.el2},
  {id: 3, image: images.el3},
  {id: 4, image: images.el4},
  {id: 5, image: images.el5},
  {id: 6, image: images.el6},
  {id: 7, image: images.el7},
  {id: 8, image: images.el8},
  {id: 9, image: images.el9},
  {id: 10, image: images.el10},
  {id: 11, image: images.el11},
  {id: 12, image: images.el12},
]

const Home = () => {
  const navigation = useNavigation();

  const points = useSelector(state => state.points);
  const dispatch = useDispatch();


  useEffect(() => {
    console.log(points);
  },[]);

  const onClickStartButton = () => {
    if (points.value === 0) {
      Alert.alert('Please buy more turn');
      return false;
    }
    dispatch(decrement());
    const list = [...data];
    for (let index = 0; index < list.length; index++) {
      const element = list[index];
      const i = Math.floor(Math.random() * 12);
      list.splice(index, 1);
      list.splice(i,0, element);
    }
    for (let index = 0; index < list.length; index++) {
      const element = {
        question: list[index][0],
        a: list[index][1],
        b: list[index][2],
        c: list[index][3],
        d: list[index][4],
        result: list[index][5],
      }
      list.splice(index, 1);
      list.splice(index,0, element);
    }
    navigation.navigate("Play",{listItem: list});
  }


  const onClickTurnButton = () => {
    navigation.navigate("BUY");
  }


  return (
    <ImageBackground style={appStyle.homeView} source={images.background}>
      <View style={appStyle.appBar}>
        <TouchableOpacity onPress={onClickTurnButton}>
          <View style={appStyle.turnView}>
            <Image source={images.heart} style={appStyle.buyImage} />
            <Text style={appStyle.turnText}>{points.value}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={appStyle.centerView}>
        <FlatList
          data={dataQuestion}
          scrollEnabled={false}
          numColumns={numCol}
          renderItem={({item}) => (
            <Image style={appStyle.centerImage} source={item.image} />
          )} />
      </View>
      <View style={appStyle.bottomView}>
        <TouchableOpacity onPress={onClickStartButton}>
          <Image source={images.start} style={appStyle.createButton} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};


export const appStyle = StyleSheet.create({
  homeView: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    resizeMode: 'cover',
  },
  attributeView: {
    flex: 0.1,
    width: '40%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  logoImage: {
    width: windowWidth * 0.4,
    height: windowWidth * 0.4,
    resizeMode: 'cover',
  },
  appBar: {
    flex: 0.1,
    width: '100%',
    paddingTop: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  turnView: {
    flexDirection: 'row',
    width: windowWidth * 0.15,
    marginRight: 10,
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centerImage: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    resizeMode: 'contain',
    margin: 10,
  },
  scoreStyle: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
    margin: 8,
  },
  turnText: {
    fontSize: windowWidth > 640 ? 30 : 25,
    fontWeight: 'bold',
    color: 'white',
  },
  tutorialText: {
    marginVertical: 10,
    fontSize: windowWidth > 640 ? 25 : 18,
    color: 'white',
    fontWeight: 'bold',
  },
  labelText: {
    fontSize: windowWidth > 640 ? 60 : 40,
    color: 'white',
    fontWeight: 'bold',
  },
  buyImage: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
  centerView: {
    marginTop: 20,
    flex: 0.85,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  bottomView: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  createButton: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
  backStyle: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    resizeMode: 'contain',
  },
});

export default Home;