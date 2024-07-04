// src/tests/functionUpdate.test.js
beforeAll(async (done) => {
    console.log('BeforeAll Hook: Started');
    try {
      console.log('Step 1: Attempting to connect to test database...');
      await connectDB();
      console.log('Step 2: MongoDB connected...');
      const db = mongoose.connection;
      db.on('error', console.error.bind(console, 'connection error:'));
      db.once('open', async () => {
        console.log('Awaiting database connection...');
        // Add any additional setup needed here
        console.log('BeforeAll Hook: Completed');
        done();
      });
    } catch (error) {
      console.error('Error in BeforeAll Hook:', error);
      done(error);
    }
  });
  
  afterAll(async (done) => {
    console.log('AfterAll Hook: Started');
    try {
      console.log('Step 9: Attempting to drop test database...');
      await mongoose.connection.dropDatabase();
      console.log('Step 10: Test database dropped successfully.');
      await mongoose.connection.close();
      console.log('Step 11: Database connection closed.');
      console.log('AfterAll Hook: Completed');
      done();
    } catch (error) {
      console.error('Error in AfterAll Hook:', error);
      done(error);
    }
  });
  