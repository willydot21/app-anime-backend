
import mongoose from 'mongoose';
import properties from './properties';

function closeDatabase() {
  mongoose.connection.close(() => {
    console.log('Database is disconnected.');
    process.exit(0);
  });
}

async function setupDatabase() {
  try {
    await mongoose.connect(properties.database);
    console.log('Database is connected.');
  }
  catch (error) {
    console.log('[**DATABASE ERROR**]', error);
  }
  finally {
    process.on('SIGINT', closeDatabase);
  }
}

export default setupDatabase;