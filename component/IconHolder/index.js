import React from "react";
import { StyleSheet, TouchableHighlight } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

import colors from "../../res/color";
import size from "../../res/size";

const IconHolder = props => {
  const { name, onPress, color, size } = props;
  return (
    <TouchableHighlight
      activeOpacity={0.1}
      underlayColor={colors.skyBlue50}
      style={{ ...style.container, ...props.style }}
      onPress={onPress}
    >
      <Icon name={name} size={size} color={color} />
    </TouchableHighlight>
  );
};

export default IconHolder;

const style = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.skyBlue,
    borderRadius: 30,
    height: 50,
    width: 50
  }
});
