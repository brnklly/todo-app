const mongoose = require('mongoose');
const config = require('config');

module.exports = connectDB = async () => {
  try {
    await mongoose.connect(
      config.get('mongoURI'),
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      () => console.log('MongoDB connected')
    );
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};
