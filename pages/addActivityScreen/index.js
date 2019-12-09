import React, { Component } from "react";
import { StyleSheet, View, ToastAndroid } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Input, Slider, Button } from "react-native-elements";
import RadioForm from "react-native-simple-radio-button";

import WrapLabel from "../../component/form/wrap-label.component";
import { capitalizeFirstLetter } from "../../utils/util.scripts";

import { ACTIVITY_TYPES } from "../../data/activity-types";
import realm from "../../data/activities-schema";
import colors from "../../res/color";

class AddActivityScreen extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      type: "Q1",
      goalTime: 0,
      errMessage: ""
    };
  }

  onNameChange = name => {
    this.setState({ name: name });
  };

  onTypeChange = type => {
    this.setState({ type: type });
  };

  onGoalTimeChange = time => {
    this.setState({ goalTime: time });
  };

  onSubmit = () => {
    let activity = realm
      .objects("Activity")
      .filtered(`name = "${capitalizeFirstLetter(this.state.name)}"`);

    const id = new Date().getTime();
    if (activity.length !== 0) {
      this.setState({ errMessage: "This activity already exists!!!" });
    } else {
      realm.write(() => {
        realm.create("Activity", {
          name: this.state.name,
          id,
          type: this.state.type,
          goalTime: this.state.goalTime
        });
      });
      this.setState({
        name: "",
        goalTime: 0,
        errMessage: ""
      });
      ToastAndroid.showWithGravity(
        "Activity has been added successfully",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
  };

  render() {
    let data = ACTIVITY_TYPES.map(item => ({ label: item, value: item }));
    return (
      <View style={style.mainContainer}>
        <WrapLabel label="Activity Name">
          <Input
            placeholder="Enter here"
            value={this.state.name}
            leftIcon={<Icon name="running" size={20} color="grey" />}
            onChangeText={this.onNameChange}
            inputContainerStyle={style.textInput}
            errorMessage={this.state.errMessage}
            shake={this.state.errMessage.length !== 0}
            autoFocus={true}
          />
        </WrapLabel>
        <WrapLabel label="Activity Type">
          <RadioForm
            radio_props={data}
            onPress={this.onTypeChange}
            formHorizontal={true}
            labelHorizontal={false}
            buttonColor={"#e0eeff"}
            selectedButtonColor={"#e0eeff"}
          />
        </WrapLabel>
        <WrapLabel
          label={`Goal Time per Week ( ${this.state.goalTime} Hours )`}
        >
          <Slider
            value={this.state.goalTime}
            onValueChange={this.onGoalTimeChange}
            minimumValue={0}
            maximumValue={50}
            step={0.5}
            thumbTintColor="#e0eeff"
            style={style.slider}
          />
        </WrapLabel>
        <View style={style.buttonView}>
          <Button title="Submit" onPress={this.onSubmit} />
        </View>
      </View>
    );
  }
}

export default AddActivityScreen;

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.grey,
    paddingTop: 80
  },
  textInput: {
    borderRadius: 20,
    borderColor: "#3AAC68",
    backgroundColor: "#e0eeff"
  },
  slider: {
    marginLeft: 10,
    marginRight: 20
  },
  textStyle: {
    color: "grey",
    fontSize: 18,
    textAlign: "left"
  },
  buttonView: {
    marginTop: 20,
    alignItems: "center"
  }
});
