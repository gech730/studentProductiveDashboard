import 'dotenv/config';
import app from './app.js';
import { connectDB } from './config/database.js';

// Validate required environment variables before starting
const REQUIRED_ENV = ['MONGO_URL', 'JWT_SECRET'];
const missing = REQUIRED_ENV.filter((key) => !process.env[key]);
if (missing.length > 0) {
  console.error(`Missing required environment variables: ${missing.join(', ')}`);
  console.error('Please check your .env file or hosting environment config.');
  process.exit(1);
}

const PORT = process.env.PORT || 8000;

try {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} [${process.env.NODE_ENV || 'development'}]`);
  });
} catch (error) {
  console.error('Failed to start server:', error.message);
  process.exit(1);
}
