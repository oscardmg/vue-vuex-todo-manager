import axios from 'axios';

const state = {
  todos: []
};

const getters = {
  allTodos: state => state.todos
};

const actions = {
  // =========================
  //  fetchTodos
  // =========================
  async fetchTodos({ commit }) {
    const { data } = await axios.get(
      'https://jsonplaceholder.typicode.com/todos'
    );
    commit('setTodos', data);
  },
  // =========================
  //  addTodo
  // =========================
  async addTodo({ commit }, title) {
    const { data } = await axios.post('https://jsonplaceholder.typicode.com/todos',
      {
        title,
        completed: false
      }
    );
    commit('newTodo', data);
  }
};

const mutations = {
  setTodos: (state, todos) => (state.todos = todos),
  newTodo: (state, todo) => state.todos.unshift(todo)
};

export default {
  state,
  getters,
  actions,
  mutations
};

