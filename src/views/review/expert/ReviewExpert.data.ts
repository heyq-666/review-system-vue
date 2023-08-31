import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '专家姓名',
    align: 'center',
    dataIndex: 'expertName',
  },
  {
    title: '性别',
    align: 'center',
    dataIndex: 'sex_dictText',
  },
  {
    title: '年龄',
    align: 'center',
    dataIndex: 'age',
  },
  {
    title: '专家手机号',
    align: 'center',
    dataIndex: 'mobilePhone',
  },
  {
    title: '职称',
    align: 'center',
    dataIndex: 'jobTitle',
  },
  {
    title: '工作机构名称',
    align: 'center',
    dataIndex: 'workOrgName',
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
    /*customRender: ({ text }) => {
      return !text ? '' : text.length > 10 ? text.substr(0, 10) : text;
    },*/
  },
  {
    title: '更新时间',
    align: 'center',
    dataIndex: 'updateTime',
  },
  {
    title: '创建人',
    align: 'center',
    dataIndex: 'creator',
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '专家姓名',
    field: 'expertName',
    component: 'Input', //TODO 范围查询
    colProps: { span: 6 },
  },
  {
    label: '专家手机号',
    field: 'mobilePhone',
    component: 'Input', //TODO 范围查询
    colProps: { span: 6 },
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '专家姓名',
    field: 'expertName',
    component: 'Input',
    dynamicRules: ({}) => {
      return [{ required: true, message: '请输入专家姓名!' }];
    },
  },
  /*{
    label: '性别',
    field: 'sex_dictText',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'sex',
    },
    dynamicRules: ({}) => {
      return [{ required: true, message: '请输入性别!' }];
    },
  },*/
  {
    label: '性别',
    field: 'sex',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'sex',
      placeholder: '请选择性别',
      stringToNumber: true,
    },
  },
  {
    label: '年龄',
    field: 'age',
    component: 'InputNumber',
    dynamicRules: ({}) => {
      return [{ required: true, message: '请输入年龄!' }];
    },
  },
  {
    label: '专家手机号',
    field: 'mobilePhone',
    component: 'Input',
    dynamicRules: ({}) => {
      return [
        { required: true, message: '请输入专家手机号!' },
        { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号码!' },
      ];
    },
  },
  {
    label: '从业年限',
    field: 'workingYears',
    component: 'InputNumber',
    dynamicRules: ({}) => {
      return [{ required: true, message: '请输入从业年限!' }];
    },
  },
  {
    label: '服务时长',
    field: 'serviceDuration',
    component: 'InputNumber',
    dynamicRules: ({}) => {
      return [{ required: true, message: '请输入服务时长!' }];
    },
  },
  {
    label: '职称',
    field: 'jobTitle',
    component: 'Input',
    dynamicRules: ({}) => {
      return [{ required: true, message: '请输入职称!' }];
    },
  },
  {
    label: '专家介绍',
    field: 'introduction',
    component: 'InputTextArea',
    dynamicRules: ({}) => {
      return [{ required: true, message: '请输入专家介绍!' }];
    },
  },
  {
    label: '工作机构名称',
    field: 'workOrgName',
    component: 'Input',
    dynamicRules: ({}) => {
      return [{ required: true, message: '请输入工作机构名称!' }];
    },
  },
  {
    label: '咨询师线下预约地址',
    field: 'offlineReservationAddress',
    component: 'JAreaLinkage',
    dynamicRules: ({}) => {
      return [{ required: true, message: '请输入咨询师线下预约地址!' }];
    },
  },
  {
    label: '专家标签',
    field: 'label',
    component: 'InputTextArea',
    dynamicRules: ({}) => {
      return [{ required: true, message: '请输入专家标签!' }];
    },
  },
  {
    label: '擅长领域-群体',
    field: 'expertFieldGroup',
    component: 'JSelectMultiple',
    componentProps: {
      dictCode: 'expert_field_group',
      placeholder: '请选择擅长领域-群体',
      triggerChange: true,
    },
  },
  {
    label: '擅长方向-情绪压力',
    field: 'beGoodAtEmotion',
    component: 'JSelectMultiple',
    componentProps: {
      dictCode: 'be_good_at_emotion',
      placeholder: '请选择擅长方向-情绪压力',
      triggerChange: true,
    },
  },
  {
    label: '擅长方向-人际关系',
    field: 'beGoodAtRelation',
    component: 'JSelectMultiple',
    componentProps: {
      dictCode: 'be_good_at_relation',
      placeholder: '请选择擅长方向-人际关系',
      triggerChange: true,
    },
  },
  {
    label: '擅长方向-家庭困扰',
    field: 'beGoodAtFamilyTrouble',
    component: 'JSelectMultiple',
    componentProps: {
      dictCode: 'be_good_at_family_trouble',
      placeholder: '请选择擅长方向-家庭困扰',
      triggerChange: true,
    },
  },
  {
    label: '擅长方向-婚姻恋爱',
    field: 'beGoodAtMarriage',
    component: 'JSelectMultiple',
    componentProps: {
      dictCode: 'be_good_at_marriage',
      placeholder: '请选择擅长方向-婚姻恋爱',
      triggerChange: true,
    },
  },
  {
    label: '头像',
    field: 'avatar',
    component: 'JImageUpload',
    componentProps: {
      fileMax: 1,
    },
  },
  {
    label: '是否收费',
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
        dynamicRules: ({}) => {
          return [{ required: true, message: '请选择是否收费' }];
        },
      };
    },
  },
  {
    label: '原始价格',
    field: 'orgPrice',
    component: 'InputNumber',
    ifShow: ({ values }) => values.charge == 1,
    dynamicRules: ({}) => {
      return [
        { required: false },
        { pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '请输入正确的金额!' },
      ];
    },
  },
  {
    label: '优惠价格',
    field: 'dicountPrice',
    component: 'InputNumber',
    ifShow: ({ values }) => values.charge == 1,
    dynamicRules: ({}) => {
      return [
        { required: false },
        { pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '请输入正确的金额!' },
      ];
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
//专家日历表单数据
export const calendarFormSchema: FormSchema[] = [
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    label: '专家姓名',
    field: 'expertName',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    label: '工作机构名称',
    field: 'workOrgName',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    label: '周期',
    field: 'cycle',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'cycle',
      placeholder: '请选择周期',
    },
  },
  {
    label: '出诊日期',
    field: 'visitDate',
    component: 'DatePicker',
    componentProps: {
      showTime: false,
      valueFormat: 'YYYY-MM-DD',
      placeholder: '请选择出诊日期',
    },
  },
  {
    label: '时间段',
    field: 'timeSlot',
    component: 'JSelectMultiple',
    componentProps: {
      dictCode: 'timeSlot',
      placeholder: '请选择时间段',
      triggerChange: true,
    },
  },
];
//专家日历查询数据
export const calendarDetailSchema: FormSchema[] = [
  {
    label: '出诊日期',
    field: 'visitDate',
    component: 'DatePicker', //TODO 范围查询
  },
];
//专家日历列表数据
export const calendarDetailColumns: BasicColumn[] = [
  {
    title: '日历id',
    align: 'center',
    dataIndex: 'id',
    ifShow: false,
  },
  {
    title: '日期',
    align: 'center',
    dataIndex: 'visitDate',
  },
  {
    title: '周几',
    align: 'center',
    dataIndex: 'weekDayName',
  },
  {
    title: '时间段',
    align: 'center',
    dataIndex: 'timeSlot',
  },
];

export const itemFormSchema: FormSchema[] = [
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    label: '',
    field: 'expertId',
    component: 'Input',
    show: false,
  },
  {
    label: '开始时间',
    field: 'startTime',
    component: 'DatePicker',
    dynamicRules: ({}) => {
      return [{ required: true, message: '请选择开始时间!' }];
    },
  },
  {
    label: '结束时间',
    field: 'endTime',
    component: 'DatePicker',
    dynamicRules: ({}) => {
      return [{ required: true, message: '请选择结束时间!' }];
    },
  },
  {
    label: '培训经历',
    field: 'trainingExperience',
    component: 'InputTextArea',
    dynamicRules: ({}) => {
      return [{ required: true, message: '请输入培训经历!' }];
    },
  },
];

//专家日历列表数据
export const expertLongDistanceTrainColumns: BasicColumn[] = [
  {
    title: '记录id',
    align: 'center',
    dataIndex: 'id',
    ifShow: false,
  },
  {
    title: '开始日期',
    align: 'center',
    dataIndex: 'startTime',
  },
  {
    title: '结束日期',
    align: 'center',
    dataIndex: 'endTime',
  },
  {
    title: '培训经历',
    align: 'center',
    dataIndex: 'trainingExperience',
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
