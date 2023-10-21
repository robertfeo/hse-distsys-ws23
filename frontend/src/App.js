import React, { useState, useEffect } from "react";
import { fetchTodos } from "./api/todos";
import Heading from "./components/Heading";
import clsx from 'clsx';
import SearchIcon from './components/icons/SearchIcon';
import ToggleButton from './components/ToggleButton';
import TodoPopup from './components/TodoPopup';
import TodoItem from './components/TodoItem';

function App() {
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isShowCompletedTodos, setIsShowCompletedTodos] = useState(false);
  const [todoPopupData, setTodoPopupData] = useState(null);

  useEffect(() => {
    fetchTodos()
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the todos", error);
      });
  }, []);

  const refreshTodos = () => {
    fetchTodos()
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the todos", error);
      });
  };

  const handleOpenTodoPopup = (index, item) => {
    setTodoPopupData({
      index,
      item,
    });
  };

  const getTodoItem = (index, item) => {
    return (
      <TodoItem
        key={index}
        item={item}
        index={index}
        searchTerm={searchTerm}
        refreshTodos={refreshTodos}
        onEditTodoItem={() => {
          setTodoPopupData({
            index,
            item,
          });
        }}
      />
    );
  };

  const filteredTodos = todos?.filter(item => {
    return searchTerm ? item.title.includes(searchTerm) : true;
  });

  return (
    <>
        <div className='flex min-h-screen items-center bg-gray-50'>
          {todoPopupData && (
            <TodoPopup
              onClosePopup={() => setTodoPopupData(null)}
              index={todoPopupData.index}
              data={todoPopupData.item}
              refreshTodos={refreshTodos}
            />
          )}

          <div className={clsx('mx-auto w-full max-w-3xl px-4 py-6')}>
            <Heading />
            <div className='pt-5'>
              <div className='flex items-center gap-3'>
                <div className='relative w-full'>
                  <input
                    type='search'
                    className={clsx(
                      'w-full bg-gray-50 p-4',
                      'rounded-lg border border-gray-300',
                      'text-gray-900',
                      'focus:no-underline focus:outline-none',
                    )}
                    placeholder='Search Todos'
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                  />

                  <button
                    type='button'
                    className={clsx(
                      'absolute bottom-2 right-2 top-2',
                      'rounded-lg bg-indigo-700 px-4',
                      'hover:bg-indigo-800 focus:no-underline focus:outline-none',
                    )}
                  >
                    <SearchIcon />
                  </button>
                </div>

                <button
                  onClick={() =>
                    handleOpenTodoPopup(null, {
                      value: '',
                      isChecked: false,
                    })
                  }
                  type='button'
                  className={clsx(
                    'rounded-lg bg-emerald-800 px-5 py-3 w-32',
                    'font-normal text-sm text-white',
                    'hover:bg-emerald-900  focus:no-underline focus:outline-none',
                  )}
                >
                  Add Todos
                </button>
              </div>
            </div>

            <div className='py-2'>


              {/* For incomplete todos */}
              {filteredTodos?.map((item, index) => {
                if (!item.isChecked) {
                  return getTodoItem(index, item, refreshTodos);
                }
                return null;
              })}

              <ToggleButton
                onToggle={() => setIsShowCompletedTodos(!isShowCompletedTodos)}
                todosAmount={
                  todos?.filter(
                    (item) => item.isChecked && item.value.includes(searchTerm),
                  ).length || 0
                }
                isShow={isShowCompletedTodos}
              />

              {/* For complete todos */}
              {isShowCompletedTodos &&
                filteredTodos?.map((item, index) => {
                  if (item.isChecked) {
                    return getTodoItem(index, item);
                  }
                  return null;
                })}

            </div>
          </div>
        </div>
    </>
  );
}

export default App;
