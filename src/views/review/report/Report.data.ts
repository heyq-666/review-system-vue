import { BasicColumn, FormSchema } from '/@/components/Table';
import { getReviewClassOptions } from '/@/api/common/api';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '编号',
    align: 'center',
    dataIndex: 'reportId',
    ifShow: false,
  },
  {
    title: '分类名称',
    align: 'center',
    dataIndex: 'className',
  },
  {
    title: '维度名称',
    align: 'center',
    dataIndex: 'reportName',
  },
  {
    title: '创建时间',
    align: 'center',
    dataIndex: 'createTime',
  },
  {
    title: '创建人',
    align: 'center',
    dataIndex: 'createBy',
  },
];
//查询数据
export const searchFormReport: FormSchema[] = [
  {
    label: '量表名称',
    field: 'classId',
    component: 'ApiSelect',
    componentProps: {
      api: getReviewClassOptions,
    },
    colProps: { span: 6 },
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '',
    field: 'reportId',
    component: 'Input',
    show: false,
  },
  {
    label: '量表名称',
    field: 'classId',
    component: 'ApiSelect',
    componentProps: {
      api: getReviewClassOptions,
    },
    //dynamicDisabled: true,
  },
  {
    label: '维度名称',
    field: 'reportName',
    component: 'Input',
    //dynamicDisabled: true,
  },
];
