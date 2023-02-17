import { BasicColumn, FormSchema } from '/@/components/Table';

//列表数据
export const columns: BasicColumn[] = [
  {
    title: '项目名称',
    align: 'center',
    dataIndex: 'projectName',
  },
  {
    title: '项目描述',
    align: 'center',
    dataIndex: 'projectDesc',
  },
  {
    title: '创建人',
    align: 'center',
    dataIndex: 'creator',
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
  /*{
    title: '二维码',
    align: 'center',
    dataIndex: 'appletsQrCodeLink',
    customRender: render.renderImage,
  },*/
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
    label: '项目名称',
    field: 'projectName',
    component: 'Input',
  },
  {
    label: '项目描述',
    field: 'projectDesc',
    component: 'InputTextArea',
  },
  {
    label: '封面图片',
    field: 'cover',
    component: 'JImageUpload',
    componentProps: {
      fileMax: 1,
    },
  },
  {
    label: '关联用户组',
    field: 'groupId',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'group',
    },
  },
  {
    label: '测评量表',
    field: 'classIds',
    component: 'JSelectReviewClass',
  },
  {
    label: '是否显示报告',
    field: 'showReport',
    component: 'RadioGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '是', value: 2, key: '2' },
        { label: '否', value: 1, key: '1' },
      ],
    },
  },
  {
    label: '是否开放',
    field: 'isOpen',
    component: 'RadioGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '是', value: 2, key: '2' },
        { label: '否', value: 1, key: '1' },
      ],
    },
  },
];
