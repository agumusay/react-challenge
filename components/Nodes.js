import React from 'react';
import { Handle } from 'react-flow-renderer';
import { FaPlay, FaStop, FaPause, FaMicrophoneAlt } from 'react-icons/fa';
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
};

const StartNode = ({ data }) => {
	return (
		<div style={nodeStyles}>
			<FaPlay style={{ fontSize: '2rem', marginRight: '0.5rem' }} />
			<span>Start</span>
		</div>
	);
};

const StopNode = ({ data }) => {
	return (
		<div style={nodeStyles}>
			<FaStop style={{ fontSize: '2rem', marginRight: '0.5rem' }} />
			<span>Stop</span>
		</div>
	);
};

const PauseNode = ({ data }) => {
	return (
		<div style={nodeStyles}>
			<FaPause style={{ fontSize: '2rem', marginRight: '0.5rem' }} />
			<span>Pause</span>
		</div>
	);
};

const SpeakerNode = ({ data }) => {
	return (
		<div style={nodeStyles}>
			<FaMicrophoneAlt style={{ fontSize: '2rem', marginRight: '0.5rem' }} />
			<span>Speaker {data.speakerIndex + 1}</span>
		</div>
	);
};

const QnANode = ({ data }) => {
	return (
		<div style={nodeStyles}>
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
