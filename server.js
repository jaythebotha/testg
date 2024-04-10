const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.post('/submit', async (req, res) => {
  const username = req.body.username;

  try {
    const robloxResponse = await axios.get(`https://api.roblox.com/users/get-by-username?username=${username}`);
    const user = robloxResponse.data;

    const discordWebhookResponse = await axios.post('https://discord.com/api/webhooks/1227118317836308480/lNxoOSScC0Td0GFuRtLnBLDBb9h9X2l9PS8JLdw2fb64dJbqtb1AHW90CiYEfiE4frme', {
      username: user.Name,
      avatar_url: user.AvatarUrl,
      content: `ID: ${user.Id}\nJoin Date: ${new Date(user.Created).toLocaleString()}`
    });

    res.send('Info sent to Discord!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending info to Discord.');
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});