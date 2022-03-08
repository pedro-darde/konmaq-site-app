import axios, { AxiosResponse, AxiosInstance, AxiosRequestConfig } from "axios";
import useAlert from "../hooks/useAlert";

export type PrimitiveDate<Type> = {
  [Key in keyof Type]: Type[Key] extends Date ? string : Type[Key];
};

interface IPrimitiveData {
  id: number;
}

export interface IPaginationFilter {
  top: number;
  skip: number;
}

class BaseService {
  private axiosClient: AxiosInstance;
  private alert = useAlert();
  constructor() {
    this.axiosClient = axios.create({
      baseURL: "http://localhost:3335/api/",
    });

    this.axiosClient.interceptors.request.use(
      (request) => {
        console.log(request.url)
        return Promise.resolve(request)
      },
      (error) => {
        if (error.response && error.response.data) {
          this.alert.fire(error.response.data.error);
        } else {
          this.alert.fire("Ocorreu um erro interno");
        }
        return Promise.reject(error);
      }
    );

    this.axiosClient.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.data) {
          this.alert.fire(error.response.data.error);
        } else {
          this.alert.fire("Ocorreu um erro interno");
        }
        return Promise.reject(error);
      }
    );
  }

  public get<Type>(
    modelName: string,
    query?: any
  ): Promise<AxiosResponse<Type>> {
    return this.axiosClient.get(`${modelName}`, {
      params: query,
    });
  }

  public getById<Type extends IPrimitiveData>(
    modelName: string,
    route: string,
    id: number
  ): Promise<AxiosResponse<Type>> {
    return this.axiosClient.get(`${modelName}/${route}/${id}`);
  }

  public post<Type, Response>(
    modelName: string,
    data: Type,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Response>> {
    return this.axiosClient.post(`${modelName}`, data, config);
  }

  public patch<Type, Response>(
    modelName: string,
    id: string,
    data: Type
  ): Promise<AxiosResponse<Response>> {
    return this.axiosClient.patch(`${modelName}/${id}`, data);
  }

  public delete<Type>(
    modelName: string,
    id: number,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Response>> {
    return this.axiosClient.delete(`${modelName}/${id}`, config);
  }

  //   public async getToken() {
  //     if (await AsyncStorage.getItem("userLogado")) {
  //       let userLogado = await AsyncStorage.getItem("userLogado");
  //       return JSON.parse(userLogado!);
  //     }
  //     return "";
  //   }

  //   public async getUserLoggedId() {
  //     const user = await AsyncStorage.getItem("userLogado");

  //     return user ? JSON.parse(user!) : "";
  //   }
}

const baseService = new BaseService();

export { baseService };
