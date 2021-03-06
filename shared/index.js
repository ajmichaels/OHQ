// This file contains constants and types shared between the frontend and backend
// TODO: probably best to have a class for each kind of data that a socket sends

// checks if an object is an instance of CandidateClass via duck typing
exports.matches = function(object, CandidateClass) {
  const keys = Object.keys(new CandidateClass())
  if (keys.length !== Object.keys(object).length) {
    return false
  }
  for (const key of keys) {
    if (!object.hasOwnProperty(key)) {
      return false
    }
  }
  return true
}

/**
 * Represents a person.
 */
exports.UserInfo = class UserInfo {
  /**
   * @param {number} id - a unique id associated with the person
   * @param {String} firstName - the person's first name
   * @param {String} lastName - the person's last name
   */
  constructor(id, firstName, lastName) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
  }
}

/**
 * Stores information about a question in the queue
 */
exports.QuestionInfo = class QuestionInfo {
  /**
   * @param {UserInfo} userInfo - info of the person associated with the question.
   * @param {String} location - the location of where the asker is sitting
   * @param {String} question - the question being asked
   */
  constructor(userInfo, location, question) {
    this.userInfo = userInfo
    this.location = location
    this.question = question
  }
}

// TODO: also update the log for events like class creation,
// broadcast updates, class closing, etc.
// Will need to refactor into a one-of/union type.
exports.TALogInfo = class TALogInfo {
  /**
   * @param {UserInfo} TAInfo - info of the TA who updated the actoin
   * @param {QuestionInfo} questionInfo - the data about the student's question.
   * @param {Date} time - the time that the TA helped the student
   */
  constructor(TAInfo, questionInfo, time) {
    this.TAInfo = TAInfo
    this.questionInfo = questionInfo
    this.time = time
  }
}

/**
 * The information needed to represent a full class
 * TODO: taactivitylog
 */
exports.ClassInfo = class ClassInfo {
  /**
   * @param {QuestionInfo[]} [queue=[]] - a queue representing the students in office hours
   * @param {Number[]} TAs - a list of the ids of the TAs in the course
   * @param {Boolean} [isActive=false] - whether or not the class is active
   * @param {Number} id - the unique id of the course
   * @param {String} name - the name of the course
   * @param {String[]} [locations=[]] - a list of locations where the class is being held
   * @param {String} [broadcast=''] - an optional announcement when class is active
   */
  constructor(id, name, TAs, queue = [], isActive = false, locations = [], broadcast = '') {
    this.queue = queue
    this.TAs = TAs
    this.isActive = isActive
    this.id = id
    this.name = name
    this.locations = locations
    this.broadcast = broadcast
  }
}

exports.SocketActions = {
  // These are actions that use websockets.  They are grouped in pairs;
  // actions that emit to the server have a corresponding return action.
  // Note that reducers generally only need to handle the return action.
  // Singleton actions mean that the server sent in a way that is
  // not coupled to a corresponding action.  E.g. on connection the user
  // receives data for the classes they're subcribed to.

  // used for the user to update class status.
  UPDATE_CLASS: 'UPDATE_CLASS',
  CLASS_UPDATED: 'CLASS_UPDATED',

  // used for students to join the class queue
  JOIN_CLASS_QUEUE: 'JOIN_CLASS_QUEUE',
  CLASS_QUEUE_JOINED: 'CLASS_QUEUE_JOINED',

  // used to update user info, and to send the initial info to the user.
  USER_INFO_UPDATED: 'USER_INFO_UPDATED',

  // used to send all the relevant classes when a user first connects
  ALL_CLASS_INFO: 'ALL_CLASS_INFO',

  // used to activate a class
  ACTIVATE_CLASS: 'ACTIVATE_CLASS',
  CLASS_ACTIVATED: 'CLASS_ACTIVATED',

  // used to deactivate a class.
  DEACTIVATE_CLASS: 'DEACTIVATE_CLASS',
  CLASS_DEACTIVATED: 'CLASS_DEACTIVATED',

  // used for TAs to remove a student from the queue
  TA_UNQUEUE_STUDENT: 'TA_UNQUEUE_STUDENT',
  STUDENT_UNQUEUED_BY_TA: 'STUDENT_UNQUEUED_BY_TA',

  // used to update a class' broadcast
  UPDATE_BROADCAST: 'UPDATE_BROADCAST',
  BROADCAST_UPDATED: 'BROADCAST_UPDATED',

  // used to keep up the TA activity log
  TA_ACTIVITY_LOG_UPDATED: 'TA_ACTIVITY_LOG_UPDATED'
}
