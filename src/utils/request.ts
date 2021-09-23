/**
 * 自定义 request 网络请求工具,基于axios
 * @author jisen
 */
import axios, { AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElNotification } from 'element-plus';
import router from '/@/router';
import settings from '/@/config/settings';
import { getToken, setToken } from '/@/utils/localToken';

export interface ResponseData {
  code: number;
  data?: any;
  msg?: string;
  token?: string;
}

const customCodeMessage: { [key: number]: string } = {
  1000: '响应成功',
  // 参数错误 #1000～1999
  1001: '参数为空',
  1002: '参数不全',
  1003: '参数类型错误',
  1004: '参数无效',
// 用户错误 #2000～2999
  2000: '用户错误',
  2001: '用户不存在',
  2002: '未登录或登录超时',
  2003: '用户名或密码错误',
  2004: '用户账户已被禁用',
  2005: '用户已存在',
  2006: '验证码错误',
  2048: '用户登录超时',
// 业务错误 #3000～3999
  3000: '业务错误',
  3001: '系统业务出现问题',
// 系统错误 #4000～4999
  4000: '系统错误',
  4001: '系统内部错误',
// 业务错误 #5000～5999
  5000: '业务错误',
  5001: '数据未找到',
  5002: '数据有误',
  5003: '数据已存在',
// 接口错误 #6000～6999
  6000: '接口错误',
  6001: '系统内部接口调用异常',
  6002: '系统外部接口调用异常',
  6003: '接口禁止访问',
  6004: '接口地址无效',
  6005: '接口请求超时',
  6006: '接口负载过高',
// 权限错误 #7000～7999
  7000: '权限错误',
  7001: '没有访问权限'
};

const serverCodeMessage: { [key: number]: string } = {
  200: '服务器成功返回请求的数据',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器(Internal Server Error)',
  502: '网关错误(Bad Gateway)',
  503: '服务不可用，服务器暂时过载或维护(Service Unavailable)',
  504: '网关超时(Gateway Timeout)',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: any) => {
  const { response, message } = error;
  if(message === 'CustomError') {
    // 自定义错误
    const { config, data } = response;
    const { url, baseURL } = config;
    const { code, message } = data;
    const reqUrl = url.split("?")[0].replace(baseURL, '');
    const noVerifyBool = settings.ajaxResponseNoVerifyUrl.includes(reqUrl);
    if(!noVerifyBool) {
      ElNotification({
        type: 'error',
        title: `提示`,
        message: customCodeMessage[code] || message || 'Error',
      });

      if(code === 2002 || code === 2048) {
        router.replace('/user/login');
      }
    }
  } else if(message === 'CancelToken') {
    // 取消请求 Token
    // eslint-disable-next-line no-console
    console.log(message);
  } else if(response && response.status) {
    const errorText = serverCodeMessage[response.status] || response.statusText;
    const { status, request } = response;
    ElNotification({
      type: 'error',
      title: `请求错误 ${ status }: ${ request.responseURL }`,
      message: errorText,
    });
  } else if(!response) {
    ElNotification({
      type: 'error',
      title: '网络异常',
      message: '您的网络发生异常，无法连接服务器',
    });
  }

  return Promise.reject(error);
}

/**
 * 配置request请求时的默认参数
 */
const request = axios.create({
  // baseURL: process.env.VUE_APP_API_HOST, // url = api url + request url
  withCredentials: true, // 当跨域请求时发送cookie
  timeout: 0 // 请求超时时间,5000(单位毫秒) / 0 不做限制
});

// 全局设置 - post请求头
// request.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

/**
 * 请求前
 * 请求拦截器
 */
request.interceptors.request.use(
  async (config: AxiosRequestConfig & { cType?: boolean }) => {

    // 如果设置了cType 说明是自定义 添加 Content-Type类型 为自定义post 做铺垫
    if(config['cType']) {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
    }

    // 自定义添加token header
    const headerToken = await getToken();
    if(headerToken) {
      config.headers[settings.ajaxHeadersTokenKey] = headerToken;
    }

    return config;
  },
  /* error=> {} */ // 已在 export default catch
);

/**
 * 请求后
 * 响应拦截器
 */
request.interceptors.response.use(
  async (response: AxiosResponse) => {

    const res: ResponseData = response.data;
    const { code, token } = res;

    // 自定义状态码验证
    if(code !== 1000) {
      return Promise.reject({
        response,
        message: 'CustomError',
      });
    }

    // 重置刷新token
    if(token) {
      await setToken(token);
    }

    return response;
  },
  /* error => {} */ // 已在 export default catch
);

/**
 * ajax 导出
 *
 * Method: get
 *     Request Headers
 *         无 - Content-Type
 *     Query String Parameters
 *         name: name
 *         age: age
 *
 * Method: post
 *     Request Headers
 *         Content-Type:application/json;charset=UTF-8
 *     Request Payload
 *         { name: name, age: age }
 *         Custom config parameters
 *             { cType: true }  Mandatory Settings Content-Type:application/json;charset=UTF-8
 * ......
 */
export default function (config: AxiosRequestConfig): AxiosPromise<any> {
  return request(config).then((response: AxiosResponse) => response.data).catch(error => errorHandler(error));
}
