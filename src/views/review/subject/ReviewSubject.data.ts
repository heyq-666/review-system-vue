import { BasicColumn, FormSchema } from '/@/components/Table';

//列表数据
export const columns: BasicColumn[] = [
  {
    title: '专题名称',
    align: 'center',
    dataIndex: 'subjectName',
  },
  {
    title: '专题描述',
    align: 'center',
    dataIndex: 'subjectDesc',
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
  {
    title: '创建人',
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
    label: '专题名称',
    field: 'subjectName',
    component: 'Input',
  },
  {
    label: '专题描述',
    field: 'subjectDesc',
    component: 'InputTextArea',
  },
  {
    label: '测评量表',
    field: 'classIds',
    component: 'JSelectReviewClass',
  },
  {
    label: '封面图片',
    field: 'coverImage',
    component: 'JImageUpload',
    componentProps: {
      fileMax: 1,
    },
  },
];
