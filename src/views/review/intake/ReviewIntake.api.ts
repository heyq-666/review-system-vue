import { defHttp } from '/@/utils/http/axios';
import { useMessage } from '/@/hooks/web/useMessage';

const { createConfirm } = useMessage();

enum Api {
  list = '/reviewIntake/reviewIntake/list',
  save = '/reviewIntake/reviewIntake/add',
  edit = '/reviewIntake/reviewIntake/edit',
  deleteOne = '/reviewIntake/reviewIntake/delete',
  deleteBatch = '/reviewIntake/reviewIntake/deleteBatch',
  importExcel = '/reviewIntake/reviewIntake/importExcel',
  exportXls = '/reviewIntake/reviewIntake/exportXls',
  saveContactRecords = '/reviewIntake/contactRecord/saveContactRecords',
  contactRecordsList = '/reviewIntake/contactRecord/getContactRecordsList',
  deleteOneContactRecord = '/reviewIntake/contactRecord/deleteOneContactRecord',
  editContactRecords = '/reviewIntake/contactRecord/editContactRecords',
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
 * 保存联系记录
 * @param params
 */
export const saveContactRecords = (params, isUpdate) => {
  const url = isUpdate ? Api.editContactRecords : Api.saveContactRecords;
  //return defHttp.post({ url: Api.saveContactRecords, params });
  return defHttp.post({ url: url, params });
};

/*export const saveOrUpdate = (params, isUpdate) => {
  const url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({ url: url, params });
};*/
/**
 * 联系记录列表
 * @param params
 */
export const contactRecordsList = (params) => defHttp.get({ url: Api.contactRecordsList, params });
/**
 * 删除单个记录
 */
export const deleteOneContactRecord = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.deleteOneContactRecord, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};
