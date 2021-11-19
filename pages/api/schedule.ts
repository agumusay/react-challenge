// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '../../middleware/mongodb';
import { Schedule } from '../../models/scheduleModel';
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'POST') {
		const { elements, position, zoom } = await req.body;

		if (elements && position && zoom) {
			try {
				let schedule = new Schedule({
					elements,
					position,
					zoom,
				});

				let ScheduleSaved = await schedule.save();
				return res.status(200).send(ScheduleSaved);
			} catch (error) {
				return res.status(405).send(error.message);
			}
		}
	}
	if (req.method === 'GET') {
		try {
			let schedules = await Schedule.find();
			return res.status(200).send(schedules);
		} catch (error) {
			return res.status(405).send(error.message);
		}
	}

	if (req.method === 'DELETE') {
		let ScheduleRemoved = await Schedule.deleteMany({});
		return res.status(200).send(ScheduleRemoved);
	}

	if (req.method === 'PUT') {
		const foundSchedule = await Schedule.findOne({})
			.sort({ _id: -1 })
			.limit(1)
			.then(schedule => {
				if (schedule) {
					schedule.elements = req.body;
					schedule.save();
				}
			});

		return res.status(200).send(foundSchedule);
	}
};

export default connectDb(handler);
