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
  },
  // =========================
  //  deleteTodo
  // =========================
  async deleteTodo({ commit }, id) {
    await axios.delete('https://jsonplaceholder.typicode.com/todos/' + id);

    commit('removeTodo', id);
  },
  // =========================
  //  filterTodos
  // =========================
  async filterTodos({ commit }, e) {
    // Get selected number
    const limit = parseInt(e.target.options[e.target.options.selectedIndex].innerText);

    const { data } = await axios.get(
      'https://jsonplaceholder.typicode.com/todos?_limit=' + limit
    );
    commit('setTodos', data);
  },
  // =========================
  //  updateTodo
  // =========================
  async updateTodo({ commit }, updTodo) {
    const { data } = await axios.put(
      `https://jsonplaceholder.typicode.com/todos/${updTodo.id}`,
      updTodo
    );
    commit('updateTodo', data);
  }
};

const mutations = {
  setTodos: (state, todos) => (state.todos = todos),
  newTodo: (state, todo) => state.todos.unshift(todo),
  removeTodo: (state, id) =>
    state.todos = state.todos.filter(todo => todo.id !== id),
  updateTodo:(state, updTodo) => {
    const index = state.todos.findIndex(todo => todo.id === updTodo.id);
    if(index !== -1) {
      state.todos.splice(index, 1, updTodo);
    }
  }

};

export default {
  state,
  getters,
  actions,
  mutations
};

