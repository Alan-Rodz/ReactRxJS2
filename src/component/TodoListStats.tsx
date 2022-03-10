import { useTodosStats } from '../Todo';

// ******************************************************************************************************************
export const TodoListStats = () => {
  const {
    nTotal,
    nCompleted,
    nUncompleted,
    percentCompleted
  } = useTodosStats();

  return (
    <ul>
      <li>Total items: {nTotal}</li>
      <li>Items completed: {nCompleted}</li>
      <li>Items not completed: {nUncompleted}</li>
      <li>Percent completed: {percentCompleted}</li>
    </ul>
  );
}