import { v4 as uuidv4 } from "uuid"

// BLOCK WORDS

export const blockWords = (initialPhrase: string, wordList: string[], tokenize = false): string => {
  // replacer = {
  //    forbiddenWord1: "XXXX",
  //    forbidenWord2: "XXXX",
  //    forbidenWord3: "XXXX",
  //    ...
  //  }
  const replacers = wordList.reduce((inputs: Record<string, number>, data) => {
    if (tokenize) {
      Object.assign(inputs, { [data.toLowerCase()]: uuidv4() })
    } else {
      Object.assign(inputs, { [data.toLowerCase()]: "XXXX" })
    }
    return inputs
  }, {})

  const stringArr = initialPhrase.split(/[^a-zàâçéèêëîïôûùüÿñæœA-Z0-9_]/)
  const result = stringArr
    .map((word) => {
      return replacers[word.toLowerCase()] || word
    })
    .join(" ")

  return result
}
