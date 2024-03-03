const sanitizeUser = (user) => {
  // data yang akan disaring atau dihapus
  const deleteFields = ['password', 'createdAt', 'updatedAt', 'role_id']
  // menghapus data
  deleteFields.forEach((field) => {
    delete user[field]
  })
  return user
}

module.exports = {
  sanitizeUser
}
