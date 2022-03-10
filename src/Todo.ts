import { map, takeWhile, scan } from 'rxjs/operators';
import { bind, shareLatest } from '@react-rxjs/core';
import { createSignal, partitionByKey, combineKeys, mergeWithKey } from '@react-rxjs/utils';

// Capture events triggered by the user
export const [newTodo$, onNewTodo] = createSignal<string>();
export const [editTodo$, onEditTodo] = createSignal<{ id: number; text: string }>();
export const [toggleTodo$, onToggleTodo] = createSignal<number>();
export const [deleteTodo$, onDeleteTodo] = createSignal<number>();

// Create a merged stream with all those events
export const todoActions$ = mergeWithKey({
  add: newTodo$.pipe(map((text, id) => ({ id: id, text }))),
  edit: editTodo$,
  toggle: toggleTodo$.pipe(map((id) => ({ id }))),
  delete: deleteTodo$.pipe(map((id) => ({ id })))
});

// Create a stream for each todo
type Todo = { id: number; text: string; done: boolean };
export const [todosById, keys$] = partitionByKey(
  todoActions$,
  (event) => event.payload.id,
  (event$, id) =>
    event$.pipe(
      takeWhile((event) => event.type !== 'delete'),
      scan(
        (state, action) => {
          switch (action.type) {
            case 'add':
            case 'edit':
              return { ...state, text: action.payload.text };
            case 'toggle':
              return { ...state, done: !state.done };
            default:
              return state;
          }
        },
        { id, text: '', done: false } as Todo
      )
    )
);

// todosMap$ is a function that returns an observable of events associated with a given todo
// combineKeys is a stream that emits whenever the state of any todo changes and gives us access to all of them
const todosMap$ = combineKeys(keys$, todosById);

export const todosList$ = todosMap$.pipe(
  map((x) => [...x.values()]),
  shareLatest() // We are using shareLatest because the stats will also consume it
);


export const [useTodos, todos$] = bind(keys$);
export const [useTodo, todo$] = bind((id: number) => todosById(id));

export const [useTodosStats, stats$] = bind(
  todosList$.pipe(
    map((todosList) => {
      const nTotal = todosList.length;
      const nCompleted = todosList.filter((item) => item.done).length;
      const nUncompleted = nTotal - nCompleted;
      const percentCompleted =
        nTotal === 0 ? 0 : Math.round((nCompleted / nTotal) * 100);

      return {
        nTotal,
        nCompleted,
        nUncompleted,
        percentCompleted
      };
    })
  ),
  { nTotal: 0, nCompleted: 0, nUncompleted: 0, percentCompleted: 0 }
);
