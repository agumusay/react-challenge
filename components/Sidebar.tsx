import React from 'react';
import 'tailwindcss/tailwind.css';
import { FaPlay, FaPause, FaMicrophoneAlt, FaStop } from 'react-icons/fa';
import { MdQuestionAnswer } from 'react-icons/md';

const nodeStyles = {
	borderRadius: '0.5rem',
	boxShadow: '2px 2px 5px 3px rgba(0,0,0,0.3), -2px -2px 5px 3px rgba(255,255,255,0.3)',
	width: '140px',
	height: '60px',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	color: 'white',
	fontWeight: 'bold',
	textShadow: '0 1px 1px rgba(0,0,0,.3)',
	border: 'solid 1px #074b93',
	background: 'linear-gradient(180deg, #0053ad, #00336b)',
	position: 'relative',
};

export default () => {
	const onDragStart = (event, nodeType) => {
		event.dataTransfer.setData('application/reactflow', nodeType);
		event.dataTransfer.effectAllowed = 'move';
	};

	return (
		<aside
			className='z-10 flex flex-col items-center col-span-3 col-start-1 pt-10 bg-yellow-500 rounded-sm'
			style={{ boxShadow: 'inset 3px 3px 5px rgba(0,0,0,0.5), inset -3px -3px 5px rgba(255,255,255,0.5)' }}>
			<div
				className='flex items-center justify-center w-3/4 h-10 m-1 bg-green-500 dndnode'
				onDragStart={event => onDragStart(event, 'Start')}
				draggable
				style={nodeStyles}>
				<FaPlay style={{ fontSize: '2rem', marginRight: '0.5rem' }} />
				<span>Start</span>
			</div>
			<div
				className='flex items-center justify-center w-3/4 h-10 m-1 bg-pink-500 dndnode'
				onDragStart={event => onDragStart(event, 'Speaker')}
				draggable
				style={nodeStyles}>
				<FaMicrophoneAlt style={{ fontSize: '2rem', marginRight: '0.5rem' }} />
				Speaker
			</div>
			<div
				className='flex items-center justify-center w-3/4 h-10 m-1 bg-purple-500 dndnode'
				onDragStart={event => onDragStart(event, 'Q&A')}
				draggable
				style={nodeStyles}>
				<MdQuestionAnswer style={{ fontSize: '2rem', marginRight: '0.5rem' }} />
				Q&A
			</div>
			<div
				className='flex items-center justify-center w-3/4 h-10 m-1 bg-gray-500 dndnode'
				onDragStart={event => onDragStart(event, 'Pause')}
				draggable
				style={nodeStyles}>
				<FaPause style={{ fontSize: '2rem', marginRight: '0.5rem' }} />
				<span>Pause</span>
			</div>

			<div
				className='flex items-center justify-center w-3/4 h-10 m-1 bg-red-500 dndnode'
				onDragStart={event => onDragStart(event, 'Stop')}
				draggable
				style={nodeStyles}>
				<FaStop style={{ fontSize: '2rem', marginRight: '0.5rem' }} />
				<span>Stop</span>
			</div>
		</aside>
	);
};
