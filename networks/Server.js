import TcpSocket from 'react-native-tcp-socket';

const serverPort = 9919;
const serverHost = '0.0.0.0';
let server;
let client;

const RunServer = () => {
  server = TcpSocket.createServer((socket) => {
    console.log('server connected on ' + JSON.stringify(socket.address()));

    socket.on('data', (data) => {
      console.log('Server Received: ' + data);
      socket.write('Echo server\r\n');
    });

    socket.on('error', (error) => {
      console.log('server client error ' + error);
    });

    socket.on('close', (error) => {
      console.log('server client closed ' + (error ? error : ''));
    });
  }).listen(
    {port: serverPort, host: serverHost, reuseAddress: true},
    (address) => {
      console.log('opened server on ' + JSON.stringify(address));
    },
  );

  server.on('error', (error) => {
    console.log('Server error ' + error);
  });

  server.on('close', () => {
    console.log('server close');
  });
};

const RunClient = () => {
  client = TcpSocket.createConnection(
    {
      port: serverPort,
      host: serverHost,
      localAddress: '127.0.0.1',
      reuseAddress: true,
      // localPort: 20000,
      // interface: "wifi",
      // tls: true
    },
    (address) => {
      console.log('opened client on ' + JSON.stringify(address));
      client.write('Hello, server! Love, Client.');
    },
  );

  client.on('data', (data) => {
    console.log('Client Received: ' + data);
    // client.destroy(); // kill client after server's response
    server.close();
  });

  client.on('error', (error) => {
    console.log('client error ' + error);
  });

  client.on('close', () => {
    console.log('client close');
  });
};

export {RunClient, RunServer};