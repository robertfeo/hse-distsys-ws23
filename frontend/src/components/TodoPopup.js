import React, { useState } from 'react';
import clsx from 'clsx';
import { addTodo } from '../api/todos';
import { editTodoById } from '../api/todos';

const TodoPopup = ({ onClosePopup, index, data }) => {
    const [todoValue, setTodoValue] = useState(data?.value || '');

    const handleEditTodoItem = (event) => {
        event.preventDefault();
        onClosePopup();

        if (index === null) {
            const todoData = {
                title: todoValue,
                description: ''  // Later maybe
            };

            addTodo(todoData)
                .then(() => {

                })
                .catch((error) => {
                    console.error('There was an error adding the todo', error);
                });
            return;
        } else {
            // Editing existing Todo
            const todoId = data.id; // Assuming 'id' is available in data object

            if (todoId) {
                const todoData = {
                    title: todoValue,
                    description: ''  // Later maybe
                };
                editTodoById(todoId, todoData)
                    .then(() => {
                    })
                    .catch((error) => {
                        console.error('There was an error editing the todo', error);
                    });
            }
        }
    };

    return (
        <div
            className={clsx(
                'fixed bottom-0 left-0 right-0 top-0 z-50',
                'flex items-center justify-center bg-gray-700/60 p-4',
            )}
        >
            <div className='w-full max-w-md'>
                <form
                    onSubmit={handleEditTodoItem}
                    className='rounded-lg bg-white shadow'
                >
                    <div className='p-6'>
                        <input
                            required
                            type='text'
                            className={clsx(
                                'w-full bg-gray-50 p-4',
                                'rounded-lg border border-gray-300',
                                'text-gray-900',
                                'focus:border-blue-500 focus:ring-blue-500',
                            )}
                            placeholder='Add Todos'
                            value={todoValue}
                            onChange={(event) => setTodoValue(event.target.value)}
                        />
                    </div>

                    <div
                        className={clsx(
                            'flex items-center justify-center space-x-8 p-4',
                            'rounded-b border-t border-gray-200',
                        )}
                    >
                        <button
                            type='submit'
                            className={clsx(
                                'rounded-lg bg-emerald-800 px-5 py-2.5',
                                'text-center font-medium text-white',
                                'hover:bg-emerald-900 focus:outline-none focus:ring-4 focus:ring-emerald-900',
                            )}
                        >
                            Save
                        </button>
                        <button
                            onClick={onClosePopup}
                            type='button'
                            className={clsx(
                                'bg-white px-5 py-2.5',
                                'rounded-lg border border-gray-200',
                                'font-medium text-gray-500',
                                'hover:bg-gray-100 hover:text-gray-900',
                                'focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200',
                            )}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TodoPopup;
