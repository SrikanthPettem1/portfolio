const express = require('express');
const { google } = require('googleapis');
const app = express();
const PORT = 3000;

app.use(express.json());

const auth = new google.auth.GoogleAuth({
  keyFile: 'credentials.json', // You will download this file later
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheetId = 'YOUR_SHEET_ID'; // <-- Replace this

app.get('/availability', async (req, res) => {
  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client });

  const result = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: 'A2',
  });

  const status = result.data.values ? result.data.values[0][0] : 'Unknown';
  res.json({ status });
});

app.post('/availability', async (req, res) => {
  const newStatus = req.body.status;
  if (!newStatus) {
    return res.status(400).json({ message: 'Status is required' });
  }

  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client });

  await sheets.spreadsheets.values.update({
    spreadsheetId: sheetId,
    range: 'A2',
    valueInputOption: 'RAW',
    requestBody: {
      values: [[newStatus]],
    },
  });

  res.json({ message: 'Status updated', status: newStatus });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
