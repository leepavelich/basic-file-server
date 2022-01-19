const net = require('net');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const conn = net.createConnection({
  host: 'localhost', // change to IP address of computer or ngrok host if tunneling
  port: 3000 // or change to the ngrok port if tunneling
});

conn.on('data', data => {
  console.log('Server says: ', data);
});

conn.on('connect', () => {
  rl.question(`Please enter the filename you would like to fetch: \n`, answer => {
    conn.write(`${answer}`);
    rl.close();
  });
});

conn.on('end', () => {
  console.log('Disconnected from server.');
});

conn.setEncoding('utf8'); // interpret data as text