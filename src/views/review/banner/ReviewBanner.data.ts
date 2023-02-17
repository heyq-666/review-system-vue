import { BasicColumn, FormSchema } from '/@/components/Table';

//列表数据
export const columns: BasicColumn[] = [
  {
    title: '标题',
    align: 'center',
    dataIndex: 'title',
  },
  {
    title: '图片路径',
    align: 'center',
    dataIndex: 'imgUrl',
  },
  {
    title: '目标跳转路径',
    align: 'center',
    dataIndex: 'targetUrl',
  },
  {
    title: '状态',
    align: 'center',
    dataIndex: 'status_dictText',
  },
  {
    title: '创建时间',
    align: 'center',
    dataIndex: 'createTime',
  },
  {
    title: '操作时间',
    align: 'center',
    dataIndex: 'operatetime',
  },
  {
    title: '操作人',
    align: 'center',
    dataIndex: 'operator',
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    label: '标题',
    field: 'title',
    component: 'Input',
  },
  {
    label: '图片',
    field: 'imgUrl',
    component: 'JImageUpload',
    componentProps: {
      fileMax: 1,
    },
  },
  {
    label: '目标跳转路径',
    field: 'targetUrl',
    component: 'InputTextArea',
  },
];
