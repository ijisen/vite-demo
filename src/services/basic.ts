/**
 ==============================================================
 Theme Name:   【公共模块】-请求接口
 Author:  jisen
 Edit Time: 2021/04/29
 ============================================================== */
import request from '/@/utils/request';
import { QueryDynamicAuthCodeParams } from "./data.d";

export async function queryDynamicAuthCode(phone: string, params: QueryDynamicAuthCodeParams): Promise<any> {
  return request({
    url: `/dynamicAuthCode/sendAuth/${phone}`,
    method: 'GET',
    params,
  });
}
