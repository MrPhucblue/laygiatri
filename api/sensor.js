let thresholds = {
  tempLow: 9,
  tempHigh: 10
};

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'POST') {
    const { tempLow, tempHigh } = req.body;

    if (
      typeof tempLow !== 'number' ||
      typeof tempHigh !== 'number'
    ) {
      return res.status(400).json({ message: 'Dữ liệu không hợp lệ.' });
    }

    if (tempLow > tempHigh) {
      return res.status(400).json({ message: 'Ngưỡng thấp phải nhỏ hơn hoặc bằng ngưỡng cao.' });
    }

    thresholds.tempLow = tempLow;
    thresholds.tempHigh = tempHigh;

    return res.status(200).json({ message: 'Ngưỡng nhiệt độ đã được cập nhật' });
  }

  return res.status(200).json({ thresholds });
}
