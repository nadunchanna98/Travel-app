import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { TextInput, Button, DataTable } from 'react-native-paper';
const { height, width } = Dimensions.get('window');
const secondaryColor = '#0d294f';

const BMI = () => {

  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [unit, setUnit] = useState('metric');
  const [result, setResult] = useState(null);

  const calculateBMI = () => {
    if (weight && height) {
      const weightValue = parseFloat(weight);  // convert string to number
      const heightValue = parseFloat(height);

      if (unit === 'imperial') {

        const weightKg = weightValue * 0.453592;
        const heightCm = heightValue * 2.54;
        const bmi = (weightKg / (heightCm * heightCm)).toFixed(2);
        setResult(bmi);
      } else {
        // Metric unit: weight in kg, height in cm
        const weightKg = weightValue;
        const heightCm = heightValue;
        const bmi = (weightKg / (heightCm * heightCm / 10000)).toFixed(2);
        setResult(bmi);
      }
    } else {
      setResult(null);
    }
  };

  const clearFields = () => {
    setWeight('');
    setHeight('');
    setResult(null);
  };

  return (
    <ScrollView >
      <View style={styles.container}>

        <View style={{ marginBottom: height * 0.02 , paddingBottom:height * 0.25 }}>
          <Text style={{ fontSize: width * 0.08 }}>Body Mass Index (BMI)</Text>
        </View>


        <DataTable
        >
          <DataTable.Header>
            <DataTable.Title
              textStyle={{ fontWeight: 'bold', fontSize: width * 0.04, color: secondaryColor }}  >BMI</DataTable.Title>
            <DataTable.Title textStyle={{ fontWeight: 'bold', fontSize: width * 0.04, color: secondaryColor }}  >WEIGHT STATUS</DataTable.Title>
          </DataTable.Header>
          <DataTable.Row>
            <DataTable.Cell>Below 18.5</DataTable.Cell>
            <DataTable.Cell >Underweight</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>18.5 - 24.9</DataTable.Cell>
            <DataTable.Cell >Healthy weight</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>25.0 - 29.9</DataTable.Cell>
            <DataTable.Cell >Overweight</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>30.0 and above</DataTable.Cell>
            <DataTable.Cell >Obesity</DataTable.Cell>
          </DataTable.Row>
        </DataTable>

        <View style={styles.buttonContainer}>
          <Button
            mode="outlined"
            textColor={secondaryColor}
            style={{
              borderRadius: width * 0.1,
              marginRight: width * 0.01,
              marginLeft: width * 0.01,
              marginBottom: height * 0.02,
              borderColor: secondaryColor,
              borderWidth: 1,
              width: width * 0.5,
              alignSelf: 'center',
            }
            }
            icon="toggle-switch-outline" onPress={() => setUnit(unit === 'metric' ? 'imperial' : 'metric')}>
            {unit === 'metric' ? 'Switch to Imperial' : 'Switch to Metric'}</Button>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Weight ({unit === 'imperial' ? 'lb' : 'kg'}):</Text>
          <TextInput
            keyboardType="numeric"
            style={styles.input}

            value={weight}
            onChangeText={(text) => setWeight(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Height ({unit === 'imperial' ? 'inch' : 'cm'}):</Text>
          <TextInput
            keyboardType="numeric"
            style={styles.input}
            value={height}
            onChangeText={(text) => setHeight(text)}
          />
        </View>

        <Button
          buttonColor={secondaryColor}
          style={{
            borderRadius: width * 0.1,
            marginRight: width * 0.04,
            marginLeft: width * 0.04,
            marginBottom: height * 0.02,
            borderColor: secondaryColor,
            borderWidth: 1,
            width: width * 0.5,
            alignSelf: 'center',
          }}
          icon="calculator" mode="contained" onPress={calculateBMI} >
          Calculate BMI
        </Button>

        {result ? (
          <View>
            <Text style={styles.resultText3}>Your BMI is</Text>
        <Text style={styles.resultText}>{result}</Text>
        <Text style={styles.resultText1}>
          {
            result < 18.5 ? 'Underweight !' : result < 25 ? 'Healthy Weight' : result < 30 ? 'Overweight !' : 'Obesity !!'
          }
          </Text>
        </View>
        )
          : <Text style={styles.resultText}>0.0</Text>
        }

        <View style={styles.buttonContainer}>
          <Button
            icon="eraser"
            mode="outlined"
            textColor={secondaryColor}
            style={{
              borderRadius: width * 0.1,
              marginRight: width * 0.01,
              marginLeft: width * 0.01,
              marginBottom: height * 0.02,
              borderColor: secondaryColor,
              borderWidth: 1,
              width: width * 0.5,
              alignSelf: 'center',
            }
            }
            onPress={clearFields} >Clear</Button>
        </View>
      </View>
    </ScrollView>
  );
}

export default BMI

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  inputContainer: {
    width: '100%',
    margin: width * 0.06,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    margin: width * 0.06,
    alignItems: 'center',
  },
  resultText: {
    fontSize: width * 0.1,
    textAlign: 'center',
  },
  resultText1: {
    fontSize: width * 0.08,
    marginTop: width * 0.04,
    textAlign: 'center',
  },
  resultText3: {
    fontSize: width * 0.04,
    marginTop: width * 0.04,
    textAlign: 'center',
  },

})