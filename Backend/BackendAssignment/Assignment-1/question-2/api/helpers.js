const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "items.json");

function readItems() {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeItems(items) {
  fs.writeFileSync(filePath, JSON.stringify(items, null, 2));
}

module.exports = { readItems, writeItems };
