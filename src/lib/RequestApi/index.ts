import axios, { AxiosInstance, AxiosResponse } from "axios"

const instance: AxiosInstance = axios.create()

type options = {
  pathname: string
  query?: any
}
interface IResponse {
  success: boolean
  data?: any
  message?: string
  redirect?: options
}

class HttpRequest {
  private instance: AxiosInstance

  constructor(axiosInstance: AxiosInstance) {
    this.instance = axiosInstance
  }

  public async Get(
    url: string,
    query: any = null,
    param?: number
  ): Promise<IResponse> {
    if (query && param) {
      console.log("query e param não podem ser passados juntos.")
      return {
        success: false,
        message: "query e param não podem ser passados juntos."
      }
    }

    if (query) {
      let queryPath = "?"

      Object.keys(query).forEach((key, index, array) => {
        if (index < array.length - 1) queryPath += `${key}=${query[key]}&`
        else queryPath += `${key}=${query[key]}`
      })

      try {
        const responseHttpRequest: AxiosResponse<any> = await this.instance.get(
          `${url}${queryPath}`
        )

        if (responseHttpRequest.status === 200)
          return {
            success: responseHttpRequest.data.success,
            data: responseHttpRequest.data.data,
            message: responseHttpRequest.data.message,
            redirect: responseHttpRequest.data.redirect
          } as IResponse
        else
          return {
            success: false,
            message: responseHttpRequest.statusText,
            redirect: responseHttpRequest.data.redirect
          } as IResponse
      } catch (error) {
        return {
          success: false,
          message: error
        } as IResponse
      }
    }

    if (param) {
      try {
        const responseHttpRequest: AxiosResponse<any> = await this.instance.get(
          `${url}/${param}`
        )

        if (responseHttpRequest.status === 200)
          return {
            success: responseHttpRequest.data.success,
            data: responseHttpRequest.data.data,
            message: responseHttpRequest.data.message,
            redirect: responseHttpRequest.data.redirect
          } as IResponse
        else
          return {
            success: false,
            message: responseHttpRequest.statusText,
            redirect: responseHttpRequest.data.redirect
          } as IResponse
      } catch (error) {
        return {
          success: false,
          message: error
        } as IResponse
      }
    }

    try {
      const responseHttpRequest: AxiosResponse<any> = await this.instance.get(
        url
      )

      if (responseHttpRequest.status === 200)
        return {
          success: responseHttpRequest.data.success,
          data: responseHttpRequest.data.data,
          message: responseHttpRequest.data.message,
          redirect: responseHttpRequest.data.redirect
        } as IResponse
      else
        return {
          success: false,
          message: responseHttpRequest.statusText,
          redirect: responseHttpRequest.data.redirect
        } as IResponse
    } catch (error) {
      return {
        success: false,
        message: error
      } as IResponse
    }
  }

  public async Post(
    url: string,
    body?: any,
    param?: number
  ): Promise<IResponse> {
    try {
      let responseHttpRequest: AxiosResponse<any>

      if (param)
        responseHttpRequest = await this.instance.post(`${url}/${param}`, body)
      else responseHttpRequest = await this.instance.post(url, body)

      if (responseHttpRequest.status === 200)
        return {
          success: responseHttpRequest.data.success,
          data: responseHttpRequest.data.data,
          message: responseHttpRequest.data.message,
          redirect: responseHttpRequest.data.redirect
        } as IResponse
      else
        return {
          success: false,
          message: responseHttpRequest.statusText,
          redirect: responseHttpRequest.data.redirect
        } as IResponse
    } catch (error) {
      return {
        success: false,
        message: error
      } as IResponse
    }
  }

  public async Put(
    url: string,
    param?: number,
    body?: any
  ): Promise<IResponse> {
    try {
      let responseHttpRequest: AxiosResponse<any>

      if (param)
        responseHttpRequest = await this.instance.put(`${url}/${param}`, body)
      else responseHttpRequest = await this.instance.put(url, body)

      if (responseHttpRequest.status === 200)
        return {
          success: responseHttpRequest.data.success,
          data: responseHttpRequest.data.data,
          message: responseHttpRequest.data.message,
          redirect: responseHttpRequest.data.redirect
        } as IResponse
      else
        return {
          success: false,
          message: responseHttpRequest.statusText,
          redirect: responseHttpRequest.data.redirect
        } as IResponse
    } catch (error) {
      return {
        success: false,
        message: error
      } as IResponse
    }
  }

  public async Delete(url: string, param?: number): Promise<IResponse> {
    try {
      let responseHttpRequest: AxiosResponse<any>

      if (param)
        responseHttpRequest = await this.instance.delete(`${url}/${param}`)
      else responseHttpRequest = await this.instance.delete(url)

      if (responseHttpRequest.status === 200)
        return {
          success: responseHttpRequest.data.success,
          data: responseHttpRequest.data.data,
          message: responseHttpRequest.data.message,
          redirect: responseHttpRequest.data.redirect
        } as IResponse
      else
        return {
          success: false,
          message: responseHttpRequest.statusText,
          redirect: responseHttpRequest.data.redirect
        } as IResponse
    } catch (error) {
      return {
        success: false,
        message: error
      } as IResponse
    }
  }
}

export default new HttpRequest(instance)
