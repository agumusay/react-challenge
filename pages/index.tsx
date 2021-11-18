import React, { useState, useRef, useCallback, useEffect } from 'react';
import 'tailwindcss/tailwind.css';

import ReactFlow, { ReactFlowProvider, addEdge, removeElements, Controls } from 'react-flow-renderer';
import Sidebar from './Sidebar';

import { nodeTypes } from '../components/Nodes';
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
	const [speakerIndex, setSpeakerIndex] = useState(0);

	useEffect(() => {
		onRestore();
	}, []);

	useEffect(() => {
		setSpeakerIndex(elements.filter(el => el.type === 'speaker').length);
	}, [elements]);

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
			const lastInd = +schedule?.elements[schedule.elements.length - 1].id.replace(/\D/g, '');
			id = lastInd ? lastInd : 0;
			if (schedule) {
				const [x = 0, y = 0] = schedule.position;
				setElements(schedule.elements || []);
				reactFlowWrapper.current.scrollTo({ x, y });
			}
		};

		restoreFlow();
	}, [setElements]);

	const onSave = useCallback(
		async e => {
			e.stopPropagation();
			console.log('save clicked');
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
		},
		[reactFlowInstance]
	);

	const onReset = async e => {
		e.stopPropagation();
		console.log('reset clicked');
		setElements([]);
		fetch('/api/schedule', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		});
	};
	// const onClickElement = useCallback((event, element) => {
	// 	// Set the clicked element in local state
	// 	setClickedElement({
	// 		clickedElement: [element],
	// 	});
	// }, []);

	// const onClickElementDelete = useCallback(() => {
	// 	// Get all edges for the flow
	// 	const edges = elements.filter(element => isEdge(element));
	// 	// Get edges connected to selected node
	// 	const edgesToRemove = getConnectedEdges(clickedElement.clickedElement, edges);

	// 	onElementsRemove([...clickedElement.clickedElement, ...edgesToRemove]);
	// }, [elements, onElementsRemove, clickedElement.clickedElement]);

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
			type: `${
				type === 'Start'
					? 'start'
					: type === 'Stop'
					? 'stop'
					: type === 'Pause'
					? 'pause'
					: type === 'Q&A'
					? 'qna'
					: 'speaker'
			}`,
			position,
			sourcePosition: 'right',
			targetPosition: 'left',
			data: { label: `${type}`, speakerIndex },
		};

		setElements(es => es.concat(newNode));
	};

	return (
		<div className='grid h-screen grid-cols-12 bg-gray-300 w-100 dndflow'>
			<ReactFlowProvider>
				<Sidebar />
				<div className='col-span-9 col-start-4 reactflow-wrapper' ref={reactFlowWrapper}>
					<button className='z-10 h-10 m-2 bg-gray-100 w-30' onClick={onSave}>
						Save
					</button>
					<button className='z-10 h-10 m-2 bg-red-600 w-30' onClick={onReset}>
						Reset
					</button>

					<ReactFlow
						elements={elements}
						onConnect={onConnect}
						onElementsRemove={onElementsRemove}
						nodeTypes={nodeTypes}
						onLoad={onLoad}
						onDrop={onDrop}
						onDragOver={onDragOver}
						snapToGrid={true}
						snapGrid={[15, 15]}></ReactFlow>
				</div>
			</ReactFlowProvider>
		</div>
	);
}
