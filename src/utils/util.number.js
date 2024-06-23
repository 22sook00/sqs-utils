export const digits = value => String(value).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')

export const convertOrderNum = no => no.toString().replace(/(\d{8})(?=\d)/g, '$1-')

export const convertPriceLastZero = amount => Math.floor(+amount / 10) * 10

export const convertPhone = phoneNumberStr => {
  return phoneNumberStr.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)
}

export const guid = () => {
  let s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }
  //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
}

export const randomId = () => {
  var text = ''
  var possible_alpahbat = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  text += possible_alpahbat.charAt(Math.floor(Math.random() * possible_alpahbat.length))
  for (var i = 0; i < 4; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return text
}

export const formatFileSize = fileSize => {
  if (fileSize >= 1073741824) {
    fileSize = (fileSize / 1073741824).toFixed(2) + ' GB'
  } else if (fileSize >= 1048576) {
    fileSize = (fileSize / 1048576).toFixed(2) + ' MB'
  } else if (fileSize >= 1024) {
    fileSize = (fileSize / 1024).toFixed(2) + ' KB'
  } else if (fileSize > 1) {
    fileSize = fileSize + ' bytes'
  } else if (fileSize === 1) {
    fileSize = fileSize + ' byte'
  } else {
    fileSize = '0 byte'
  }
  return fileSize
}

//마이페이지 주문 배달비 & 옵션프라이스 & 토탈프라이스 계산
export const myOrderPriceFunc = (priceArr = [], returnPriceArr = []) => {
  const totalProductPricesWithoutSale = priceArr.reduce((acc, cur) => {
    return acc + (cur.product.optionPrice + cur.product.productPrice) * cur.quantity
  }, 0)
  const totalProductPriceWithSale = priceArr.reduce((acc, cur) => {
    return acc + (cur.product.optionPrice + cur.product.productPrice - cur.product.discountAmount) * cur.quantity
  }, 0)
  const totalDiscount = priceArr.reduce((acc, cur) => {
    return acc + cur.product.discountAmount * cur.quantity
  }, 0)

  const totalReturnDeliveryPrice = returnPriceArr.reduce((acc, cur) => {
    return acc + cur.info?.returnDeliveryPrice
  }, 0)

  return {
    totalProductPricesWithoutSale,
    totalProductPriceWithSale,
    totalDiscount,
    totalReturnDeliveryPrice,
  }
}

export const formatNumberWithPlus = num => {
  if (!num) return '0'
  else return num > 999 ? '999+' : num.toString()
}
