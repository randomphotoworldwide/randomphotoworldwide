const express = require('express');
const multer = require('multer');
const session = require('express-session');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({ extended: true }));
app.use(session({
secret: 'change-this-secret',
resave: false,
saveUninitialized: true
}));

// STORAGE
const archiveStorage = multer.diskStorage({
destination: 'uploads/archive',
filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const portfolioStorage = multer.diskStorage({
destination: 'uploads/portfolio',
filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const archiveUpload = multer({ storage: archiveStorage });
const portfolioUpload = multer({ storage: portfolioStorage });
// ARCHIVE UPLOAD (CONSENT BASED)
app.post('/upload-archive', archiveUpload.single('photo'), (req, res) => {
if (req.body.consent !== 'yes') {
fs.unlinkSync(req.file.path);
return res.redirect('/');
}
res.redirect('/archive.html');
});

// LOGIN
app.post('/login', (req, res) => {
if (req.body.password === 'YOUR_PASSWORD_HERE') {
req.session.admin = true;
res.redirect('/portfolio.html');
} else {
res.redirect('/login.html');
}
});

// PORTFOLIO UPLOAD (ADMIN ONLY)
app.post('/upload-portfolio', portfolioUpload.single('file'), (req, res) => {
if (!req.session.admin) return res.status(403).send('Forbidden');
res.redirect('/portfolio.html');
});

// API
app.get('/api/archive', (_, res) => {
res.json(fs.readdirSync('uploads/archive'));
});

app.get('/api/portfolio', (_, res) => {
res.json(fs.readdirSync('uploads/portfolio'));
});

app.listen(PORT, () => console.log('Running on http://localhost:3000'));
