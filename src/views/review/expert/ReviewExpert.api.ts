import { defHttp } from '/@/utils/http/axios';
import { useMessage } from '/@/hooks/web/useMessage';

const { createConfirm } = useMessage();

enum Api {
  list = '/reviewExpert/reviewExpert/list',
  save = '/reviewExpert/reviewExpert/add',
  edit = '/reviewExpert/reviewExpert/edit',
  deleteOne = '/reviewExpert/reviewExpert/delete',
  deleteBatch = '/reviewExpert/reviewExpert/deleteBatch',
  importExcel = '/reviewExpert/reviewExpert/importExcel',
  exportXls = '/reviewExpert/reviewExpert/exportXls',
  expertCalendarDetailList = '/reviewExpert/reviewExpert/expertCalendarDetailList',
  deleteOneCalendar = '/reviewExpert/reviewExpert/deleteOneCalendar',
  saveCalendarInfo = '/reviewExpert/reviewExpert/saveCalendarInfo',
  expertLongDistanceTrainList = '/reviewExpert/reviewExpert/expertLongDistanceTrainList',
  deleteOneLongDistanceTrain = '/reviewExpert/reviewExpert/deleteOneLongDistanceTrain',
  saveLongDistanceTrain = '/reviewExpert/reviewExpert/addLongDistanceTrain',
  editLongDistanceTrain = '/reviewExpert/reviewExpert/editLongDistanceTrain',
  queryBeGoodAtTreeSync = '/reviewExpert/reviewExpert/queryBeGoodAtTreeSync',
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
 * 专家排班列表
 * @param params
 */
export const expertCalendarDetailList = (params) => defHttp.get({ url: Api.expertCalendarDetailList, params });
/**
 * 删除单个专家排班
 */
export const deleteOneCalendar = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.deleteOneCalendar, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};
/**
 * 保存日历排班
 * @param params
 */
export const saveCalendarInfo = (params) => {
  return defHttp.post({ url: Api.saveCalendarInfo, params });
};
/**
 * 长程培训经历列表
 * @param params
 */
export const expertLongDistanceTrainList = (params) => defHttp.get({ url: Api.expertLongDistanceTrainList, params });
/**
 * 删除单个
 */
export const deleteOneLongDistanceTrain = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.deleteOneLongDistanceTrain, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};
export const saveOrUpdateLangDisTrain = (params, isUpdate) => {
  const url = isUpdate ? Api.editLongDistanceTrain : Api.saveLongDistanceTrain;
  return defHttp.post({ url: url, params });
};

export const queryBeGoodAtTreeSync = (params?) => defHttp.get({ url: Api.queryBeGoodAtTreeSync, params });
