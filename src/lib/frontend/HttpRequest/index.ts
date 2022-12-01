import { apiResponse } from "@lib/types/apiResponse"
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"

const instance: AxiosInstance = axios.create()

class HttpRequest {
  private instance: AxiosInstance

  constructor(axiosInstance: AxiosInstance) {
    this.instance = axiosInstance
  }

  public async get(
    url: string,
    config?: AxiosRequestConfig<any>
  ): Promise<apiResponse> {
    try {
      const responseHttpRequest: AxiosResponse<apiResponse> =
        await this.instance.get(url, config)

      if (responseHttpRequest.status === 200) {
        if (responseHttpRequest.data.redirect) {
          return {
            success: true,
            message: responseHttpRequest.data.message,
            redirect: responseHttpRequest.data.redirect
          }
        } else {
          if (responseHttpRequest.data.data) {
            return {
              success: responseHttpRequest.data.success,
              data: responseHttpRequest.data.data,
              message: responseHttpRequest.data.message
            }
          } else {
            return {
              success: responseHttpRequest.data.success,
              message: responseHttpRequest.data.message
            }
          }
        }
      } else {
        return {
          success: false,
          message: responseHttpRequest.data.message
        }
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  public async Post(
    url: string,
    body?: any,
    config?: AxiosRequestConfig<any>
  ): Promise<apiResponse> {
    try {
      const responseHttpRequest: AxiosResponse<apiResponse> =
        await this.instance.post(url, body, config)

      if (responseHttpRequest.status === 200) {
        if (responseHttpRequest.data.redirect) {
          return {
            success: true,
            message: responseHttpRequest.data.message,
            redirect: responseHttpRequest.data.redirect
          }
        } else {
          if (responseHttpRequest.data.data) {
            return {
              success: responseHttpRequest.data.success,
              data: responseHttpRequest.data.data,
              message: responseHttpRequest.data.message
            }
          } else {
            return {
              success: responseHttpRequest.data.success,
              message: responseHttpRequest.data.message
            }
          }
        }
      } else {
        return {
          success: false,
          message: responseHttpRequest.data.message
        }
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  public async Put(
    url: string,
    body?: any,
    config?: AxiosRequestConfig<any>
  ): Promise<apiResponse> {
    try {
      const responseHttpRequest: AxiosResponse<apiResponse> =
        await this.instance.put(url, body, config)

      if (responseHttpRequest.status === 200) {
        if (responseHttpRequest.data.redirect) {
          return {
            success: true,
            message: responseHttpRequest.data.message,
            redirect: responseHttpRequest.data.redirect
          }
        } else {
          if (responseHttpRequest.data.data) {
            return {
              success: responseHttpRequest.data.success,
              data: responseHttpRequest.data.data,
              message: responseHttpRequest.data.message
            }
          } else {
            return {
              success: responseHttpRequest.data.success,
              message: responseHttpRequest.data.message
            }
          }
        }
      } else {
        return {
          success: false,
          data: responseHttpRequest.data.data
        }
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  public async Delete(
    url: string,
    config?: AxiosRequestConfig<any>
  ): Promise<apiResponse> {
    try {
      const responseHttpRequest: AxiosResponse<apiResponse> =
        await this.instance.delete(url, config)

      if (responseHttpRequest.status === 200) {
        if (responseHttpRequest.data.redirect) {
          return {
            success: true,
            message: responseHttpRequest.data.message,
            redirect: responseHttpRequest.data.redirect
          }
        } else {
          if (responseHttpRequest.data.data) {
            return {
              success: responseHttpRequest.data.success,
              data: responseHttpRequest.data.data,
              message: responseHttpRequest.data.message
            }
          } else {
            return {
              success: responseHttpRequest.data.success,
              message: responseHttpRequest.data.message
            }
          }
        }
      } else {
        return {
          success: false,
          message: responseHttpRequest.data.message
        }
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }
}

export default new HttpRequest(instance)
