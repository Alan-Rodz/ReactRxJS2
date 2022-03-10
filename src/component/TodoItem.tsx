import { useCurrentFilter } from '../Filter';
import { useTodo, onEditTodo, onToggleTodo, onDeleteTodo } from '../Todo';

// ******************************************************************************************************************
export const TodoItem: React.FC<{ id: number }> = ({ id }) => {
  const item = useTodo(id);
  const currentFilter = useCurrentFilter();

  return !(
    currentFilter === 'all' ||
    (currentFilter === 'done' && item.done) ||
    (currentFilter === 'pending' && !item.done)
  ) ? null : (
    <div>
      <input
        type='text'
        value={item.text}
        onChange={({ target }) => {
          onEditTodo({ id: item.id, text: target.value });
        }}
      />
      <input
        type='checkbox'
        checked={item.done}
        onChange={() => {
          onToggleTodo(item.id);
        }}
      />
      <button
        onClick={() => {
          onDeleteTodo(item.id);
        }}
      >
        X
      </button>
    </div>
  );
};