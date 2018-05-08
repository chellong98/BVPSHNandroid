
import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
    TouchableHighlight,
} from 'react-native';



const Left = (onPress) => (
  <TouchableHighlight onPress={onPress}>
    <Text>back</Text>
  </TouchableHighlight>
);

export default {left:Left};
