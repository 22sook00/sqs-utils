/**
 * Date 객체 날짜를 2023-01-01 형식으로 반환
 * @param {Date} date
 * @returns
 */
export const yyyymmdd = date => {
  var mm = date.getMonth() + 1 // getMonth() is zero-based
  var dd = date.getDate()
  return [date.getFullYear() + '-', (mm > 9 ? '' : '0') + mm + '-', (dd > 9 ? '' : '0') + dd].join('')
}

/**
 * Date 객체 날짜를 2023-01-01 15:15:15 형식으로 반환
 * @param {Date} date
 * @returns
 */
export const yyyymmdd_hhmmss = _date => {
  const date = new Date(_date)
  const mm = date.getMonth() + 1 // getMonth() is zero-based
  const dd = date.getDate()
  const yyyymmdd = [date.getFullYear() + '-', (mm > 9 ? '' : '0') + mm + '-', (dd > 9 ? '' : '0') + dd + ' '].join('')

  const hours = (date.getHours() > 9 ? '' : '0') + date.getHours()
  const minutes = (date.getMinutes() > 9 ? '' : '0') + date.getMinutes()
  const seconds = (date.getSeconds() > 9 ? '' : '0') + date.getSeconds()

  return yyyymmdd + hours + ':' + minutes + ':' + seconds
}

export const mmddDay = date => {
  const days = ['일', '월', '화', '수', '목', '금', '토']
  const newDate = new Date(date),
    m = newDate.getMonth() + 1,
    d = newDate.getDate()

  let day = days[newDate.getDay()]
  return `${m}/${d > 9 ? d : '0' + d} (${day})`
}

export const getAvailableDiscountPeriod = (startDate, endDate, period) => {
  const today = yyyymmdd_hhmmss(new Date())
  const discountStartDate = startDate
  const discountEndDate = new Date(endDate)
  discountEndDate.setDate(discountEndDate.getDate() + 1)

  const saleStartDate = period?.startDate
  const saleEndDate = new Date(period?.endDate)
  saleEndDate.setDate(saleEndDate.getDate() + 1)

  const isDiscountAvailable = (discountStartDate < today && yyyymmdd_hhmmss(discountEndDate) > today) || !endDate
  return isDiscountAvailable
}

export const getAvailableSalePeriod = salePeriod => {
  const today = yyyymmdd_hhmmss(new Date())
  const { use, startDate, endDate } = salePeriod
  if (!use) return true
  else if (use && startDate <= today && endDate >= today) return true
  else return false
}

//며칠 뒤 날짜계산
export const calcDateFormat = (date, num, standard = 'after') => {
  // num:며칠뒤로 계산할건지
  let result = new Date(date)
  if (standard === 'after') {
    result.setDate(result.getDate() + num)
  } else {
    result.setDate(result.getDate() - num)
  }
  return yyyymmdd_hhmmss(result)
}

/**
 * axios request 의 Date 객체 -> yyyymmdd_hhmmss 형식으로 format
 * @param {*} data
 * @returns
 */
export const dateTransformer = data => {
  if (data instanceof Date) {
    return yyyymmdd_hhmmss(data)
  }
  if (data instanceof FormData) {
    return data
  }
  if (Array.isArray(data)) {
    return data.map(dateTransformer)
  }
  if (typeof data === 'object' && data !== null) {
    return Object.fromEntries(Object.entries(data).map(([key, val]) => [key, dateTransformer(val)]))
  }
  return data
}
