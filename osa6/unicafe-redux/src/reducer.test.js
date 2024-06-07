import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('adding feedback', () => {
    const goodAction = {
      type: 'GOOD'
    }
    const okAction = {
      type: 'OK'
    }
    const badAction = {
      type: 'BAD'
    }
    let state = initialState

    deepFreeze(state)
    state = counterReducer(state, goodAction)
    state = counterReducer(state, okAction)
    state = counterReducer(state, badAction)
    state = counterReducer(state, goodAction)
    state = counterReducer(state, goodAction)
    state = counterReducer(state, badAction)
    state = counterReducer(state, okAction)
    state = counterReducer(state, goodAction)
    state = counterReducer(state, okAction)
    state = counterReducer(state, okAction)
    state = counterReducer(state, goodAction)

    expect(state).toEqual({
      good: 5,
      ok: 4,
      bad: 2
    })
  })

  test('reseting feedback', () => {
    const state = {
      good: 5,
      ok: 4,
      bad: 2
    }
    const action = {
      type: 'ZERO'
    }

    deepFreeze(state)
    const newState = counterReducer(state, action)

    expect(newState).toEqual(initialState)
  })
})