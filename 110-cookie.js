const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

app.get('/login', (req, res) => {
  res.cookie('userData', '1234', { maxAge: 900000, httpOnly: true });
  res.send('Cookie is set');
});

app.get('/logout', (req, res) => {
  res.clearCookie('userData');
  res.send('Cookie is cleared');
});

app.get('/demo', (req, res) => {
  const userData = req.cookies.userData;
  if (userData) {
    res.send(`Cookie value: ${userData}`);
  } else {
    res.send('Cookie not found');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
