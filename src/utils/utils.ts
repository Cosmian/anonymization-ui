import { EncryptedEmployee } from "../Views/Anonymization";

export type EncryptedElement = { marketing: string, hr: string, key: number };

export type Step = "clear" | "encrypt" | "index";

export const uint8ArrayEquals = (
    a: Uint8Array | null,
    b: Uint8Array | null,
  ): boolean => {
    if (a === null && b === null) return true
    if (a === null) return false
    if (b === null) return false

    if (a.length !== b.length) return false

    for (const index in a) {
      if (a[index] !== b[index]) return false
    }

  return true
}

export const encodeEncryptedDatabase = (data: EncryptedEmployee[] | undefined): EncryptedElement[] | undefined => {
  if (data) {
    return data.map((employee) => {
      return {
        ...employee,
        marketing: new TextDecoder().decode(employee.marketing),
        hr:  new TextDecoder().decode(employee.hr)
      }
    })
  }
}


export const intersection = (arrays: number[][]): number[] => {
  if (arrays.length === 0) {
    return []
  }
  if (arrays.length === 1) {
    return arrays[0]
  }
  return arrays[0].reduce((result: number[], element) => {
    if (arrays.every((array) => array.includes(element))) {
      result.push(element)
    }
    return result
  }, [])
}
