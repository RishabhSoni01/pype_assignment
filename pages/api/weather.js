// pages/api/weather.js
import axios from 'axios';

export default async function handler(req, res) {
  try {
    const { q } = req.query;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}&units=metric`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
