import express, { Request, Response } from 'express';
import axios from 'axios';
import NodeCache from 'node-cache';
import dotenv from 'dotenv';
import Order from './order.model';
import { orderSchema, photosQuerySchema, userIdParamSchema } from './schemas';

dotenv.config();

const router = express.Router();
const cache = new NodeCache();
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;
const PIXABAY_URL = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}`;

// @ts-ignore
router.get('/photos', async (req: Request, res: Response) => {
  const { error } = photosQuerySchema.validate(req.query);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { count } = req.query;
  const cachedData = cache.get(count as string);

  if (cachedData) {
    return res.json(cachedData);
  }

  try {
    const response = await axios.get(PIXABAY_URL, {
      params: { per_page: count },
    });

    const photoUrls = response.data.hits.map((hit: any) => hit.webformatURL);

    cache.set(count as string, photoUrls, 3600); // Cache for 1 hour

    res.status(200).json(photoUrls);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch photos', error });
  }
});

// @ts-ignore
router.post('/orders', async (req, res) => {
  const { error } = orderSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { email, fullName, address, imageUrls, frameColor, user } = req.body;

  try {
    const existingOrder = await Order.findOne({ user });
    if (existingOrder) {
      return res.status(400).json({ message: 'An order for this user already exists' });
    }

    const newOrder = new Order({
      email,
      fullName,
      address,
      imageUrls,
      frameColor,
      user,
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order', error });
  }
});

// @ts-ignore
router.get('/orders/:userId', async (req, res) => {
  const { error } = userIdParamSchema.validate(req.params);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { userId } = req.params;

  try {
    const orders = await Order.find({ user: userId });

    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders', error });
  }
});

export default router;
