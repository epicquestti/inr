const onlyNumbers = (value: string): string => {
  return value.replace(/\D/g, "")
}

export default onlyNumbers
