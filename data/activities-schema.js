import Realm from "realm";

const Activity = {
  name: "Activity",
  primaryKey: "id",
  properties: {
    name: "string",
    type: "string",
    goalTime: "float",
    id: { type: "int", indexed: true }
  }
};

const hiddenRowState = {
  name: "HiddenRowState",
  properties: {
    HiddenRow: "bool?[]"
  }
};

const ActivityLog = {
  name: "ActivityLog",
  primaryKey: "id",
  properties: {
    id: { type: "int", indexed: true },
    name: "string",
    type: "string",
    startTime: "date",
    endTime: "date",
    duration: "int"
  }
};

const CalendarActivity = {
  name: "CalendarActivity",
  primaryKey: "id",
  properties: {
    id: { type: "int", indexed: true },
    name: "string",
    startTime: "date",
    endTime: "date"
  }
};

const BookList = {
  name: "BookList",
  primaryKey: "id",
  properties: {
    id: { type: "int", indexed: true },
    name: "string",
    completed: "int",
    totalPage: "int"
  }
};

const ImportantPoints = {
  name: "ImportantPoints",
  primaryKey: "id",
  properties: {
    id: { type: "int", indexed: true },
    bookId: "int",
    point: "string"
  }
};

const Values = {
  name: "Values",
  properties: {
    id: { type: "int", indexed: true },
    value: "string"
  }
};

export default new Realm({
  deleteRealmIfMigrationNeeded: true,
  schema: [
    Activity,
    hiddenRowState,
    CalendarActivity,
    ActivityLog,
    BookList,
    ImportantPoints,
    Values
  ]
});
