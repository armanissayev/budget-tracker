const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

app.use(express.json());

// Admin panel
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'admin.html'));
});

// Serve static files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'login.html'));
});
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'register.html'));
})

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/transactions', transactionRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});