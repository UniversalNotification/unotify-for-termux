import * as fs from 'fs-extra'
import { UniversalNotification } from '@utils/parse-universal-notification'
import { downloadImage } from '@utils/download-image'
import { getResultPromise } from 'return-style'
import { exec } from 'child_process'
import { parallel } from 'extra-promise'

export async function notify(notification: UniversalNotification): Promise<void> {
  const clean: Array<() => Promise<void>> = []
  const options: string[] = []
  if (notification.title) options.push('--title', escape(notification.title))
  if (notification.message) options.push('--content', escape(notification.message))
  if (notification.url) options.push('--action', escape(`termux-open-url ${escape(notification.url)}`))
  if (notification.imageUrl) {
    const imageFilename = await getResultPromise(downloadImage(notification.imageUrl))
    if (imageFilename) {
      options.push('--image-path', escape(imageFilename))
      clean.push(() => fs.remove(imageFilename))
    }
  }
  exec(`termux-notification ${options.join(' ')}`)
  await parallel(clean)
}

function escape(str: string): string {
  const result = str.replace(/\\/g, '\\\\')
                    .replace(/'/g, "\\'")
  return `'${result}'`
}
