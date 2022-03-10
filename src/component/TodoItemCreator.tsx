import React from 'react';

import { onNewTodo } from '../Todo';

// ******************************************************************************************************************
export const TodoItemCreator = () => {
  const [inputValue, setInputValue] = React.useState('');

  const addItem = () => {
    onNewTodo(inputValue);
    setInputValue('');
  };

  const onChange = ({ target }: any) => {
    setInputValue(target.value);
  };

  return (
    <div>
      <input type='text' value={inputValue} onChange={onChange} />
      <button onClick={addItem}>Add</button>
    </div>
  );
}