
import mongoose from 'mongoose';

function closeDatabase() {
  mongoose.connection.close(() => {
    console.log('Database is disconnected.');
    process.exit(0);
  });
}

async function setupDatabase() {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log('Database is connected.');
  }
  catch (error) {
    console.log('### DATABASE ERROR ###', error);
    console.log('[[[[[[[[[[[[[[[[[[[[[[[', process.env.DATABASE);
  }
  finally {
    process.on('SIGINT', closeDatabase);
  }
}

export default setupDatabase;