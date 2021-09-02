const fs = require('fs/promises')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const filePath = path.join(__dirname, './contacts.json')

const update = async data => {
  await fs.writeFile(filePath, JSON.stringify(data))
}

const listContacts = async () => {
  const data = await fs.readFile(filePath)
  return JSON.parse(data)
}

const getContactById = async contactId => {
  const contacts = await listContacts()
  const selectedContact = contacts.find(item => item.id === contactId)
  if (!selectedContact) {
    return null
  }
  return selectedContact
}

const removeContact = async contactId => {
  const contacts = await listContacts()
  const index = contacts.findIndex(item => item.id === contactId)
  if (index === -1) {
    return null
  }
  const newContacts = contacts.filter(item => item.id !== contactId)
  await update(newContacts)
  return contacts[index]
}

const addContact = async body => {
  const contacts = await listContacts()
  const newContact = { id: uuidv4(), ...body }
  contacts.push(newContact)
  await update(contacts)
  return newContact
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts()
  const index = contacts.findIndex(item => item.id === contactId)
  if (index === -1) {
    return null
  }
  contacts[index] = { ...contacts[index], ...body }
  await update(contacts)
  return contacts[index]
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
