import { defHttp } from '/@/utils/http/axios';

enum Api {
  list = '/reviewBanner/reviewBanner/list',
  deleteOne = '/reviewBanner/reviewBanner/delete',
  save = '/reviewBanner/reviewBanner/add',
  edit = '/reviewBanner/reviewBanner/edit',
  publishBatch = '/reviewBanner/reviewBanner/publishBatch',
}
/**
 * 列表接口
 * @param params
 */
export const list = (params) => defHttp.get({ url: Api.list, params });

/**
 * 删除单个项目
 */
export const deleteOne = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.deleteOne, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};

/**
 * 保存或更新
 * @param params
 */
export const saveOrUpdate = (params, isUpdate) => {
  const url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({ url: url, params });
};
/**
 * 发布/停用公告
 * @param params
 * @param handleSuccess
 */
export const publishBatch = (params, handleSuccess) => {
  return defHttp.put({ url: Api.publishBatch, params }).then(() => {
    handleSuccess();
  });
};
