/* @ts-ignore */
import * as termux from 'termux'
import * as fs from 'fs-extra'
import { UniversalNotification } from '@utils/parse-universal-notification'
import { downloadImage } from '@utils/download-image'
import { getResultPromise } from 'return-style'

export async function notify(notification: UniversalNotification): Promise<void> {
  if (notification.imageUrl) {
    const imageFilename = await getResultPromise(downloadImage(notification.imageUrl))
    try {
      await termux.notification()
        .title(notification.title)
        .content(notification.message)
        .url(notification.url)
        .image(imageFilename)
        .run()
    } finally {
      if (imageFilename) await fs.remove(imageFilename)
    }
  } else {
    await termux.notification()
      .title(notification.title)
      .content(notification.message)
      .url(notification.url)
      .run()
  }
}
