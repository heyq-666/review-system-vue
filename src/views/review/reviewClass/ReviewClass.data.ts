import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '排序ID',
    align: 'center',
    dataIndex: 'sortId',
    width: '20%',
  },
  {
    title: '量表名称',
    align: 'center',
    dataIndex: 'title',
    width: '60%',
  },
  {
    title: '状态',
    align: 'center',
    dataIndex: 'status_dictText',
    width: '20%',
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '量表名称',
    field: 'title',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '创建时间',
    field: 'createTime',
    component: 'RangePicker',
    componentProps: {
      valueType: 'Date',
      showTime: false,
    },
    colProps: { span: 6 },
  },
];

//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '排序ID',
    field: 'sortId',
    component: 'InputNumber',
  },
  {
    label: '量表名称',
    field: 'title',
    component: 'Input',
  },
  {
    label: '量表简介',
    field: 'classDesc',
    component: 'InputTextArea', //TODO 注意string转换问题
  },
  {
    label: '引导语',
    field: 'guide',
    component: 'InputTextArea', //TODO 注意string转换问题
  },
  {
    label: '是否计费',
    field: 'charge',
    component: 'RadioGroup',
    defaultValue: 0,
    componentProps: ({ formModel }) => {
      return {
        options: [
          { label: '是', value: 1, key: '1' },
          { label: '否', value: 0, key: '0' },
        ],
        onChange: () => {
          formModel.charge = 0 && (formModel.orgPrice = []) && (formModel.dicountPrice = []);
        },
      };
    },
  },
  {
    label: '量表价格',
    field: 'orgPrice',
    component: 'InputNumber',
    ifShow: ({ values }) => values.charge == 1,
  },
  {
    label: '优惠金额',
    field: 'dicountPrice',
    component: 'InputNumber',
    ifShow: ({ values }) => values.charge == 1,
  },
  {
    label: '封面图片',
    field: 'bannerImg',
    component: 'JImageUpload',
    componentProps: {
      fileMax: 1,
    },
  },
  {
    label: '是否视频测评',
    field: 'videoAnalysis',
    component: 'RadioGroup',
    defaultValue: 0,
    componentProps: {
      options: [
        { label: '是', value: 1, key: '1' },
        { label: '否', value: 0, key: '0' },
      ],
    },
  },
  {
    label: '是否推荐',
    field: 'recommendType',
    component: 'RadioGroup',
    defaultValue: 0,
    componentProps: {
      options: [
        { label: '是', value: 1, key: '1' },
        { label: '否', value: 0, key: '0' },
      ],
    },
  },
  // TODO 主键隐藏字段，目前写死为ID
  {
    label: '',
    field: 'classId',
    component: 'Input',
    show: false,
  },
];

//题目列表数据
export const reviewQuestionColumns: BasicColumn[] = [
  {
    title: '题目序号',
    align: 'center',
    dataIndex: 'questionNum',
    width: '10rpx',
  },
  {
    title: '题目内容',
    align: 'center',
    dataIndex: 'content',
  },
];
//子表表单数据
export const reviewQuestionFormSchema: FormSchema[] = [
  // TODO 子表隐藏字段，目前写死为ID
  {
    label: '',
    field: 'classId',
    component: 'Input',
    show: false,
  },
  {
    label: '测评量表',
    field: 'className',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    label: '题目类型',
    field: 'questionType',
    component: 'JSelectInput',
    componentProps: {
      options: [
        { label: '单选题', value: 1, key: '1' },
        { label: '问答题', value: 2, key: '2' },
        { label: '多选题', value: 3, key: '3' },
      ],
    },
  },
  {
    label: '题目内容',
    field: 'content',
    component: 'InputTextArea',
  },
];
//表单数据
export const reportConfigFormSchema: FormSchema[] = [
  {
    label: '',
    field: 'classId',
    component: 'Input',
    show: false,
  },
  {
    label: '提示语',
    field: 'reportTips',
    component: 'Input',
  },
  {
    label: '标题',
    field: 'reportTitle',
    component: 'Input',
  },
  {
    label: '说明',
    field: 'explanation',
    component: 'Input',
  },
];
//列表数据
export const reportConfigColumns: BasicColumn[] = [
  {
    title: '',
    dataIndex: 'id',
    ifShow: false,
  },
  {
    title: '提示语',
    align: 'center',
    dataIndex: 'reportTips',
  },
  {
    title: '标题',
    align: 'center',
    dataIndex: 'title',
  },
  {
    title: '说明',
    align: 'center',
    dataIndex: 'explanation',
  },
];
