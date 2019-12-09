import React, { Component } from "react";
import { View, StyleSheet, Text, NativeModules } from "react-native";

import SearchableDropDown from "../../component/searchable-dropdown/searchable-dropdownbox.component";
import dataManagerInstance from "../../data/dataManager";
import IconHolder from "../../component/IconHolder";
import colors from "../../res/color";
import size from "../../res/size";

class HomeScreen extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    const currentActivity = dataManagerInstance.getCurrentActivity() || "";
    const dateText = this.timeToText();
    this.state = {
      currentActivity,
      dateText
    };
  }

  handleOnPress = appName => {
    NativeModules.InstalledApps.launchApplication(appName);
  };

  componentDidMount() {
    this.allApps = JSON.parse(NativeModules.InstalledApps.getApps);
    this._isMounted = true;
    setInterval(() => {
      if (this._isMounted) {
        const dateText = this.timeToText();
        this.setState({ dateText });
      }
    }, 60 * 1000);
  }

  componentWillUnmount() {
    clearInterval();
    this._isMounted = false;
  }

  onActivityChange = activity => {
    if (activity.name !== this.state.currentActivity.name) {
      dataManagerInstance.updateCurrentActivity(activity);
      this.setState({ currentActivity: { ...activity } });
    }
  };

  extractName = obj => obj.name;

  timeToText = () => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    const Month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    const time = new Date();

    let result = days[time.getDay()] + ",";
    result += " " + String(time.getDate()).padStart(2, "0");
    result += " " + Month[time.getMonth()] + " |";
    result += " " + String(time.getHours()).padStart(2, "0");
    result += ":" + String(time.getMinutes()).padStart(2, "0");
    //result += ":" + String(time.getSeconds()).padStart(2, "0");
    return result;
  };

  render() {
    const activityList = dataManagerInstance.getActivityList();
    const { onActivityChange, extractName, handleOnPress } = this;
    const { dateText, currentActivity } = this.state;

    return (
      <View style={style.mainContainer}>
        <View style={style.boldContainer}>
          <Text style={style.textStyleBold}> {dateText} </Text>
        </View>
        <SearchableDropDown
          data={activityList}
          updateValue={onActivityChange}
          extractValue={extractName}
          style={style.displayContainer}
        >
          <Text style={style.textStyle}>
            {currentActivity.name || "Select an activity"}
          </Text>
        </SearchableDropDown>
        <View style={style.bottomBar}>
          <IconHolder
            style={style.flipX}
            onPress={() => handleOnPress("com.google.android.dialer")}
            name="phone"
            size={size.medium}
            color={colors.white}
          />
          <IconHolder
            onPress={() => handleOnPress("com.hmdglobal.camera2")}
            name="camera"
            size={size.medium}
            color={colors.white}
          />
        </View>
      </View>
    );
  }
}

export default HomeScreen;

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center"
  },
  boldContainer: {
    marginTop: 60,
    alignItems: "center"
  },
  textStyle: {
    fontSize: 20,
    color: colors.white,
    fontWeight: "bold"
  },
  textStyleBold: {
    fontSize: 20,
    fontFamily: "Roboto",
    fontWeight: "bold",
    color: colors.white
  },
  flipX: {
    transform: [{ scaleX: -1 }]
  },
  bottomBar: {
    flexDirection: "row",
    width: 380,
    marginTop: 600,
    justifyContent: "space-between"
  },
  displayContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    flex: -1,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: colors.skyBlue,
    borderRadius: 7
  }
});
