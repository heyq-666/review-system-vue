import { BasicColumn, FormSchema } from '/@/components/Table';

//列表数据
export const columns: BasicColumn[] = [
  {
    title: '公告名称',
    align: 'center',
    dataIndex: 'noticeName',
  },
  {
    title: '公告状态',
    align: 'center',
    dataIndex: 'status_dictText',
  },
  {
    title: '操作人',
    align: 'center',
    dataIndex: 'operator',
  },
  {
    title: '创建时间',
    align: 'center',
    dataIndex: 'createTime',
  },
  {
    title: '更新时间',
    align: 'center',
    dataIndex: 'updateTime',
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
    field: 'noticeName',
    component: 'Input',
  },
  {
    label: '内容',
    field: 'noticeDesc',
    component: 'InputTextArea',
  },
];
