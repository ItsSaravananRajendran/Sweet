import realm from "../../data/activities-schema";
import { ACTIVITY_TYPES } from "../../data/activity-types";

function getAggregatedActivityData(startTime, endTime) {
  const activitiesLog = realm
    .objects("ActivityLog")
    .filtered("startTime >= $0 AND endTime <= $1", startTime, endTime);
  let data = ACTIVITY_TYPES.map(item => ({ key: item, label: item }));
  for (const ind in data) {
    data[ind].value =
      activitiesLog.filtered("type=$0", data[ind].key).sum("duration") / 60;
  }
  return data;
}

function getTypeActivityData(startTime, endTime, type) {
  const activitiesLog = realm
    .objects("ActivityLog")
    .filtered(
      "startTime >= $0 AND endTime <= $1 AND type=$2",
      startTime,
      endTime,
      type
    );
  let data = {};
  let result = [];
  for (const { name, duration } of activitiesLog) {
    if (name in data) {
      data[name].value += duration;
    } else {
      data[name] = {
        key: name,
        label: name,
        value: duration,
        svg: {
          fill: "#" + Math.floor(Math.random() * 16777215).toString(16)
        }
      };
    }
  }
  for (const key in data) {
    result.push(data[key]);
  }
  return result;
}

export { getAggregatedActivityData, getTypeActivityData };
