/* eslint-disable no-console */
import { Server } from 'http';
import app from './app';
import config from './app/config';
import mongoose from 'mongoose';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    server = app.listen(config.port, () => {
      console.log(
        `Stack Write Application is running on PORT: ${config.port} 😊`,
      );
    });
  } catch (err) {
    console.log(err);
  }
}

main();

process.on('unhandledRejection', () => {
  console.log(`unhandledRejection is detected. Server is shutting down 😈`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log(`uncaughtException is detected. Server is shutting down 😈`);
  process.exit(1);
});

// Promise.reject();
// console.log(x);
