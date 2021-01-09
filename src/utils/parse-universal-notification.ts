import { getResult } from 'return-style'
import Ajv, { JSONSchemaType } from 'ajv'
import addFormats from 'ajv-formats'

export interface UniversalNotification {
  title?: string
  message?: string
  iconUrl?: string
  imageUrl?: string
  url?: string
}

const ajv = new Ajv()
addFormats(ajv, ['uri'])

// https://github.com/UniversalNotification/spec
const schema: JSONSchemaType<UniversalNotification> = {
  $schema: 'http://json-schema.org/draft-07/schema#'
, title: 'UniversalNotification'
, type: 'object'
, properties: {
    title: { type: 'string', nullable: true }
  , message: { type: 'string', nullable: true }
  , iconUrl: { type: 'string', format: 'uri', nullable: true }
  , imageUrl: { type: 'string', format: 'uri', nullable: true }
  , url: { type: 'string', format: 'uri', nullable: true }
  }
, required: []
, additionalProperties: true
}
const validate = ajv.compile(schema)

export function parseUniversalNotification(text: string): UniversalNotification | null {
  const obj = getResult<object>(() => JSON.parse(text))
  if (obj && validate(obj)) {
    return obj
  } else {
    return null
  }
}
