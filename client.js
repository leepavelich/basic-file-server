const net = require('net');
const readline = require('readline');
const fs = require('fs')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const conn = net.createConnection({
  host: 'localhost', // change to IP address of computer or ngrok host if tunneling
  port: 3000 // or change to the ngrok port if tunneling
});

conn.on('connect', () => {
  rl.question(`Please enter the filename you would like to fetch: \n`, answer => {
    conn.write(`${answer}`);
    conn.on('data', data => {
      if (data !== 'File not found') {
        fs.writeFile(`downloads/${answer}`, data, err => {
          if (err) return console.error(err);
          console.log(`${answer} saved to downloads/`)
        })
      } else {
        console.log(data)
      }
    });

    rl.close();
  });
});

conn.on('end', () => {
  console.log('Disconnected from server.');
});

conn.setEncoding('utf8'); // interpret data as text