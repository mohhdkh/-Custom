const express = require('express');

function createApp() {
  const app = express();
  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('Server is running');
  });

  // This legacy endpoint must never mint a token from a client-supplied UID.
  app.post('/generateCustomToken', (req, res) => {
    return res.status(410).send({ error: 'Endpoint retired' });
  });

  return app;
}

if (require.main === module) {
  const port = process.env.PORT || 3000;
  createApp().listen(port, () => console.log(`Server running on port ${port}`));
}

module.exports = { createApp };
