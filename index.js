import React from "react";
import { AppRegistry, SafeAreaView, View, StyleSheet } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";

import HomeScreen from "./pages/homeScreen";
import MenuScreen from "./pages/menuScreen";
import MainNavigator from "./pages/appNavScreen";

const slides = [
  {
    key: "Menu",
    renderScreen: <MenuScreen />
  },
  {
    key: "Home",
    renderScreen: <HomeScreen />
  },
  {
    key: "AppNav",
    renderScreen: <MainNavigator />
  }
];

export default class App extends React.Component {
  _renderItem = ({ item }) => {
    return (
      <View style={styles.slide} key={item.key}>
        {item.renderScreen}
      </View>
    );
  };

  componentDidMount() {
    setTimeout(() => this.AppIntroSlider.goToSlide(1), 0);
  }

  render() {
    return (
      <AppIntroSlider
        renderItem={this._renderItem}
        slides={slides}
        showNextButton={false}
        showDoneButton={false}
        ref={ref => (this.AppIntroSlider = ref)}
      />
    );
  }
}

AppRegistry.registerComponent("Sweet", () => App);

const styles = StyleSheet.create({
  slide: { flex: 1 },
  title: {},
  text: {}
});
