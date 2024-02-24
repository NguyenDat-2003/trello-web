export const capitallizeFirstLetter = (val) => {
  if (!val) return ''
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
}

// console.log(capitallizeFirstLetter('trungquandev'))
