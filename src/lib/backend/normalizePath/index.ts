const trataQueryParams = async (query: any, path: string): Promise<string> => {
  let copyPath = path

  const arrayParams = Object.keys(query).map(prop => {
    const actualParam = new RegExp(`${prop}=${query[prop]}`, "gi")
    const newParam = `[${prop}]`
    return {
      actualParam,
      newParam
    }
  })

  for (let i = 0; i < arrayParams.length; i++) {
    copyPath = copyPath.replace(
      arrayParams[i].actualParam,
      arrayParams[i].newParam
    )
  }

  return copyPath
}

const normalizePath = async (
  path: string | undefined,
  query: any = {}
): Promise<string> => {
  if (path) {
    let res: string = "/"
    let needadd: boolean = true
    const arrayPath: string[] = path?.slice(1).split("/")
    const evaluate = path.indexOf("?")

    if (evaluate > -1) {
      return await trataQueryParams(query, path)
    } else {
      for (let i = 0; i < arrayPath.length; i++) {
        Object.keys(query).forEach(prop => {
          if (query[prop] === arrayPath[i]) {
            if (i !== arrayPath.length - 1) {
              res += `[${prop}]/`
            } else {
              res += `[${prop}]`
            }
            needadd = false
          } else {
            needadd = true
          }
        })

        if (needadd) {
          if (i !== arrayPath.length - 1) {
            res += `${arrayPath[i]}/`
          } else {
            res += arrayPath[i]
          }
        }
      }

      return res
    }
  } else {
    return ""
  }
}

export default normalizePath
