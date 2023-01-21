import dayjs from 'dayjs'

export function ageFormatter(birthDate: string) {
  const birth = dayjs(birthDate)
  const today = dayjs()
  const diference = today.diff(birth, 'month')
  let age

  if (diference <= 12) {
    age = diference + ' meses'
  } else {
    age = (diference / 12).toFixed() + ' anos'
  }

  return age
}
