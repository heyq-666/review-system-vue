import { defHttp } from '/@/utils/http/axios';

enum Api {
  list = '/report/report/list',
  deleteOne = '/report/report/delete',
  reportList = '/report/report/reportGradeList',
}

/**
 * 列表接口
 * @param params
 */
export const list = (params) => defHttp.get({ url: Api.list, params });
/**
 * 删除单个
 */
export const deleteOne = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.deleteOne, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};
/**
 * 分值列表接口
 * @param params
 */
export const reportList = (params) => defHttp.get({ url: Api.reportList, params });
