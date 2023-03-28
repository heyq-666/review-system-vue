import { defHttp } from '/@/utils/http/axios';

enum Api {
  list = '/variate/variate/list',
  deleteOne = '/variate/variate/delete',
  gradeList = '/variate/variate/gradeList',
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
export const gradeList = (params) => defHttp.get({ url: Api.gradeList, params });
