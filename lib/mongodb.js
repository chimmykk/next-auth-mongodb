import mongoose from 'mongoose';

export async function connectMongoDB() {
  try {
    const dbURI = process.env.MONGODB_URI || 'mongodb+srv://chimmykk:7K3SVOEVmS9rzBL1@cluster0.70mlnac.mongodb.net/usercredentails';

    // Check if the Mongoose connection is already open
    if (mongoose.connection.readyState === 1) {
      console.log('MongoDB is already connected.');
      return;
    }

    // Connect to MongoDB using the provided dbURI
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Log that the connection was successful
    console.log(`Connected to MongoDB using ${dbURI}`);
  } catch (error) {
    // Handle any errors that occur during the connection
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}
