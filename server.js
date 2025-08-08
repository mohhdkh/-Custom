const admin = require('firebase-admin');

// تحميل ملف الخدمة JSON من Firebase Console
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const express = require('express');
const app = express();
app.use(express.json());

// مسار بسيط لتأكيد تشغيل السيرفر
app.get('/', (req, res) => {
  res.send('Server is running ✅');
});

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
