import connectToDatabase from './database.js'

connectToDatabase()
  .then(() => console.log('Database initialized'))
  .catch(console.error)
