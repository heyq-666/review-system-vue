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
    title: '交易手机号',
    align: 'center',
    dataIndex: 'mobilePhone',
  },
  {
    title: '量表名称',
    align: 'center',
    dataIndex: 'className',
  },
  {
    title: '订单实付金额',
    align: 'center',
    dataIndex: 'orderAmount',
  },
  {
    title: '原始价格',
    align: 'center',
    dataIndex: 'orgAmount',
  },
  {
    title: '订单号',
    align: 'center',
    dataIndex: 'orderNo',
  },
  {
    title: '订单状态',
    align: 'center',
    dataIndex: 'status_dictText',
  },
  {
    title: '支付时间',
    align: 'center',
    dataIndex: 'payTime',
    customRender: ({ text }) => {
      return !text ? '' : text.length > 10 ? text.substr(0, 10) : text;
    },
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
    title: '操作人',
    align: 'center',
    dataIndex: 'operator',
  },
  {
    title: '微信支付订单id',
    align: 'center',
    dataIndex: 'transactionId',
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '量表名称',
    field: 'className',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '交易手机号',
    field: 'mobilePhone',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '订单号',
    field: 'orderNo',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '订单状态',
    field: 'status',
    colProps: { span: 6 },
    component: 'JDictSelectTag',
    componentProps: {
      options: [
        { label: '待支付', value: 1, key: '1' },
        { label: '支付成功待回调', value: 2, key: '2' },
        { label: '交易成功', value: 3, key: '3' },
      ],
    },
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
    label: '测评量表id',
    field: 'classId',
    component: 'Input',
  },
  {
    label: '量表名称',
    field: 'className',
    component: 'Input',
  },
  {
    label: '订单实付金额',
    field: 'orderAmount',
    component: 'InputNumber',
  },
  {
    label: '原始价格',
    field: 'orgAmount',
    component: 'InputNumber',
  },
  {
    label: '订单号',
    field: 'orderNo',
    component: 'InputNumber',
  },
  {
    label: '订单状态',
    field: 'status',
    component: 'JDictSelectTag',
    componentProps: {
      options: [
        { label: '待支付', value: 1, key: '1' },
        { label: '支付成功待回调', value: 2, key: '2' },
        { label: '交易成功', value: 3, key: '3' },
      ],
    },
  },
  {
    label: '测评专题id',
    field: 'subjectId',
    component: 'InputNumber',
  },
  {
    label: '微信支付订单id',
    field: 'transactionId',
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
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}
