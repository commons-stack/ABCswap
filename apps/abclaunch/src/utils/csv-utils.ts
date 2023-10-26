export function csvStringToArray(strData: string, strDelimiter: string = '\t'): string[][] {
  const objPattern = new RegExp(
    '(\\' +
      strDelimiter +
      '|\\r?\\n|\\r|^)' +
      '(?:"([^"]*(?:""[^"]*)*)"|' +
      '([^"\\' +
      strDelimiter +
      '\\r\\n]*))',
    'gi'
  )

  let arrData: string[][] = [[]]
  let arrMatches: RegExpExecArray | null = null

  while ((arrMatches = objPattern.exec(strData.trim()))) {
    const strMatchedDelimiter: string = arrMatches[1]
    if (strMatchedDelimiter.length && strMatchedDelimiter !== strDelimiter) {
      arrData.push([])
    }

    let strMatchedValue: string

    if (arrMatches[2]) {
      strMatchedValue = arrMatches[2].replace(new RegExp('""', 'g'), '"')
    } else {
      strMatchedValue = arrMatches[3]
    }

    arrData[arrData.length - 1].push(strMatchedValue)
  }

  return arrData
}

export function readFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fr = new FileReader()
    fr.onload = () => {
      resolve(fr.result as string) // Ensure the result is treated as a string
    }
    fr.onerror = (error) => {
      reject(error) // Handle the error event
    }
    fr.readAsText(file)
  })
}

export const removeCSVHeaders = (text: string): string => text.substring(text.indexOf('\n') + 1)
