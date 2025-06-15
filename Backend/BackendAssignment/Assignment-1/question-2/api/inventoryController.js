const { readItems, writeItems } = require("./helpers");
const { randomUUID } = require("crypto");

function createItem(req, res, body) {
  const items = readItems();
  const { name, price, size } = JSON.parse(body);

  if (!name || !price || !["s", "m", "l"].includes(size)) {
    return respond(res, 400, { error: "Invalid item data" });
  }

  const newItem = { id: randomUUID(), name, price, size };
  items.push(newItem);
  writeItems(items);

  respond(res, 201, { message: "Item created", data: newItem });
}

function getAllItems(res) {
  const items = readItems();
  respond(res, 200, { data: items });
}

function getItemById(res, id) {
  const items = readItems();
  const item = items.find((i) => i.id === id);
  item
    ? respond(res, 200, { data: item })
    : respond(res, 404, { error: "Item not found" });
}

function updateItem(req, res, id, body) {
  const items = readItems();
  const index = items.findIndex((i) => i.id === id);
  if (index === -1) return respond(res, 404, { error: "Item not found" });

  const updatedData = JSON.parse(body);
  items[index] = { ...items[index], ...updatedData };
  writeItems(items);

  respond(res, 200, { message: "Item updated", data: items[index] });
}

function deleteItem(res, id) {
  let items = readItems();
  const index = items.findIndex((i) => i.id === id);
  if (index === -1) return respond(res, 404, { error: "Item not found" });

  items.splice(index, 1);
  writeItems(items);
  respond(res, 200, { message: "Item deleted" });
}

function respond(res, statusCode, payload) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(payload));
}

module.exports = {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
};
