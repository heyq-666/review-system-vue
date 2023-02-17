import { defHttp } from '/@/utils/http/axios';

enum Api {
  list = '/reviewProject/reviewProject/list',
  deleteOne = '/reviewProject/reviewProject/delete',
  save = '/reviewProject/reviewProject/add',
  edit = '/reviewProject/reviewProject/edit',
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
