import { createWriteStream, promises as fs } from 'fs'
import { pipeline } from 'stream'
import { promisify } from 'extra-promise'
import { createTempFile } from 'extra-filesystem'
import getUri = require('get-uri')
const getURI = promisify<NodeJS.ReadableStream>(getUri)

export function downloadImage(uri: string): Promise<string> {
  return new Promise<string>(async (resolve, reject) => {
    try {
      const stream = await getURI(uri)
      const filename = await createTempFile()
      pipeline(
        stream
      , createWriteStream(filename)
      , async err => {
          if (err) {
            await fs.rm(filename)
            reject()
          } else {
            resolve(filename)
          }
        }
      )
    } catch (e) {
      reject(e)
    }
  })
}
