import { connectMongoDB } from '../../../lib/mongodb';
import Address from '../../../models/Address'; // Import the Address model

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Connect to the 'profile' database
      await connectMongoDB('profile');

      // Extract the address data from the request body
      const { street, city, state, postalCode, country, landmark, contactno } = req.body;

      // Create a new Address document using the imported Address model
      const newAddress = new Address({
        street,
        city,
        state,
        postalCode,
        country,
        landmark,
        contactno,
      });

      // Save the new Address document to the database
      await newAddress.save();

      const successResponse = {
        message: 'Address created successfully.',
        address: newAddress,
      };
      res.status(201).json(successResponse);
    } catch (error) {
      console.error('An error occurred while creating the address:', error);
      const errorResponse = {
        message: 'An error occurred while creating the address.',
      };
      res.status(500).json(errorResponse);
    }
  } else {
    const notAllowedResponse = {
      message: 'Method not allowed.',
    };
    res.status(405).json(notAllowedResponse);
  }
}
