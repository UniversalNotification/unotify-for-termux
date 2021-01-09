import * as fs from 'fs-extra'
import { file } from 'tmp-promise'
import { pipeline } from 'stream'
import { promisify } from 'extra-promise'
import getUri = require('get-uri')
const getURI = promisify<NodeJS.ReadableStream>(getUri)

export function downloadImage(uri: string): Promise<string> {
  return new Promise<string>(async (resolve, reject) => {
    try {
      const stream = await getURI(uri)
      const { path, cleanup } = await file()
      pipeline(
        stream
      , fs.createWriteStream(path)
      , async err => {
          if (err) {
            await cleanup()
            reject()
          } else {
            resolve(path)
          }
        }
      )
    } catch (e) {
      reject(e)
    }
  })
}
