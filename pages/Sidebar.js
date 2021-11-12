import React from 'react';
import 'tailwindcss/tailwind.css';

export default () => {
	const onDragStart = (event, nodeType) => {
		event.dataTransfer.setData('application/reactflow', nodeType);
		event.dataTransfer.effectAllowed = 'move';
	};

	return (
		<aside className='flex flex-col items-center col-span-3 col-start-1 p-1 bg-yellow-500'>
			<div
				className='flex items-center justify-center w-3/4 h-10 m-1 bg-green-500 dndnode'
				onDragStart={event => onDragStart(event, 'Start')}
				draggable>
				<span>Start</span>
			</div>
			<div
				className='flex items-center justify-center w-3/4 h-10 m-1 bg-pink-500 dndnode'
				onDragStart={event => onDragStart(event, 'Speaker')}
				draggable>
				Speaker
			</div>
			<div
				className='flex items-center justify-center w-3/4 h-10 m-1 bg-purple-500 dndnode'
				onDragStart={event => onDragStart(event, 'Q&A')}
				draggable>
				Q & A
			</div>
			<div
				className='flex items-center justify-center w-3/4 h-10 m-1 bg-gray-500 dndnode'
				onDragStart={event => onDragStart(event, 'Pause')}
				draggable>
				Pause
			</div>

			<div
				className='flex items-center justify-center w-3/4 h-10 m-1 bg-red-500 dndnode'
				onDragStart={event => onDragStart(event, 'Closing')}
				draggable>
				Closing
			</div>
		</aside>
	);
};
