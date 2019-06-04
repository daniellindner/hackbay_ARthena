const net = require('net');
const server = net.createServer((c:any) => {
  // 'connection' listener
  console.log('client connected');
  c.on('end', () => {
    console.log('client disconnected');
  });
  c.write('hello\r\n');
  setInterval(() => {
    c.write(`${JSON.stringify({this: "is a test"})}\n`)
  }, 2000)

  c.on("data", (data:any) => {
      console.log(data.toString())
  })
});

server.on('error', (err:any) => {
  console.log(err);
});

server.listen(9000, () => {
  console.log('server bound');
});