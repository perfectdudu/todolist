import api from '../api/index'
import util from '../api/util'
import config from '../api/config'
import store from './store'

export const toggleActive = makeAction('TOGGLE_ACTIVE')
export const toggleMask = makeAction('TOGGLE_MASK')
export const updateActiveTask = makeAction('SET_ACTIVE_TASK')
export const showError = makeAction('SHOW_ERROR')

function makeAction (type) {
  return ({ dispatch }, ...args) => dispatch(type, ...args)
}

export const getTasksData = ({dispatch}) => {
  api.getData(config.tasksUrl, (tasks) => {
    dispatch('RECIEVE_TASKS', tasks)
  })
}
export const getUserData = ({dispatch}) => {
  api.getData(config.userDataUrl, (data) => {
    var user = util.checkoutData(data)
    dispatch('RECIEVE_USER', user)
  })
}
export const addTask = ({dispatch}, taskType) => {
  api.sendData(config.addTaskUrl, {
    task_type: taskType
  }, (id) => {
    var id = util.checkoutData(id)
    dispatch('ADD_TASK', id.data, taskType)
    dispatch('TOGGLE_MASK')
  }, () => {
    dispatch('SHOW_ERROR', '网络错误')
  })
}
export const editTaskTitle = ({dispatch}, value) => {
  api.sendData(config.updateTaskUrl, {
    id: store.state.activeTask.id,
    task_name: value
  }, (response) => {
    var data = util.checkoutData(response)
    if(data.data.success) {
      dispatch('EDIT_TASK_TITLE', value)
    } else {
      dispatch('SHOW_ERROR', data.data.msg)
    }
  }, () => {
    dispatch('SHOW_ERROR', '网络错误')
  })
}
export const editTaskContent = ({dispatch}, value) => {
  api.sendData(config.updateTaskUrl, {
    id: store.state.activeTask.id,
    task_content: value
  }, (response) => {
    var data = util.checkoutData(response)
    if(data.data.success) {
      dispatch('EDIT_TASK_CONTENT', value)
    } else {
      dispatch('SHOW_ERROR', data.data.msg)
    }
  }, () => {
    dispatch('SHOW_ERROR', '网络错误')
  })
}
export const deleteTask = ({dispatch}) => {
  api.sendData(config.deleteTaskUrl, {
    id: store.state.activeTask.id
  }, (response) => {
    var data = util.checkoutData(response)
    if(data.data.success) {
      dispatch('DELETE_TASK')
    } else {
      dispatch('SHOW_ERROR', data.data.msg)
    }
  }, () => {
    dispatch('SHOW_ERROR', '网络错误')
  })
}
export const toggleTask = ({dispatch}) => {
  api.sendData(config.toggleTaskUrl, {
    id: store.state.activeTask.id
  }, (response) => {
    var data = util.checkoutData(response)
    if(data.data.success) {
      dispatch('TOGGLE_TASK', store.state.activeTask)
    } else {
      dispatch('SHOW_ERROR', data.data.msg)
    }
  }, () => {
    dispatch('SHOW_ERROR', '网络错误')
  })
}
export const addTime = ({dispatch}, time) => {
  api.sendData(config.updateTaskUrl, {
    id: store.state.activeTask.id,
    end_time: time
  }, (response) => {
    var data = util.checkoutData(response)
    if(data.data.success) {
      dispatch('UPDATE_TIME', time)
    } else {
      dispatch('SHOW_ERROR', data.data.msg)
    }
  }, () => {
    dispatch('SHOW_ERROR', '网络错误')
  })
}

export const changePlace = ({dispatch}, place) => {
  api.sendData(config.updateTaskUrl, {
    id: store.state.activeTask.id,
    task_place: place
  }, (response) => {
    var data = util.checkoutData(response)
    if(!data.data.success) {
      dispatch('SHOW_ERROR', data.data.msg)
    }
  }, () => {
    dispatch('SHOW_ERROR', '网络错误')
  })
}
