// ES Module import
import { MongoClient, ServerApiVersion } from 'mongodb';

// Use your MongoDB Atlas URI
const uri = "mongodb+srv://getacherkifilie23_db_user:gecho1234@cluster00.yqjwiiu.mongodb.net/studentdb?retryWrites=true&w=majority";

// Create a MongoClient with options
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Function to connect to MongoDB
export async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas successfully!");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // stop app if cannot connect
  }
}

// Export the client to use in routes or models
export default client;
