// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '../../middleware/mongodb';
import { Schedule } from '../../models/scheduleModel';
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	console.log('request done');

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
		} else {
			res.status(422).send('Bad request');
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
};

export default connectDb(handler);