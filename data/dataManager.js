import realm from "./activities-schema";

class DataManager {
  getCurrentActivity() {
    const activities = realm.objects("ActivityLog");
    return activities[activities.length - 1];
  }

  findDuration(start) {
    return Math.floor((new Date() - start) / 60000);
  }

  updateCurrentActivity(currentActivity) {
    if (currentActivity !== "") {
      const completedActivity = this.getCurrentActivity();
      realm.write(() => {
        completedActivity.endTime = new Date();
        completedActivity.duration = findDuration(completedActivity.startTime);
      });
    }
    const activity = currentActivity;
    activity.startTime = new Date();
    activity.id = new Date();
    activity.endTime = null;
    activity.duration = null;
    realm.write(() => {
      realm.create("CurrentActivity", activity);
    });
  }

  getActivityList() {
    return realm.objects("Activity").sorted("name");
  }
}

dataManagerInstance = new DataManager();

export default dataManagerInstance;
