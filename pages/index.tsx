import React, { useState, useRef, useCallback, useEffect } from 'react';
import 'tailwindcss/tailwind.css';

import ReactFlow, { ReactFlowProvider, addEdge, removeElements, Controls } from 'react-flow-renderer';
import Sidebar from './Sidebar';

import { nodeTypes } from '../components/Nodes';
import { FaTrash, FaSave } from 'react-icons/fa';
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
	const [removeId, setRemoveId] = useState(null);

	useEffect(() => {
		const remains = elements.filter(el => el.id !== 'dndNode' + removeId);
		setElements(remains);
	}, [removeId]);

	useEffect(() => {
		onRestore();
	}, []);

	useEffect(() => {
		setSpeakerIndex(elements.filter(el => el.type === 'speaker').length);
		onUpdate(elements);
		console.log('elements', elements);
	}, [elements, reactFlowWrapper.current]);

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
			if (schedule) {
				const lastInd = await +schedule?.elements[schedule.elements.length - 1]?.id.replace(/\D/g, '');
				id = lastInd ? lastInd : 0;
				const [x = 0, y = 0] = schedule.position;
				const schedulesWithDel = schedule.elements.map(el => {
					const dataWithFn = { ...el.data, onDelete };
					return { ...el, data: dataWithFn };
				});

				setElements(schedulesWithDel || []);
				reactFlowWrapper.current.scrollTo({ x, y });
			}
		};

		restoreFlow();
	}, [setElements]);

	const onSave = useCallback(
		async e => {
			e.stopPropagation();
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
		setElements([]);
		fetch('/api/schedule', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		});
	};
	const onDelete = node => {
		setRemoveId(node.id);
	};

	const onUpdate = elements => {
		fetch('/api/schedule', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(elements),
		});
	};

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
			data: { id, label: `${type}`, speakerIndex, onDelete },
		};

		setElements(es => es.concat(newNode));
	};

	return (
		<div className='grid h-screen grid-cols-12 bg-gray-300 w-100 dndflow'>
			<ReactFlowProvider>
				<Sidebar />
				<div className='col-span-9 col-start-4 reactflow-wrapper' ref={reactFlowWrapper}>
					<button
						className='z-10 h-10 m-2 w-30'
						onClick={onSave}
						style={{
							borderRadius: '100%',
							boxShadow: '2px 2px 5px 3px rgba(0,0,0,0.3), -2px -2px 5px 3px rgba(255,255,255,0.3)',
							width: '60px',
							height: '60px',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							color: 'white',
							fontWeight: 'bold',
							textShadow: '0 1px 1px rgba(0,0,0,.3)',
							border: 'solid 1px #074b93',
							background: 'linear-gradient(180deg, #0053ad, #00336b)',
						}}>
						<FaSave style={{ fontSize: '2rem' }} />
					</button>
					<button
						className='z-10 h-10 m-2 w-30'
						onClick={onReset}
						style={{
							borderRadius: '100%',
							boxShadow: '2px 2px 5px 3px rgba(0,0,0,0.3), -2px -2px 5px 3px rgba(255,255,255,0.3)',
							width: '60px',
							height: '60px',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							color: 'white',
							fontWeight: 'bold',
							textShadow: '0 1px 1px rgba(0,0,0,.3)',
							border: 'solid 1px #074b93',
							background: 'linear-gradient(180deg, #0053ad, #00336b)',
						}}>
						<FaTrash style={{ fontSize: '2rem' }} />
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
