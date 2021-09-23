/**
 ==============================================================
 Theme Name:   请求接口-类型定义文件
 Author:  jisen
 Edit Time: 2021/04/29
 ============================================================== */

export interface QueryDynamicAuthCodeParams {
  sn: number;
}

export interface QueryDynamicAuthCodeRes {
  success: boolean;
  type?: string;
  message: string
}
