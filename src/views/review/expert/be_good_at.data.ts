import { FormSchema } from '/@/components/Form';

// 部门基础表单
export function useBasicFormSchema() {
  const basicFormSchema: FormSchema[] = [
    {
      field: 'departName',
      label: '名称',
      component: 'Input',
      componentProps: {
        placeholder: '请输入名称',
      },
      rules: [{ required: true, message: '名称不能为空' }],
    },
    {
      field: 'parentId',
      label: '上级',
      component: 'TreeSelect',
      componentProps: {
        treeData: [],
        placeholder: '无',
        dropdownStyle: { maxHeight: '200px', overflow: 'auto' },
      },
    },
    {
      field: 'departOrder',
      label: '排序',
      component: 'InputNumber',
      componentProps: {},
    },
  ];
  return { basicFormSchema };
}

// 类型选项
export const orgCategoryOptions = {
  // 一级
  root: [{ value: '1', label: '一级分类' }],
  // 子级
  child: [{ value: '2', label: '二级分类' }],
};
