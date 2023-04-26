import React, {useState, useEffect} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import axios from 'axios';
import {endpoint} from '../contants/api';

type ItemData = {
  number?: string;
  value?: string;
  isHeader?: boolean;
};

type ItemProps = {
  item: ItemData;
};

const handleRender = (
  number: string | undefined,
  value: string | undefined,
) => {
  if (
    number &&
    value &&
    number.length === 2 &&
    parseInt(number, 10) > 0 &&
    parseInt(number, 10) < 99 &&
    parseInt(value, 10) > 1600
  ) {
    return true;
  }
  if (
    number &&
    value &&
    number.length === 3 &&
    parseInt(number, 10) > 0 &&
    parseInt(number, 10) < 999 &&
    parseInt(value, 10) > 400
  ) {
    return true;
  }
  return false;
};

const ItemHeader = ({item}: ItemProps) => (
  <View style={styles.containerHeader}>
    <Text style={styles.textHeader}>{item.number}</Text>
    <Text style={styles.textHeader}>{item.value}</Text>
  </View>
);

const Item = ({item}: ItemProps) => (
  <View
    style={
      handleRender(item.number, item.value)
        ? styles.containerItemBg
        : styles.containerItem
    }>
    <Text
      style={
        handleRender(item.number, item.value) ? styles.textBg : styles.text
      }>
      {item.number}
    </Text>
    <Text
      style={
        handleRender(item.number, item.value) ? styles.textBg : styles.text
      }>
      {item.value}
    </Text>
  </View>
);

const HomeScreen = () => {
  const user = useSelector((state: RootState) => state.user);

  const [data, setData] = useState([]);
  const [dataTotal, setDataTotal] = useState();

  const renderItem = ({item}: {item: ItemData}) => {
    return <Item item={item} />;
  };

  const renderItemHeader = ({item}: {item: ItemData}) => {
    return <ItemHeader item={item} />;
  };

  const headerData = [
    {
      id: '1',
      number: 'NUMBER',
      value: 'VALUE',
      isHeader: true,
    },
    {
      id: '2',
      number: 'NUMBER',
      value: 'VALUE',
      isHeader: true,
    },
  ];

  useEffect(() => {
    if (user.token) {
      try {
        axios
          .get(`${endpoint}/home`, {
            headers: {
              Authorization: 'Bearer ' + user.token,
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          })
          .then((response: any) => {
            if (response.data) {
              setData(response.data.list_num);
              setDataTotal(response.data);
            }
          })
          .catch((error: any) => {
            console.log(error);
          });
      } catch (error) {
        console.error(error);
      }
    }
  }, [user]);

  // navigation.navigate('Details')

  console.log('dataTotal', dataTotal);

  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={headerData}
        renderItem={renderItemHeader}
        numColumns={2}
      />
      <FlatList data={data} renderItem={renderItem} numColumns={2} />
      <View>
        <Text style={styles.styleTotal}>
          <b>Gross Total:</b>&nbsp;
        </Text>
        <Text style={styles.styleTotal2}>
          <b>Hold Total:</b>&nbsp;
        </Text>
        <Text style={styles.styleTotal2}>
          <b>Net Total:</b>&nbsp;
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerItem: {
    width: '50%',
    flexDirection: 'row',
  },
  containerItemBg: {
    width: '50%',
    flexDirection: 'row',
    backgroundColor: 'red',
  },
  containerHeader: {
    width: '50%',
    flexDirection: 'row',
    backgroundColor: '#033076',
  },
  text: {
    width: '50%',
    height: 'auto',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  textBg: {
    width: '50%',
    height: 'auto',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'black',
    color: 'white',
  },
  textHeader: {
    color: 'white',
    width: '50%',
    height: 'auto',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  container: {
    marginTop: 30,
    border: '1px solid black',
  },
  item: {
    border: '1px solid black',
    borderWidth: 1,
    borderColor: 'black',
    marginLeft: 2,
    width: '25%',
    height: 'auto',
    textAlign: 'center',
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
  },
  styleTotal: {marginBottom: 20, marginTop: 20},
  styleTotal2: {marginBottom: 20},
});

export default HomeScreen;
