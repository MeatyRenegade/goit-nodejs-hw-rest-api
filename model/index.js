const fs = require('fs/promises')
const path = require('path')

const contactsPath = path.join(__dirname, './contacts.json')

const update = async contacts => {
  const contactsToString = JSON.stringify(contacts)
  await fs.writeFile(contactsPath, contactsToString)
}

const listContacts = async () => {
  const data = await fs.readFile(contactsPath)
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
    throw new Error(`Contact with id=${contactId} not found`)
  }
  const newContacts = contacts.filter(item => item.id !== contactId)
  await fs.writeFile(contactsPath, JSON.stringify(newContacts))
  return contacts[index]
}

const addContact = async body => {
  const contacts = await listContacts()
  const { id, name, email, phone } = body
  const newContact = {
    id,
    name,
    email,
    phone,
  }
  contacts.push(newContact)
  await update(contacts)
  return newContact
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts()
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
