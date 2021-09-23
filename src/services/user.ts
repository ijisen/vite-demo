/**
 ==============================================================
 Theme Name:   【用户登录模块】-请求接口
 Author:  jisen
 Edit Time: 2021/04/29
 ============================================================== */
import request from '/@/utils/request';
import { QueryDynamicAuthCodeParams } from "/@/services/data";

export async function queryCurrent(): Promise<any> {
  return request({
    url: '/user/getUserInfo',
    method: 'get'
  });
}

export async function queryMessage(): Promise<any> {
  return request({
    url: '/user/message'
  });
}
