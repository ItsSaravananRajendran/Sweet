import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  NativeModules
} from "react-native";

import colors from "../../res/color";
import size from "../../res/size";

const AppLauncher = ({ name, label, onPress }) => {
  return (
    <TouchableHighlight
      onPress={() => onPress(name)}
      key={name}
      style={style.list}
      underlayColor={colors.bg}
    >
      <Text style={style.textStyleBold}>{label}</Text>
    </TouchableHighlight>
  );
};

class MenuScreen extends Component {
  constructor(props) {
    super(props);
    this.apps = [
      { label: "Chrome", name: "com.android.chrome" },
      { label: "Clock", name: "com.google.android.deskclock" },
      { label: "Gmail", name: "com.google.android.gm" },
      { label: "Music", name: "com.google.android.music" },
      { label: "Notes", name: "com.google.android.keep" },
      { label: "Search", name: "com.google.android.googlequicksearchbox" }
    ];
  }

  handleOnPress = appName => {
    NativeModules.InstalledApps.launchApplication(appName);
  };

  render() {
    const { apps, handleOnPress } = this;
    return (
      <View style={style.mainContainer}>
        {apps.map(item => (
          <AppLauncher {...item} onPress={handleOnPress} />
        ))}
      </View>
    );
  }
}

export default MenuScreen;

const style = StyleSheet.create({
  mainContainer: {
    paddingTop: 180,
    width: 480,
    height: 1000,
    backgroundColor: colors.bg
  },
  list: {
    marginTop: 10,
    width: 300,
    paddingTop: 10,
    paddingLeft: 30
  },
  textStyleBold: {
    fontSize: size.eLarge,
    fontFamily: "Roboto",
    fontWeight: "bold",
    color: colors.skyBlue
  }
});
