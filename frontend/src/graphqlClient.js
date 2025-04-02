import { createClient } from 'graphql-ws';

const wsClient = createClient({
  url: 'ws://localhost:8000/graphql/',
});

export default wsClient;