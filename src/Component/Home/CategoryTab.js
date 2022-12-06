import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Content from './Content';
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../DataBase/firebase';
import { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Box, Center, HStack, Fab, Input } from 'native-base';
import Header from '../../Component/HomeBook/Header';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Octicons';
const Tab = createMaterialTopTabNavigator();

export default function CategoryTab(props) {
  const [menData, setmenData] = useState([]);
  const [womenData, setwomenData] = useState([]);
  const [childData, setchildData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredDataSourceMEN, setFilteredDataSourceMEN] = useState([]);
  const [filteredDataSourceWOMEN, setFilteredDataSourceWOMEN] = useState([]);
  const [filteredDataSourcechild, setFilteredDataSourcechild] = useState([]);

  const [search, setSearch] = useState('');
  const searchFilterFunction = (text, DATA, setFilteredDataSource) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = DATA.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData =
          (item.name ? item.name.toUpperCase() : ''.toUpperCase()) + item.price;

        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(DATA);
      setSearch(text);
    }
  };
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      console.log('press Button: ');

      try {
        const qc = query(
          collection(db, 'shoes'),
          where('category', '==', 'men'),
        );

        const unsubscribe = await onSnapshot(qc, querySnapshot => {
          const shoesData = [];
          querySnapshot.forEach(doc => {
            console.log('indoc: ' + `${doc.id} => ${doc.data()}`);
            shoesData.push({
              ...doc.data(),
              key: doc.id,
            });
          });
          if (isMounted) {
            setmenData(shoesData);
          }
          console.log('shoesData ' + shoesData);
        });
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      console.log('press Button: ');

      try {
        const qc = query(
          collection(db, 'shoes'),
          where('category', '==', 'women'),
        );

        const unsubscribe = await onSnapshot(qc, querySnapshot => {
          const shoesData = [];
          querySnapshot.forEach(doc => {
            console.log('indoc: ' + `${doc.id} => ${doc.data()}`);

            shoesData.push({
              ...doc.data(),
              key: doc.id,
            });
          });
          if (isMounted) setwomenData(shoesData);
          console.log('shoesData ' + shoesData);
        });
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    };
    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      console.log('press Button: ');

      try {
        const qc = query(
          collection(db, 'shoes'),
          where('category', '==', 'children'),
        );

        const unsubscribe = await onSnapshot(qc, querySnapshot => {
          const shoesData = [];
          querySnapshot.forEach(doc => {
            console.log('indoc: ' + `${doc.id} => ${doc.data()}`);

            shoesData.push({
              ...doc.data(),
              key: doc.id,
            });
          });
          if (isMounted) setchildData(shoesData);
          console.log('shoesData ' + shoesData);
        });
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      searchFilterFunction(props.search, menData, setFilteredDataSourceMEN);
      searchFilterFunction(props.search, womenData, setFilteredDataSourceWOMEN);
      searchFilterFunction(props.search, childData, setFilteredDataSourcechild);
      console.log('search ' + props.search);
    }

    return () => {
      isMounted = false;
    };
  }, [props.search, menData, womenData, childData]);

  const ContentComponentMen = () => (
    <Content ProductData={filteredDataSourceMEN} />
  );

  const ContentComponentWomen = () => (
    <Content ProductData={filteredDataSourceWOMEN} />
  );
  const ContentComponentChild = () => (
    <Content ProductData={filteredDataSourcechild} />
  );
  return (
    <Tab.Navigator>
      <Tab.Screen name="Men" component={ContentComponentMen} />
      <Tab.Screen name="Women" component={ContentComponentWomen} />
      <Tab.Screen name="Child" component={ContentComponentChild} />
    </Tab.Navigator>
  );
}
