const fs = require('fs')
const pages_related_gtm = require('./file_exists_dict')

function isExistFile(path) {
  console.log('Try', path)

  try {
    fs.statSync(path)
    return true
  } catch(err) {
    return false
    // if (err.code === 'ENOENT') {
    //   return false
    // }
  }
}

const rootPath = './file_exists'
const ext = '.js'

pages_related_gtm.forEach((page) => {
  page.paths.forEach((path) => {
    const dir = rootPath + path
    const file = dir + ext
    console.log('---', path, dir, file)
    if (!isExistFile(dir) && !isExistFile(file)) {
      throw new Error('Error!')
    }
  })
})
