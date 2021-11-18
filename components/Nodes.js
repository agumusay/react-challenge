import React from 'react';
import { Handle, ControlButton } from 'react-flow-renderer';
import { FaPlay, FaStop, FaPause, FaMicrophoneAlt, FaTimes } from 'react-icons/fa';
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

const buttonStyles = {
	position: 'absolute',
	top: '-3px',
	right: '-3px',
	background: 'red',
	borderRadius: '50%',
	width: '20px',
	height: '20px',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
};

const StartNode = ({ data }) => {
	return (
		<div style={nodeStyles}>
			<button style={buttonStyles} onClick={() => data.onDelete(data)}>
				<FaTimes
					style={{
						fontSize: '1rem',
					}}
				/>
			</button>
			<FaPlay style={{ fontSize: '2rem', marginRight: '0.5rem' }} />
			<span>Start</span>
		</div>
	);
};

const StopNode = ({ data }) => {
	return (
		<div style={nodeStyles}>
			<button style={buttonStyles} onClick={() => data.onDelete(data)}>
				<FaTimes
					style={{
						fontSize: '1rem',
					}}
				/>
			</button>
			<FaStop style={{ fontSize: '2rem', marginRight: '0.5rem' }} />
			<span>Stop</span>
		</div>
	);
};

const PauseNode = ({ data }) => {
	return (
		<div style={nodeStyles}>
			<button style={buttonStyles} onClick={() => data.onDelete(data)}>
				<FaTimes
					style={{
						fontSize: '1rem',
					}}
				/>
			</button>
			<FaPause style={{ fontSize: '2rem', marginRight: '0.5rem' }} />
			<span>Pause</span>
		</div>
	);
};

const SpeakerNode = ({ data }) => {
	return (
		<div style={nodeStyles}>
			<button style={buttonStyles} onClick={() => data.onDelete(data)}>
				<FaTimes
					style={{
						fontSize: '1rem',
					}}
				/>
			</button>
			<FaMicrophoneAlt style={{ fontSize: '2rem', marginRight: '0.5rem' }} />
			<span>Speaker {data.speakerIndex + 1}</span>
		</div>
	);
};

const QnANode = ({ data }) => {
	return (
		<div style={nodeStyles}>
			<button style={buttonStyles} onClick={() => data.onDelete(data)}>
				<FaTimes
					style={{
						fontSize: '1rem',
					}}
				/>
			</button>
			<MdQuestionAnswer style={{ fontSize: '2rem', marginRight: '0.5rem' }} />
			<span>Q&A</span>
		</div>
	);
};

export const nodeTypes = {
	stop: StopNode,
	start: StartNode,
	pause: PauseNode,
	speaker: SpeakerNode,
	qna: QnANode,
};
