import { useTodos } from '../Todo';
import { TodoItem } from './TodoItem';
import { TodoItemCreator } from './TodoItemCreator';
import { TodoListFilters } from './TodoListFilters';
import { TodoListStats } from './TodoListStats';


// ******************************************************************************************************************
export const TodoList = () => {
  const todoList = useTodos();

  return (
    <>
      <TodoListStats />
      <TodoListFilters />
      <TodoItemCreator />
      {todoList.map((id) => (
        <TodoItem key={id} id={id} />
      ))}
    </>
  );
}