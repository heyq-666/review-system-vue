import { defHttp } from '/@/utils/http/axios';
import { useMessage } from '/@/hooks/web/useMessage';

const { createConfirm } = useMessage();

export enum Api {
  list = '/reviewClass/reviewClass/list',
  save = '/reviewClass/reviewClass/add',
  edit = '/reviewClass/reviewClass/edit',
  deleteOne = '/reviewClass/reviewClass/delete',
  deleteBatch = '/reviewClass/reviewClass/deleteBatch',
  importExcel = '/reviewClass/reviewClass/importExcel',
  exportXls = '/reviewClass/reviewClass/exportXls',
  reviewQuestionList = '/reviewQuestion/reviewQuestion/listReviewQuestionByMainId',
  reviewQuestionSave = '/reviewQuestion/reviewQuestion/addReviewQuestion',
  reviewQuestionEdit = '/reviewQuestion/reviewQuestion/editReviewQuestion',
  reviewQuestionDelete = '/reviewQuestion/reviewQuestion/deleteReviewQuestion',
  reviewQuestionDeleteBatch = '/reviewQuestion/reviewQuestion/deleteBatchReviewQuestion',
  publishBatch = '/reviewClass/reviewClass/publishBatch',
  reviewAnswerList = '/reviewQuestion/reviewQuestion/reviewAnswerList',
  saveReportConf = '/reviewClass/reviewClass/saveReportConf',
  deleteReportConf = '/reviewClass/reviewClass/deleteReportConf',
  reviewReportList = '/reviewClass/reviewClass/reviewReportList',
  saveQuestion = '/reviewQuestion/reviewQuestion/addQuestion',
  editQuestion = '/reviewQuestion/reviewQuestion/editQuestion',
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
 * 批量删除
 * @param params
 */
export const batchDelete = (params, handleSuccess) => {
  createConfirm({
    iconType: 'warning',
    title: '确认删除',
    content: '是否删除选中数据',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.delete({ url: Api.deleteBatch, data: params }, { joinParamsToUrl: true }).then(() => {
        handleSuccess();
      });
    },
  });
};
/**
 * 保存或者更新
 * @param params
 */
export const saveOrUpdate = (params, isUpdate) => {
  const url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({ url: url, params });
};
/**
 * 列表接口
 * @param params
 */
export const reviewQuestionList = (params) => {
  if (params['classId']) {
    return defHttp.get({ url: Api.reviewQuestionList, params });
  }
  return Promise.resolve({});
};

/**
 * 删除单个
 */
export const reviewQuestionDelete = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.reviewQuestionDelete, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};
/**
 * 批量删除
 * @param params
 */
export const reviewQuestionDeleteBatch = (params, handleSuccess) => {
  createConfirm({
    iconType: 'warning',
    title: '确认删除',
    content: '是否删除选中数据',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.delete({ url: Api.reviewQuestionDeleteBatch, data: params }, { joinParamsToUrl: true }).then(() => {
        handleSuccess();
      });
    },
  });
};
/**
 * 保存或者更新
 * @param params
 */
export const reviewQuestionSaveOrUpdate = (params, isUpdate) => {
  const url = isUpdate ? Api.reviewQuestionEdit : Api.reviewQuestionSave;
  return defHttp.post({ url: url, params });
};
/**
 * 导入
 */
export const reviewQuestionImportUrl = '/reviewQuestion/reviewQuestion/importReviewQuestion';
/**
 * 导出
 */
export const reviewQuestionExportUrl = '/reviewQuestion/reviewQuestion/exportReviewQuestion';
/**
 * 发布/停用量表
 * @param params
 * @param handleSuccess
 */
export const publishBatch = (params, handleSuccess) => {
  return defHttp.put({ url: Api.publishBatch, params }).then(() => {
    handleSuccess();
  });
};

/**
 * 保存或更新报告设置
 * @param params
 * @param isUpdate
 */
export const saveReportConf = (params) => {
  return defHttp.post({ url: Api.saveReportConf, params });
};
/**
 * 删除单个报告设置
 */
export const deleteOneReportConf = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.deleteReportConf, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};
/**
 * 量表对应的报告描述列表
 * @param params
 */
export const reviewReportList = (params) => defHttp.get({ url: Api.reviewReportList, params });

/**
 * 保存或者更新题目内容
 * @param params
 */
export const saveOrUpdateQuestion = (params, isUpdate) => {
  console.log('保存或更新：', isUpdate);
  const url = isUpdate ? Api.editQuestion : Api.saveQuestion;
  return defHttp.post({ url: url, params });
};
