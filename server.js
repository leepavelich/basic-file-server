const net = require('net');
const fs = require('fs');

const server = net.createServer();

server.on('connection', client => {
  console.log('New client connected!');

  client.setEncoding('utf8'); // interpret data as text
  client.on('data', (data) => {
    console.log('File requested: ', data)
    const path = `./${data}`;
    fs.access(path, fs.F_OK, (err) => {
      if (err) {
        console.error(path)
        client.write('File not found')
        return
      }
    
      //file exists
      fs.readFile(path, 'utf8' , (err, data) => {
        if (err) {
          console.error(err)
          return
        }
        client.write(data)
        client.destroy();
      })
      
    })
  });

  client.on('end', () => {
    console.log('Client closed connection.')
  })

  client.on('error', err => {
    console.log(`Error: ${err}`)
  })
});

server.listen(3000, () => {
  console.log('Server listening on port 3000!');
});