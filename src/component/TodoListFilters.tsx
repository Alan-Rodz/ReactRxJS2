import { useCurrentFilter, onSelectFilter, FilterType } from '../Filter';


// ******************************************************************************************************************
export const TodoListFilters = () => {
  const filter = useCurrentFilter();

  const updateFilter = ({ target }: any) => {
    onSelectFilter(target.value);
  };

  console.log(
    <select value={filter} onChange={updateFilter}>
      <option value={FilterType.All}>All</option>
      <option value={FilterType.Done}>Completed</option>
      <option value={FilterType.Pending}>Uncompleted</option>
    </select>
  );

  return (
    <>
      Filter:
      <select value={filter} onChange={updateFilter}>
        <option value={FilterType.All}>All</option>
        <option value={FilterType.Done}>Completed</option>
        <option value={FilterType.Pending}>Uncompleted</option>
      </select>
    </>
  );
}