import React, { Component, PropTypes } from 'react'

import { taUnqueueStudent } from './../sockets/emitToSocket'

import BeardedMan from './../../images/BeardedMan.png'
import styles from './../../style/CurrentQuestion.less'

class CurrentQuestion extends Component {

  static propTypes = {
    // See shared folder for description of questionInfo and userInfo
    questionInfo: PropTypes.object,
    // NOTE: if user is TA, questionInfo.userInfo and userInfo
    // will be the student and ta information respectively
    userInfo: PropTypes.object,
    isUserTAForSelectedClass: PropTypes.bool,
    isStudentInactiveState: PropTypes.bool,
    selectedClassId: PropTypes.number,
  }

  taRemoveStudentFromQueue = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (this.props.selectedClassId == null) return

    taUnqueueStudent({
      classId: this.props.selectedClassId,
      // userInfo here is the TA's information
      userInfo: this.props.userInfo
    })
  }

  renderStudentQuestionView() {
    return (
      <div className={styles.questionContainer}>
        <span className={styles.questionHeader}>Your Question</span>
        <span className={styles.questionText}>{this.props.questionInfo.question}</span>
      </div>
    )
  }

  renderStudentEmptyState() {
    return (
      <div className={styles.emptyContainer}>
        <img className={styles.beardedMan} src={BeardedMan}></img>
        <span className={styles.emptyText}>
          Click on the + button to add a question to the queue!
        </span>
      </div>
    )
  }

  renderTAQuestionView() {
    const { questionInfo: { userInfo: { firstName, lastName }, location, question } } = this.props
    return (
      <div className={styles.questionContainer}>
        <span className={styles.TAQuestionHeader}>{`${firstName} ${lastName}'s location`}</span>
        <span className={styles.questionText}>{location}</span>
        <span className={styles.TAQuestionHeader}>{`${firstName} ${lastName}'s question`}</span>
        <span className={styles.questionText}>{question}</span>
        <div className={styles.TAHelpButton} onClick={this.taRemoveStudentFromQueue}>
          Help this student
        </div>
      </div>
    )
  }

  renderTAEmptyState() {
    return (
      <div className={styles.emptyContainer}>
        <img className={styles.beardedMan} src={BeardedMan}></img>
        <span className={styles.emptyText}>No students are currently in the queue.</span>
      </div>
    )
  }

  renderStudentView() {
    return this.props.questionInfo
    ? this.renderStudentQuestionView()
    : this.renderStudentEmptyState()
  }

  renderTAView() {
    return this.props.questionInfo
    ? this.renderTAQuestionView()
    : this.renderTAEmptyState()
  }

  // TODO: maybe calendar here instead
  renderStudentInactiveState() {
    return (
      <div className={styles.emptyContainer}>
        <img className={styles.beardedMan} src={BeardedMan}></img>
        <span className={styles.emptyText}>This class is closed.</span>
      </div>
    )
  }

  render() {
    if (this.props.isStudentInactiveState) {
      return this.renderStudentInactiveState()
    }

    return this.props.isUserTAForSelectedClass
    ? this.renderTAView()
    : this.renderStudentView()
  }
}

export default CurrentQuestion
