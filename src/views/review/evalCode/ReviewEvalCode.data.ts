import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '用户id',
    align: 'center',
    dataIndex: 'userId',
  },
  {
    title: '测评码',
    align: 'center',
    dataIndex: 'evalCode',
  },
  {
    title: '测评码价格',
    align: 'center',
    dataIndex: 'price',
  },
  {
    title: '测评码状态',
    align: 'center',
    dataIndex: 'status_dictText',
  },
  {
    title: '操作时间',
    align: 'center',
    dataIndex: 'operateTime',
    customRender: ({ text }) => {
      return !text ? '' : text.length > 10 ? text.substr(0, 10) : text;
    },
  },
  {
    title: '测评人',
    align: 'center',
    dataIndex: 'username',
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '测评码',
    field: 'evalCode',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '测评码状态',
    field: 'status',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'review_eval_code_status',
    },
    colProps: { span: 6 },
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '用户id',
    field: 'userId',
    component: 'Input',
  },
  {
    label: '测评码',
    field: 'evalCode',
    component: 'Input',
  },
  {
    label: '测评码价格',
    field: 'price',
    component: 'InputNumber',
  },
  {
    label: '测评码来源',
    field: 'source',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: '',
    },
  },
  {
    label: '测评码状态',
    field: 'status',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'review_eval_code_status',
    },
  },
  {
    label: '测评人',
    field: 'username',
    component: 'Input',
  },
  {
    label: '返回信息',
    field: 'msg',
    component: 'Input',
  },
  // TODO 主键隐藏字段，目前写死为ID
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
];

/**
 * 流程表单调用这个方法获取formSchema
 * @param param
 */
export function getBpmFormSchema(_formData): FormSchema[] {
  return formSchema;
}
