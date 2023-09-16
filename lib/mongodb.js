import mongoose from 'mongoose';

let previousDbURI; // Store the previous MongoDB URI

export async function connectMongoDB(providerType) {
  try {
    let dbURI;

    // Implementing switch statement here to determine the MongoDB URI
    switch (providerType) {
      case 'email':
        dbURI = process.env.MONGODB_URI;
        break;
      case 'google':
        dbURI = process.env.MONGODB_GOOGLE;
        break;
      case 'profile':
        dbURI = process.env.MONGODB_PROFILE;
        break;
      default:
        // Provide a default URI or log an error message
        console.error('Invalid provider type. Using a default MongoDB URI.');
        dbURI = 'default-mongodb-uri';
    }

    // Check if the Mongoose connection is already open and the URI has changed
    if (mongoose.connection.readyState === 1 && previousDbURI !== dbURI) {
      console.log('Disconnecting from previous MongoDB connection.');
      await mongoose.disconnect();
    }

    // Connect to MongoDB using the determined dbURI
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Log that the connection was successful
    console.log(`Connected to MongoDB using ${dbURI}`);

    // Update the previous MongoDB URI
    previousDbURI = dbURI;
  } catch (error) {
    // Handle any errors that occur during the connection
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}
