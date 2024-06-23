import { format } from 'date-fns'

export const formatDate = (dateStr, formatStr) => {
  const formattedDate = dateStr ? new Date(dateStr.replace(/-/g, '/')) : new Date()
  return format(formattedDate, formatStr || 'yyyy.MM.dd HH:mm:ss')
}

export const formatYYYYMMDD = dateStr => {
  const formattedDate = dateStr ? new Date(dateStr.replace(/-/g, '/')) : new Date()
  return format(formattedDate, 'yyyy.MM.dd')
}

export const formatPhone = phoneNumberStr => {
  return phoneNumberStr.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)
}

export const formatOrderNo = no => {
  return no.replace(/(\d{8})(?=\d)/g, '$1-')
}
