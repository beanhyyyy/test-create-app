import React, {useState} from 'react';
import {
  View,
  TextInput,
  Modal,
  TouchableHighlight,
  Text,
  StyleSheet,
  Button,
} from 'react-native';
import {RadioButton} from 'react-native-paper';

const CustomerScreen = () => {
  //
  const [selectedOption, setSelectedOption] = useState('option1');

  //
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const options = ['Option 1', 'Option 2', 'Option 3'];

  const handleOptionPress = (option: any) => {
    setSelectedValue(option);
    setModalVisible(false);
  };

  //
  const [text, setText] = useState('');

  const handleTextChange = (inputText: any) => {
    setText(inputText);
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
          <Text style={styles.label}>Option 1</Text>
        </View>
        <View style={styles.option}>
          <RadioButton
            value="option2"
            status={selectedOption === 'option2' ? 'checked' : 'unchecked'}
            onPress={() => setSelectedOption('option2')}
          />
          <Text style={styles.label}>Option 2</Text>
        </View>
      </View>

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

        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalView}>
            {options.map((option: any) => (
              <TouchableHighlight
                key={option}
                onPress={() => handleOptionPress(option)}
                underlayColor="gray">
                <Text style={styles.optionText}>{option}</Text>
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

      {selectedOption === 'options2' && (
        <TextInput
          style={styles.input}
          onChangeText={handleTextChange}
          value={text}
          placeholder="Enter Name"
        />
      )}

      <TextInput
        style={styles.textMultiple}
        multiline={true}
        onChangeText={handleTextChange}
        value={text}
        placeholder="Enter text here"
      />

      <View>
        <Button title="Clear" />
        <Button title="Create" color="#033076" />
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
    height: 120,
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
    width: '80%',
    marginBottom: 30,
  },
});

export default CustomerScreen;
