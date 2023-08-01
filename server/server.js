require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const PORT = process.env.PORT || 5050;

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.post('/api/data', async (req, res) => {
    const { email } = req.body;
  
    try {
      const response = await axios.post(`https://bridge.bigcore.net/includes/api.php?username=${process.env.REACT_APP_API_USERNAME}&password=${process.env.REACT_APP_API_PASSWORD}&responsetype=JSON&action=GetClients&search=${email}`);

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