let thresholds = {
  tempLow: 20,
  tempHigh: 40
};

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'POST') {
    const { tempLow, tempHigh } = req.body;
    if (typeof tempLow === 'number' && typeof tempHigh === 'number') {
      thresholds.tempLow = tempLow;
      thresholds.tempHigh = tempHigh;
      return res.status(200).json({ message: 'Thresholds updated' });
    }
    return res.status(400).json({ message: 'Invalid thresholds' });
  }

  return res.status(200).json({ thresholds });
}