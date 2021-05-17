import { createWriteStream } from 'fs'
import { pipeline } from 'stream'
import { createTempFile, remove } from 'extra-filesystem'
import getUri from 'get-uri'
import { promisify } from 'util'

export async function downloadImage(uri: string): Promise<string> {
  const stream = await getUri(uri)
  const filename = await createTempFile()

  try {
    await promisify(pipeline)(
      stream
    , createWriteStream(filename)
    )
    return filename
  } catch (e) {
    await remove(filename)
    throw e
  }
}
