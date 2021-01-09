import * as fs from 'fs-extra'
import { UniversalNotification } from '@utils/parse-universal-notification'
import { downloadImage } from '@utils/download-image'
import { getResultPromise } from 'return-style'
import { spawn } from 'child_process'
import { parallel } from 'extra-promise'
import { waitForEventEmitter } from '@blackglory/wait-for'

export async function notify(notification: UniversalNotification): Promise<void> {
  const clean: Array<() => Promise<void>> = []
  const options: string[] = []
  if (notification.title) options.push('--title', notification.title)
  if (notification.message) options.push('--content', notification.message)
  if (notification.url) options.push('--action', `termux-open-url ${notification.url}`)
  if (notification.imageUrl) {
    const imageFilename = await getResultPromise(downloadImage(notification.imageUrl))
    if (imageFilename) {
      options.push('--image-path', imageFilename)
      clean.push(() => fs.remove(imageFilename))
    }
  }

  const proc = spawn('termux-notification', options, { stdio: 'inherit' })
  await waitForEventEmitter(proc, 'close')

  await parallel(clean)
}
