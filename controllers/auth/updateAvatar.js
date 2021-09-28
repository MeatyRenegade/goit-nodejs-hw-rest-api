const fs = require('fs/promises')
const Jimp = require('jimp')
const path = require('path')
const { Unauthorized } = require('http-errors')

const { User } = require('../../models')
const avatarsDir = path.join(__dirname, '../../', 'public/avatars')

const updateAvatar = async (req, res) => {
  const { id } = req.params
  const { path: tempPath, originalname } = req.file
  const uploadPath = path.join(avatarsDir, id, originalname)
  try {
    const file = await Jimp.read(tempPath)
    await file.resize(250, 250).write(tempPath)

    await fs.rename(tempPath, uploadPath)

    const avatarUrl = `/public/avatars/${id}/${originalname}`
    await User.findByIdAndUpdate(id, { avatarUrl })

    res.json({
      status: 'succes',
      code: 200,
      data: {
        result: avatarUrl,
      },
    })
  } catch (error) {
    await fs.unlink(tempPath)
    throw new Unauthorized()
  }
}

module.exports = updateAvatar
