const fs = require('file-system')
const join = require('path').join
const markdownlint = require('markdownlint')


/**
 * 搜索所有markdown文件
 * @param startPath
 * @param excludeDir
 * @returns {Array}
 */
function findMarkdownFiles (startPath, excludeDir) {
  let result = []
  excludeDir = excludeDir || []

  function finder (path) {
    let files = fs.readdirSync(path)
    files.forEach((val, index) => {
      if (excludeDir.indexOf(path) > -1) {
        return
      }
      let fPath = join(path, val)
      let stats = fs.statSync(fPath)
      if (stats.isDirectory()) {
        finder(fPath)
      }
      if (stats.isFile() && fPath.split('.').slice(-1)[0] === 'md') {
        result.push(fPath)
      }
    })

  }

  finder(startPath)
  return result
}

let excludeDir = ['_book', 'assets', 'build', 'node_modules']
let fileNames = findMarkdownFiles('./', excludeDir)

const options = {
  'files': fileNames,
  'strings': {
  },
  'config': markdownlint.readConfigSync('.mdlint.json')
}

markdownlint(options, function callback (err, result) {
  if (!err) {
    let res = result.toString()
    if (res.length > 0) {
      throw Error(res)
    } else {
      console.log('mdlint pass.')
    }
  }
})