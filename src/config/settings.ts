/**
 * 站点配置
 */
export interface SettingsType {
    /**
     * 站点名称
     */
    siteTitle: string;

    /**
     * 顶部菜单开启
     */
    topNavEnable: boolean;

    /**
     * 站点本地存储Token 的 Key值
     */
    siteTokenKey: string;

    /**
     * Ajax请求头发送Token 的 Key值
     */
    ajaxHeadersTokenKey: string;

    /**
     * Ajax返回值不参加统一验证的api地址
     */
    ajaxResponseNoVerifyUrl: string[];

    /**
     * iconfont.cn 项目在线生成的 js 地址
     */
    iconfontUrl: string[];
}

const settings: SettingsType = {
    siteTitle: 'vue3-element-ts',
    topNavEnable: false,
    siteTokenKey: 'vue3-element-ts_token',
    ajaxHeadersTokenKey: 'x-token',
    ajaxResponseNoVerifyUrl: [
        '/user/login', // 用户登录
        '/user/getUserInfo', // 获取用户信息
    ],
    iconfontUrl: [],
};

export default settings;
