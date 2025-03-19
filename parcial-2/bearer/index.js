const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./auth/auth.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);

// Example protected route
app.get(
	'/api/protected',
	require('./auth/auth.middleware').authenticate,
	(req, res) => {
		res.json({
			message: 'This is a protected route',
			user: req.user,
		});
	},
);

// Public route
app.get('/api/public', (req, res) => {
	res.json({ message: 'This is a public route' });
});

// Error handler
app.use((err, req, res, next) => {
	console.error(err.stack);
	res
		.status(500)
		.json({ message: 'Something went wrong!', error: err.message });
});

// Start server
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
