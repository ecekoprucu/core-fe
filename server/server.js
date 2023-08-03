require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const PORT = process.env.PORT || 5050;

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

function b64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
      return String.fromCharCode('0x' + p1);
  }));
}


app.post('/api/data', async (req, res) => {
    const { email, password, action, clientId, userId, ticketId, message, subject } = req.body;

    const encodedSubject = subject ? b64EncodeUnicode(subject) : null;
    console.log(`https://bridge.bigcore.net/includes/api.php?username=${process.env.REACT_APP_API_USERNAME}&password=${process.env.REACT_APP_API_PASSWORD}&responsetype=JSON&action=${action}${(!!email && '&email=') || ''}${!!email && email}${(!!userId && '&userid=') || ''}${(!!userId && userId) || ''}${(!!clientId && '&clientid=') || ''}${(!!clientId && clientId) || ''}${(!!password && '&password2=' || '')}${(!!password && password) || ''}${(!!ticketId && '&ticketid=') || ''}${(!!ticketId && ticketId) || ''}${(!!message && '&message=') || ''}${(!!message && message) || ''}${(!!encodedSubject && '&customfields=') || ''}${(!!encodedSubject && encodedSubject) || ''}`);
    try {
      const response = await axios.post(`https://bridge.bigcore.net/includes/api.php?username=${process.env.REACT_APP_API_USERNAME}&password=${process.env.REACT_APP_API_PASSWORD}&responsetype=JSON&action=${action}${(!!email && '&email=') || ''}${!!email && email}${(!!userId && '&userid=') || ''}${(!!userId && userId) || ''}${(!!clientId && '&clientid=') || ''}${(!!clientId && clientId) || ''}${(!!password && '&password2=' || '')}${(!!password && password) || ''}${(!!ticketId && '&ticketid=') || ''}${(!!ticketId && ticketId) || ''}${(!!message && '&message=') || ''}${(!!message && message) || ''}${(!!encodedSubject && '&customfields=') || ''}${(!!encodedSubject && encodedSubject) || ''}`);

      const data = response.data;
      console.log(data);
      res.status(200).json(data);

    } catch (error) {
      console.error('Error fetching data', error);
      res.status(500).json({ error: 'Error fetching data' });
    }
  });
  

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});