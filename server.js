// server.js
const admin = require('firebase-admin');
console.log('Service Account:', process.env.FIREBASE_SERVICE_ACCOUNT ? 'Loaded' : 'Missing');

// تحميل ملف الخدمة JSON من Firebase Console
const serviceAccount = require('./FIREBASE_SERVICE_ACCOUNT.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const express = require('express');
const app = express();
app.use(express.json());

// مثال مسار لإصدار Custom Token
app.post('/generateCustomToken', async (req, res) => {
  const { uid } = req.body;  // uid المستخدم

  if (!uid) {
    return res.status(400).send({ error: 'Missing uid' });
  }

  try {
    const customToken = await admin.auth().createCustomToken(uid);
    return res.send({ token: customToken });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
