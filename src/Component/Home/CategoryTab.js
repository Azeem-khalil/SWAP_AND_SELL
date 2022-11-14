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

const Tab = createMaterialTopTabNavigator();

export default function CategoryTab() {
  const [menData, setmenData] = useState([]);
  const [womenData, setwomenData] = useState([]);
  const [childData, setchildData] = useState([]);
  const [loading, setLoading] = useState(true);
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
          if (isMounted) setmenData(shoesData);
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

  const ContentComponentChild = () => <Content ProductData={childData} />;
  const ContentComponentMen = () => <Content ProductData={menData} />;

  const ContentComponentWomen = () => <Content ProductData={womenData} />;

  return (
    <Tab.Navigator>
      {console.log('childData ' + childData)}
      <Tab.Screen name="Men" component={ContentComponentMen} />
      <Tab.Screen name="Women" component={ContentComponentWomen} />
      <Tab.Screen name="Child" component={ContentComponentChild} />
    </Tab.Navigator>
  );
}
