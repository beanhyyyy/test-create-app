/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Modal,
  TouchableHighlight,
  Text,
  StyleSheet,
  Button,
  Alert,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {endpoint} from '../contants/api';
import axios from 'axios';

const AddCustomerScreen = () => {
  //
  const user = useSelector((state: RootState) => state.user);
  const [data, setData] = useState([
    {name: 'Option 1'},
    {name: 'Option 2'},
    {name: 'Option 3'},
  ]);

  //
  const [selectedOption, setSelectedOption] = useState('option1');

  //
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const handleOptionPress = (option: any) => {
    setSelectedValue(option);
    setModalVisible(false);
  };

  //
  const [text, setText] = useState('');

  const handleTextChange = (inputText: any) => {
    setText(inputText);
  };

  const [textName, setTextName] = useState('');

  const handleTextNameChange = (inputText: any) => {
    setTextName(inputText);
  };

  useEffect(() => {
    if (user.token) {
      axios
        .get(`${endpoint}/customers`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response: any) => {
          if (response.data) {
            setData(response.data);
          }
        })
        .catch((error: any) => {
          console.log(2222, error);
        });
    }
  }, []);

  const handleAdd1 = async () => {
    try {
      let params = {
        name: selectedValue,
        order: [text],
      };

      await axios
        .post(`${endpoint}/orders`, params, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then(() => {
          Alert.alert('Notification', 'Success');
        })
        .catch((error: any) => {
          Alert.alert('Notification', 'Fail');
          console.log(error);
        });
    } catch (error) {
      Alert.alert('Notification', 'Fail');
      console.error(error);
    }
  };

  const handleAdd2 = async () => {
    try {
      let params = {
        name: textName,
        order: text,
      };

      await axios
        .post(`${endpoint}/orders`, params, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then(() => {
          Alert.alert('Notification', 'Success');
        })
        .catch((error: any) => {
          Alert.alert('Notification', 'Fail');
          console.log(error);
        });
    } catch (error) {
      Alert.alert('Notification', 'Fail');
      console.error(error);
    }
  };
  return (
    <View>
      <View style={styles.styleRadio}>
        <View style={styles.option}>
          <RadioButton
            value="option1"
            status={selectedOption === 'option1' ? 'checked' : 'unchecked'}
            onPress={() => setSelectedOption('option1')}
          />
          <Text style={styles.label}>The existed customers</Text>
        </View>
        <View style={styles.option}>
          <RadioButton
            value="option2"
            status={selectedOption === 'option2' ? 'checked' : 'unchecked'}
            onPress={() => setSelectedOption('option2')}
          />
          <Text style={styles.label}>Add new</Text>
        </View>
      </View>

      {selectedOption === 'option2' ? (
        <TextInput
          style={styles.input}
          onChangeText={handleTextNameChange}
          value={textName}
          placeholder="Enter Name"
        />
      ) : (
        <View style={styles.styleOption}>
          <TouchableHighlight
            onPress={() => setModalVisible(true)}
            underlayColor="white">
            <TextInput
              placeholder="Select an option"
              value={selectedValue}
              editable={false}
            />
          </TouchableHighlight>

          <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}>
            <View style={styles.modalView}>
              {data.map((option: any) => (
                <TouchableHighlight
                  key={option.name}
                  onPress={() => handleOptionPress(option.name)}
                  underlayColor="gray">
                  <Text style={styles.optionText}>{option.name}</Text>
                </TouchableHighlight>
              ))}
              <TouchableHighlight
                onPress={() => setModalVisible(false)}
                underlayColor="gray">
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableHighlight>
            </View>
          </Modal>
        </View>
      )}

      <TextInput
        style={styles.textMultiple}
        multiline={true}
        onChangeText={handleTextChange}
        value={text}
        placeholder="Enter text here"
      />

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{width: '45%'}}>
          <Button
            title="Clear"
            onPress={() => {
              setText('');
              setTextName('');
            }}
          />
        </View>
        <View style={{width: '45%'}}>
          <Button
            title="Create"
            color="#033076"
            onPress={() => {
              if (selectedValue && selectedOption === 'option1') {
                handleAdd1();
              } else {
                Alert.alert('Notification', 'Select Name, Please');
              }
              if (selectedOption === 'option2' && textName) {
                handleAdd2();
              } else {
                Alert.alert('Notification', 'Input Name, Please');
              }
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    marginLeft: 10,
  },
  styleRadio: {
    marginBottom: 30,
  },
  input: {
    padding: 10,
    marginBottom: 30,
    backgroundColor: '#FFF',
    borderRadius: 5,
  },
  textMultiple: {
    height: 300,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 30,
    backgroundColor: '#FFF',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
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
  optionText: {
    fontSize: 18,
    paddingVertical: 10,
  },
  cancelText: {
    fontSize: 18,
    paddingVertical: 10,
    color: 'red',
  },
  styleOption: {
    width: '100%',
    marginBottom: 30,
    backgroundColor: '#fff',
  },
});

export default AddCustomerScreen;
