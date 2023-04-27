/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, Button, Text} from 'react-native';
import {endpoint} from '../contants/api';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';

function CustomerScreen({navigation}: any) {
  const user = useSelector((state: RootState) => state.user);
  const [data, setData] = useState();

  const dataHeader = [
    {
      name: 'Name',
      hold: 'Hold',
      gross: 'Gross',
      net: 'Net',
    },
  ];

  const ItemHeader1 = ({item}: any) => (
    <View style={styles.containerHeader1}>
      <Text style={styles.textHeader1}>{item.name}</Text>
      <Text style={styles.textHeader1}>{item.gross}</Text>
      <Text style={styles.textHeader1}>{item.hold}</Text>
      <Text style={styles.textHeader1}>{item.net}</Text>
    </View>
  );

  const renderItemHeader1 = ({item}: {item: any}) => {
    return <ItemHeader1 item={item} />;
  };

  const ItemHeader = ({item}: any) => (
    <View style={styles.containerHeader}>
      <Text style={styles.textHeader}>{item.name}</Text>
      <Text style={styles.textHeader}>{item.gross}</Text>
      <Text style={styles.textHeader}>{item.hold}</Text>
      <Text style={styles.textHeader}>{item.net}</Text>
    </View>
  );

  const renderItemHeader = ({item}: {item: any}) => {
    return <ItemHeader item={item} />;
  };

  useEffect(() => {
    if (user.token) {
      axios
        .get(`${endpoint}/customer_list`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response: any) => {
          if (response.data) {
            setData(response.data.customers);
            console.log(response.data);
          }
        })
        .catch((error: any) => {
          console.log(2222, error);
        });
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Button
          title="Add Customer"
          color="#033076"
          onPress={() => navigation.navigate('AddCustomer')}
        />
      </View>

      <FlatList
        data={dataHeader}
        renderItem={renderItemHeader1}
        numColumns={1}
      />
      <FlatList data={data} renderItem={renderItemHeader} numColumns={1} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  text: {
    fontSize: 20,
  },
  containerHeader: {
    width: '100%',
    flexDirection: 'row',
  },
  textHeader: {
    width: '25%',
    height: 'auto',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  containerHeader1: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#033076',
  },
  textHeader1: {
    color: 'white',
    width: '25%',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  button: {
    marginBottom: 30,
    marginTop: 30,
  },
});

export default CustomerScreen;
