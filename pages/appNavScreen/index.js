import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableHighlight } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import colors from "../../res/color";
import size from "../../res/size";
import IconHolder from "../../component/IconHolder";

import AddActivityScreen from "../addActivityScreen";
import ActivityPieScreen from "../activityPie";

const Row = props => {
  const { row, navigation } = props;
  return (
    <View style={style.rowContainer}>
      {row.map(data => (
        <IconHolder
          key={data.iconName}
          style={style.iconHolder}
          onPress={() => navigation.navigate(data.screen)}
          name={data.iconName}
          size={size.medium}
          color={colors.white}
        />
      ))}
    </View>
  );
};

const Menu = props => {
  const { data, cols, navigation } = props;
  const rowData = [];
  for (let I = 0; I < data.length; I++) {
    let start = I * cols;
    rowData.push(data.slice(start, start + cols));
  }
  return (
    <View style={style.padding}>
      {rowData.map((row, idx) => (
        <Row row={row} key={idx} navigation={navigation} />
      ))}
    </View>
  );
};

class AppNavScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.perRow = 3;
    this.appData = [
      { screen: "AddActivityScreen", iconName: "edit" },
      { screen: "ActivityPieScreen", iconName: "plus" },
      { screen: "AddActivityScreen", iconName: "edit" },
      { screen: "AddActivityScreen", iconName: "edit" },
      { screen: "AddActivityScreen", iconName: "edit" }
    ];
  }

  render() {
    return (
      <View style={style.mainContainer}>
        <Menu
          data={this.appData}
          cols={this.perRow}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

const MainNavigator = createAppContainer(
  createStackNavigator({
    AppNavScreen: { screen: AppNavScreen },
    AddActivityScreen: { screen: AddActivityScreen },
    ActivityPieScreen: { screen: ActivityPieScreen }
  })
);

export default MainNavigator;

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: "center"
  },
  padding: {
    marginTop: 80
  },
  rowContainer: {
    marginTop: 50,
    flexDirection: "row",
    width: 400
  },
  iconHolder: {
    width: 60,
    height: 60,
    marginLeft: 55,
    backgroundColor: colors.skyBlue,
    justifyContent: "center",
    alignItems: "center"
  }
});
