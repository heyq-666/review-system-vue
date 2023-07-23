import { defHttp } from '/@/utils/http/axios';

enum Api {
  list = '/variate/variate/list',
  deleteOne = '/variate/variate/delete',
  gradeList = '/variate/variate/gradeList',
  save = '/variate/variate/addVariate',
  edit = '/variate/variate/editVariate',
  saveScoreSet = '/variate/variate/addScoreSet',
  questionNumList = '/variate/variate/getQuestionNumByClassId',
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

/**
 * 保存
 * @param params
 */
export const saveVariate = (params) => {
  return defHttp.post({ url: Api.save, params });
};
/**
 * 更新
 * @param params
 */
export const updateVariate = (params) => {
  return defHttp.post({ url: Api.edit, params });
};

export const saveScoreSet = (params) => {
  return defHttp.post({ url: Api.saveScoreSet, params });
};

export const questionNumList = (params) => defHttp.get({ url: Api.questionNumList, params });
