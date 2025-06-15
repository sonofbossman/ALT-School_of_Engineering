const http = require('http');
const { createItem, getAllItems, getItemById, updateItem, deleteItem } = require('./api/inventoryController');

const server = http.createServer((req, res) => {
  if (req.url === '/items' && req.method === 'GET') {
    getAllItems(res);
  }
  else if (req.url === '/items' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => createItem(req, res, body));
  }
  else if (req.url.startsWith('/items/') && req.method === 'GET') {
    const id = req.url.split('/')[2];
    getItemById(res, id);
  }
  else if (req.url.startsWith('/items/') && req.method === 'PUT') {
    const id = req.url.split('/')[2];
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => updateItem(req, res, id, body));
  }
  else if (req.url.startsWith('/items/') && req.method === 'DELETE') {
    const id = req.url.split('/')[2];
    deleteItem(res, id);
  }
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Route not found' }));
  }
});

server.listen(4000, () => {
  console.log('API Server running at http://localhost:4000');
});
