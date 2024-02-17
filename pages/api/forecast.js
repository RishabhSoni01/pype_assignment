import axios from 'axios';

export default async (req, res) => {
  const { q } = req.query;

  try {
    const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${q}&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}&units=metric`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};