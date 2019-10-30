import { Op } from 'sequelize';
import Subscription from '../models/Subscription';
import Meetup from '../models/Meetup';
import User from '../models/User';

class SubscriptionController {
  async index(req, res) {
    const subscriptions = await Subscription.findAll({
      where: {
        user_id: req.userId,
      },
      include: [
        {
          model: Meetup,
          required: true,
          as: 'meetup',
          where: {
            date: {
              [Op.gt]: new Date(),
            },
          },
          attributes: ['id', 'title', 'description', 'date', 'location'],
        },
      ],
    });

    return res.json(subscriptions);
  }

  async store(req, res) {
    const user = await User.findByPk(req.userId);
    const meetup = await Meetup.findByPk(req.params.meetupId, {
      include: [
        {
          model: User,
          as: 'user',
        },
      ],
    });

    if (meetup.user === req.userId) {
      return res
        .status(400)
        .json({ error: "Cat't subscribe to you own meetups" });
    }

    if (meetup.past) {
      return res.status(400).json({ error: "Cat't subscribe to past meetups" });
    }

    const checkMeetupDate = await Subscription.findOne({
      where: { user_id: user.id },
      include: [
        {
          model: Meetup,
          required: true,
          as: 'meetup',
          where: {
            date: meetup.date,
          },
        },
      ],
    });

    if (checkMeetupDate) {
      return res
        .status(400)
        .json({ error: "Can't subscribe at the same time" });
    }

    const { id, user_id, meetup_id } = await Subscription.create({
      user_id: user.id,
      meetup_id: meetup.id,
    });

    return res.json(id, user_id, meetup_id);
  }
}

export default new SubscriptionController();
