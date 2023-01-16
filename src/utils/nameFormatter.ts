export function nameFormatter(name: string) {
  const nameArray = name.split(' ')
  const formattedName = nameArray[0] + ' ' + nameArray[nameArray.length - 1]
  return formattedName
}
