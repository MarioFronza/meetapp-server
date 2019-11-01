import { Op } from 'sequelize';
import Subscription from '../models/Subscription';
import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';

class SubscriptionController {
  async index(req, res) {
    const subscriptions = await Subscription.findAll({
      where: {
        user_id: req.userId,
      },
      attributes: ['id'],
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
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'name'],
            },
            {
              model: File,
              as: 'image',
              attributes: ['id', 'url', 'path'],
            },
          ],
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
    if (meetup.user_id === req.userId) {
      return res.status(400).json({
        error: 'Não é possível se inscrever nos seus próprios meetups',
      });
    }

    if (meetup.past) {
      return res.status(400).json({
        error: 'Não é possível se inscrever em meetups que já passaram',
      });
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
      return res.status(400).json({
        error: 'Não é possível se inscrever duas vezes no mesmo meetup',
      });
    }

    const { id, user_id, meetup_id } = await Subscription.create({
      user_id: user.id,
      meetup_id: meetup.id,
    });

    return res.json(id, user_id, meetup_id);
  }

  async destroy(req, res) {
    const { subscriptionId } = req.params;
    const subscription = await Subscription.findByPk(subscriptionId);
    await subscription.destroy();
    return res.send();
  }
}

export default new SubscriptionController();
