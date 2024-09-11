import React, {useState} from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';
import { COLORS } from '../../Theme/Colors';

export default function SwitchMain() {
  const [isEnabled1, setIsEnabled1] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);

  const toggleSwitch1 = () => setIsEnabled1(previousState => !previousState);
  const toggleSwitch2 = () => setIsEnabled2(previousState => !previousState);

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{false: '#767577', true: COLORS.blue}}
        thumbColor={isEnabled1 ? '#f5dd4b' : '#f4f3f4'}
        onValueChange={toggleSwitch1}
        value={isEnabled1}
      />
      <View style={{marginTop: 5}}>
        <Switch
          trackColor={{false: '#767577', true: COLORS.blue}}
          thumbColor={isEnabled2 ? '#f5dd4b' : '#f4f3f4'}
          onValueChange={toggleSwitch2}
          value={isEnabled2}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  switchContainer: {},
  label: {
    marginBottom: 10,
    fontSize: 16,
  },
});
