import React, { useState, useRef, useCallback, useEffect } from 'react';
import 'tailwindcss/tailwind.css';

import ReactFlow, { ReactFlowProvider, addEdge, removeElements, Controls } from 'react-flow-renderer';
import Sidebar from './Sidebar';

const initialElements = [];
let id = 0;
const getId = () => {
	id++;
	return 'dndNode' + id;
};

export default function DnDFlow() {
	const reactFlowWrapper = useRef(null);
	const [reactFlowInstance, setReactFlowInstance] = useState(null);
	const [elements, setElements] = useState(initialElements);
	const onConnect = params => setElements(els => addEdge(params, els));
	const onElementsRemove = elementsToRemove => setElements(els => removeElements(elementsToRemove, els));

	useEffect(() => {
		onRestore();
	}, []);

	const onRestore = useCallback(() => {
		const restoreFlow = async () => {
			const schedules = await fetch('/api/schedule', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const schedule = await schedules.json().then(data => {
				return data[data.length - 1];
			});
			console.log(schedule);
			if (schedule) {
				const [x = 0, y = 0] = schedule.position;
				setElements(schedule.elements || []);
				reactFlowWrapper.current.scrollTo({ x, y });
			}
		};

		restoreFlow();
	}, [setElements]);
	const onSave = useCallback(async () => {
		if (reactFlowInstance) {
			const flow = reactFlowInstance.toObject();

			fetch('/api/schedule', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(flow),
			});
		}
	}, [reactFlowInstance]);

	const onLoad = _reactFlowInstance => setReactFlowInstance(_reactFlowInstance);

	const onDragOver = event => {
		event.preventDefault();
		event.dataTransfer.dropEffect = 'move';
	};

	const onDrop = event => {
		event.preventDefault();

		const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
		const type = event.dataTransfer.getData('application/reactflow');
		const position = reactFlowInstance.project({
			x: event.clientX - reactFlowBounds.left,
			y: event.clientY - reactFlowBounds.top,
		});
		console.log(getId());
		const newNode = {
			id: getId(),
			type: `${type === 'Start' ? 'input' : type === 'Closing' ? 'output' : 'default'}`,
			position,
			data: { label: `${type}` },
			className: `${
				type === 'Start'
					? 'bg-green-500'
					: type === 'Closing'
					? 'bg-red-500'
					: type === 'Speaker'
					? 'bg-blue-500'
					: type === 'Q&A'
					? 'bg-purple-500'
					: 'bg-gray-500'
			}`,
		};

		setElements(es => es.concat(newNode));
	};

	return (
		<div className='grid h-screen grid-cols-12 bg-blue-500 w-100 dndflow'>
			<ReactFlowProvider>
				<Sidebar />
				<div className='col-span-9 col-start-4 reactflow-wrapper' ref={reactFlowWrapper}>
					<button className='h-10 bg-gray-100 w-30' onClick={onSave}>
						Save
					</button>
					<ReactFlow
						elements={elements}
						onConnect={onConnect}
						onElementsRemove={onElementsRemove}
						onLoad={onLoad}
						onDrop={onDrop}
						onDragOver={onDragOver}>
						<Controls />
					</ReactFlow>
				</div>
			</ReactFlowProvider>
		</div>
	);
}
