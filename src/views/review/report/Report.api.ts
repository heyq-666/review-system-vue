import { defHttp } from '/@/utils/http/axios';

enum Api {
  list = '/report/report/list',
  deleteOne = '/report/report/delete',
  reportList = '/report/report/reportGradeList',
  save = '/report/report/addReport',
  edit = '/report/report/editReport',
  saveReportSet = '/report/report/saveReportSet',
  reportSetList = '/report/report/reportSetList',
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

/**
 * 保存
 * @param params
 */
export const saveReport = (params) => {
  return defHttp.post({ url: Api.save, params });
};
/**
 * 更新
 * @param params
 */
export const updateReport = (params) => {
  return defHttp.post({ url: Api.edit, params });
};
export const saveReportSet = (params) => {
  return defHttp.post({ url: Api.saveReportSet, params });
};
export const reportSetList = (params) => defHttp.get({ url: Api.reportSetList, params });
