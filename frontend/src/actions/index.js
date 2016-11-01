import axios from 'axios'

import Promise from 'bluebird'
import { browserHistory } from 'react-router'

import { AUTH_USER, AUTH_ERROR } from './ActionTypes'
import { ROOT_URL } from './../../constants'

const rootUrl = process.env.ROOT_URL || ROOT_URL

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error,
  }
}

export function signinUser({email, password}) {

  //reduxThunk allows us to return a function instead of a raw object
  //allows us to decide when to dispatch our object, and perform logic prior to submit
  //also allows us to dispatch many different actions!
  return function(dispatch) {

    //submit email/pass to server (cast es6 promise to bluebird promise)
    Promise.resolve(axios.post(`${rootUrl}/signin`, {email, password}))
    .then(res => {
      //if request is good, update state to indicate user is auth'd
      dispatch({ type: AUTH_USER })

      //save JWT token in LocalStorage (available on window-scope)
      localStorage.setItem('token', res.data.token)

      //re-direct user from signin route to feature route
      browserHistory.push('/feature')
    })
    .catch(err => {
      //if request is bad
      //show the user an error
      dispatch(authError('Bad login info' + err))
    })
  }
}
