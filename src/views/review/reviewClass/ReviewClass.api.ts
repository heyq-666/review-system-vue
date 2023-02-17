import { defHttp } from '/@/utils/http/axios';
import { useMessage } from '/@/hooks/web/useMessage';

const { createConfirm } = useMessage();

enum Api {
  list = '/reviewClass/reviewClass/list',
  save = '/reviewClass/reviewClass/add',
  edit = '/reviewClass/reviewClass/edit',
  deleteOne = '/reviewClass/reviewClass/delete',
  deleteBatch = '/reviewClass/reviewClass/deleteBatch',
  importExcel = '/reviewClass/reviewClass/importExcel',
  exportXls = '/reviewClass/reviewClass/exportXls',
  reviewQuestionList = '/reviewClass/reviewClass/listReviewQuestionByMainId',
  reviewQuestionSave = '/reviewClass/reviewClass/addReviewQuestion',
  reviewQuestionEdit = '/reviewClass/reviewClass/editReviewQuestion',
  reviewQuestionDelete = '/reviewClass/reviewClass/deleteReviewQuestion',
  reviewQuestionDeleteBatch = '/reviewClass/reviewClass/deleteBatchReviewQuestion',
  publishBatch = '/reviewClass/reviewClass/publishBatch',
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
export const reviewQuestionImportUrl = '/reviewClass/reviewClass/importReviewQuestion';
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
