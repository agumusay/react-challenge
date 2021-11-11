import mongoose from 'mongoose';
export interface iSchedule extends mongoose.Document {
	schedule: {
		elements: [];
		position: [];
		zoom: number;
	};
}
