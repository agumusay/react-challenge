import { iSchedule } from './../types/iSchedule';
import mongoose from 'mongoose';

let schedule = new mongoose.Schema({
	elements: [],
	position: [],
	zoom: Number,
});

export const Schedule = mongoose.models.Schedule || mongoose.model<iSchedule>('Schedule', schedule);
