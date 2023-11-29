import app from './app';
import { ServerBootstrap } from './bootstrap/server.bootstrap';

const server = new ServerBootstrap(app);

(async () => {
  try {
    const listPromisesBootstrap = [];
    listPromisesBootstrap.push(server.initialize());

    await Promise.all(listPromisesBootstrap);
  } catch (error: any) {
    console.log(`Error occurred: ${error.message}`);
  }
})();
