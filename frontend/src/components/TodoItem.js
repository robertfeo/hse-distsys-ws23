import React from 'react';
import DeleteIcon from './icons/DeleteIcon';
import EditIcon from './icons/EditIcon';
import CheckIcon from './icons/CheckIcon';
import clsx from 'clsx';
import { deleteTodoById, editTodoById } from '../api/todos';

const TodoItem = ({ searchTerm, item, onEditTodoItem, refreshTodos }) => {
    const handleRemoveTodoItem = () => {
        deleteTodoById(item.id)
            .then(() => {
                refreshTodos();
            })
            .catch((error) => {
                console.error("There was an error deleting the todo", error);
            });
    };

    const handleCheckTodoItem = () => {
        editTodoById(item.id, !item.isChecked)
            .then(() => {
                refreshTodos();
            })
            .catch((error) => {
                console.error("There was an error editing the todo", error);
            });
    };

    return (
        <div className={clsx(
            'mt-2.5 flex w-full items-center justify-between bg-white p-4',
            'rounded-lg border border-gray-200 shadow',
        )}>
            <span
                className='font-normal text-gray-700'
                dangerouslySetInnerHTML={{
                    __html: searchTerm !== ''
                        ? item.title.replace(searchTerm, `<span class="bg-blue-100 font-bold">${searchTerm}</span>`)
                        : item.title,
                }}
            ></span>

            <div className='flex gap-2'>

                <button
                    onClick={handleRemoveTodoItem}
                    type='button'
                    className={clsx(
                        'flex h-10 w-10 items-center justify-center rounded-lg bg-rose-700',
                        'hover:bg-rose-800 focus:no-underline focus:outline-none',
                    )}
                >
                    <DeleteIcon />
                </button>

                <button
                    onClick={onEditTodoItem}
                    type='button'
                    className={clsx(
                        'flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-700',
                        'hover:bg-indigo-800 focus:no-underline focus:outline-none',
                    )}
                >
                    <EditIcon />
                </button>

                <button
                    onClick={handleCheckTodoItem}
                    type='button'
                    className={clsx(
                        item.isChecked ? 'bg-emerald-700' : 'bg-gray-400',
                        'flex h-10 w-10 items-center justify-center rounded-lg',
                        'hover:bg-emerald-800 focus:no-underline focus:outline-none',
                    )}
                >
                    <CheckIcon />
                </button>
            </div>
        </div>
    );
};

export default TodoItem;
