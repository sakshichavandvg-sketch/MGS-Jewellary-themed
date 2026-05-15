const fs = require('fs')
const path = require('path')

const DATA_DIR = path.join(__dirname, 'data')
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json')
const COLLECTIONS_FILE = path.join(DATA_DIR, 'collections.json')
const OFFERS_FILE = path.join(DATA_DIR, 'offers.json')
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json')
const USERS_FILE = path.join(DATA_DIR, 'users.json')
const RATES_FILE = path.join(DATA_DIR, 'rates.json')

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR)
  }
}

function readJSON(file, defaultValue = []) {
  ensureDataDir()
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, JSON.stringify(defaultValue, null, 2))
    return defaultValue
  }
  try {
    return JSON.parse(fs.readFileSync(file, 'utf-8'))
  } catch {
    return defaultValue
  }
}

function writeJSON(file, data) {
  ensureDataDir()
  fs.writeFileSync(file, JSON.stringify(data, null, 2))
}

// Products
const products = {
  getAll: () => readJSON(PRODUCTS_FILE, []),
  getById: (id) => products.getAll().find(p => p._id === id),
  create: (data) => {
    const list = products.getAll()
    const newProduct = { ...data, _id: Date.now().toString(), createdAt: new Date().toISOString() }
    list.push(newProduct)
    writeJSON(PRODUCTS_FILE, list)
    return newProduct
  },
  update: (id, data) => {
    const list = products.getAll()
    const index = list.findIndex(p => p._id === id)
    if (index === -1) return null
    list[index] = { ...list[index], ...data, updatedAt: new Date().toISOString() }
    writeJSON(PRODUCTS_FILE, list)
    return list[index]
  },
  delete: (id) => {
    const list = products.getAll()
    const filtered = list.filter(p => p._id !== id)
    writeJSON(PRODUCTS_FILE, filtered)
    return true
  }
}

// Collections
const collections = {
  getAll: () => readJSON(COLLECTIONS_FILE, []),
  create: (data) => {
    const list = collections.getAll()
    const newItem = { ...data, _id: Date.now().toString(), createdAt: new Date().toISOString() }
    list.push(newItem)
    writeJSON(COLLECTIONS_FILE, list)
    return newItem
  },
  update: (id, data) => {
    const list = collections.getAll()
    const index = list.findIndex(c => c._id === id)
    if (index === -1) return null
    list[index] = { ...list[index], ...data }
    writeJSON(COLLECTIONS_FILE, list)
    return list[index]
  },
  delete: (id) => {
    const list = collections.getAll()
    const filtered = list.filter(c => c._id !== id)
    writeJSON(COLLECTIONS_FILE, filtered)
    return true
  }
}

// Offers
const offers = {
  getAll: () => readJSON(OFFERS_FILE, []),
  create: (data) => {
    const list = offers.getAll()
    const newItem = { ...data, _id: Date.now().toString(), createdAt: new Date().toISOString() }
    list.push(newItem)
    writeJSON(OFFERS_FILE, list)
    return newItem
  },
  update: (id, data) => {
    const list = offers.getAll()
    const index = list.findIndex(o => o._id === id)
    if (index === -1) return null
    list[index] = { ...list[index], ...data }
    writeJSON(OFFERS_FILE, list)
    return list[index]
  },
  delete: (id) => {
    const list = offers.getAll()
    const filtered = list.filter(o => o._id !== id)
    writeJSON(OFFERS_FILE, filtered)
    return true
  }
}

// Settings
const settings = {
  get: (key) => {
    const all = readJSON(SETTINGS_FILE, {})
    return all[key]
  },
  set: (key, value) => {
    const all = readJSON(SETTINGS_FILE, {})
    all[key] = value
    writeJSON(SETTINGS_FILE, all)
    return value
  },
  getAll: () => readJSON(SETTINGS_FILE, {})
}

// Users
const users = {
  getAll: () => readJSON(USERS_FILE, []),
  findByUsername: (username) => users.getAll().find(u => u.username === username),
  create: (data) => {
    const list = users.getAll()
    const newUser = { ...data, _id: Date.now().toString() }
    list.push(newUser)
    writeJSON(USERS_FILE, list)
    return newUser
  }
}

// Rates
const rates = {
  get: () => readJSON(RATES_FILE, { gold: 0, silver: 0, lastUpdated: null }),
  update: (data) => {
    const updated = { ...data, lastUpdated: new Date().toISOString() }
    writeJSON(RATES_FILE, updated)
    return updated
  }
}

module.exports = {
  products,
  collections,
  offers,
  settings,
  users,
  rates
}