<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="submit">
      <input v-model="newTodo">
      <button @click="addTodo">提交</button>
    </div>
    <div v-for="i of todos" :key="i.id" class="todo-list">
      <li>
        <h1>{{i.text}}</h1>
      </li>
      <span>
        <button @click="delTodo(i)" class="delete">删除</button>
      </span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'HelloWorld',
  data () {
    return {
      message: 'hello!',
      todos: [
        {id: 1,
          text: 'qwe'},
        {id: 2,
          text: 'sdfs'}

      ],
      newTodo: ''
    };
  },
  props: {
    msg: String
  },
  computed: {

  },
  created () {
    this.message = 'bye!';
  },
  methods: {
    addTodo() {
      this.todos.push(
        {id: Math.random(), text: this.newTodo}
      ),
      this.newTodo = '';
    },
    delTodo(todo) {
      let index = this.todos.indexOf(todo);
      this.todos.splice(index, 1);
    }

  }
};
</script>
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
</style>
