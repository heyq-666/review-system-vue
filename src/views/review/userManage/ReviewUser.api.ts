import { defHttp } from '/@/utils/http/axios';
import { useMessage } from '/@/hooks/web/useMessage';

const { createConfirm } = useMessage();

export enum Api {
  list = '/reviewUser/reviewUser/list',
  save = '/reviewUser/reviewUser/add',
  edit = '/reviewUser/reviewUser/edit',
  deleteOne = '/reviewUser/reviewUser/delete',
  deleteBatch = '/reviewUser/reviewUser/deleteBatch',
  importExcel = '/reviewUser/reviewUser/importExcel',
  exportXls = '/reviewUser/reviewUser/exportXls',
  getRecordList = '/reviewUser/reviewUser/getRecordList',
  deleteRecord = '/reviewUser/reviewUser/deleteRecord',
  exportQuestionAnswerByGroup = '/reviewUser/reviewUser/exportQuestionAnswerByGroup',
}
/**
 * 导出api
 * @param params
 */
export const getExportUrl = Api.exportXls;
/**
 * 导入api
 */
export const getImportUrl = Api.importExcel;
/**
 * 列表接口
 * @param params
 */
export const list = (params) => defHttp.get({ url: Api.list, params });
/**
 * 列表接口
 * @param params
 */
/*export const getRecordList = (params) => {
  const url = Api.getRecordList;
  return defHttp.post({ url: url, params });
};*/
export const getRecordList = (params) => defHttp.get({ url: Api.getRecordList, params });
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

export const deleteRecord = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.deleteRecord, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};
/**
 * 导出答题记录
 * @param params
 * @param isUpdate
 */
/*export const exportQuestionAnswerByGroup = (params) => {
  const url = Api.exportQuestionAnswerByGroup;
  return defHttp.post({ url: url, params });
};*/
