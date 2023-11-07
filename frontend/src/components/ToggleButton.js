import React from 'react';
import clsx from 'clsx';
import ToggleIcon from './icons/ToggleIcon';

const ToggleButton = ({ onToggle, todosAmount, isShow }) => {
    return (
        <button
            onClick={onToggle}
            type='button'
            className={clsx(
                isShow
                    ? 'bg-emerald-800 hover:bg-emerald-900'
                    : 'bg-gray-400 hover:bg-gray-500 focus:ring-gray-100',
                'mt-2.5 flex items-center gap-2 rounded-lg px-4 py-2.5',
                'transition-all focus:no-underline focus:outline-none'
            )}
        >
            <span className='font-normal text-sm text-white'>
                Completed Todos {todosAmount}
            </span>
            <ToggleIcon isShow={isShow} />
        </button>
    );
};

export default ToggleButton;
