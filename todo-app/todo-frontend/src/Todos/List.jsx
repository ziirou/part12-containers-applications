import PropTypes from 'prop-types'

import Todo from './Todo'

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  return (
    <>
      {todos.map(todo => (
        <Todo key={todo.id} todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} />
      )).reduce((acc, cur, idx) => 
        idx === 0
          ? [cur]
          : [...acc, <hr key={`hr-${idx}`} />, cur]
      , [])}
    </>
  )
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  completeTodo: PropTypes.func.isRequired,
}

export default TodoList
