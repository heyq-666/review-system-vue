import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

//列表数据
export const columns: BasicColumn[] = [
  {
    title: '排序ID',
    align: 'center',
    dataIndex: 'sortId',
  },
  {
    title: '量表名称',
    align: 'center',
    dataIndex: 'title',
  },
  {
    title: '状态',
    align: 'center',
    dataIndex: 'status_dictText',
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
  // TODO 主键隐藏字段，目前写死为ID
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
];

//子表列表数据
export const reviewQuestionColumns: BasicColumn[] = [
  {
    title: '题目序号',
    align: 'center',
    dataIndex: 'questionNum',
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
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    label: '题目类型',
    field: 'questionType',
    component: 'JDictSelectTag',
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
