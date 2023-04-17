import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '服务日期',
    align: 'center',
    dataIndex: 'serviceDate',
    customRender: ({ text }) => {
      return !text ? '' : text.length > 10 ? text.substr(0, 10) : text;
    },
  },
  {
    title: '开始时间',
    align: 'center',
    dataIndex: 'startTime',
    customRender: ({ text }) => {
      return !text ? '' : text.length > 10 ? text.substr(0, 10) : text;
    },
  },
  {
    title: '联系类型',
    align: 'center',
    dataIndex: 'contactType_dictText',
  },
  {
    title: '服务类型',
    align: 'center',
    dataIndex: 'serviceType_dictText',
  },
  {
    title: '个案状态',
    align: 'center',
    dataIndex: 'caseStatus_dictText',
  },
  {
    title: '紧急联系人',
    align: 'center',
    dataIndex: 'emergencyContact',
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '服务日期',
    field: 'serviceDate',
    component: 'DatePicker',
  },
  {
    label: '联系类型',
    field: 'contactType',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'contact_type',
    },
  },
  {
    label: '服务类型',
    field: 'serviceType',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'service_type',
    },
  },
  {
    label: '个案状态',
    field: 'caseStatus',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'case_status',
    },
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '服务日期',
    field: 'serviceDate',
    component: 'DatePicker',
    dynamicRules: ({}) => {
      return [{ required: true, message: '请输入服务日期!' }];
    },
  },
  {
    label: '开始时间',
    field: 'startTime',
    component: 'DatePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      showTime: true,
    },
    dynamicRules: ({}) => {
      return [{ required: true, message: '请输入开始时间!' }];
    },
  },
  {
    label: '持续分钟',
    field: 'durationMinutes',
    component: 'InputNumber',
    dynamicRules: ({}) => {
      return [{ required: true, message: '请输入持续分钟!' }];
    },
  },
  {
    label: '联系类型',
    field: 'contactType',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'contact_type',
    },
    dynamicRules: ({}) => {
      return [{ required: true, message: '请选择联系类型!' }];
    },
  },
  {
    label: '评估主要问题',
    field: 'evaluateMainIssues',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'evaluate_main_Issues',
    },
    dynamicRules: ({}) => {
      return [{ required: true, message: '请选择评估主要问题!' }];
    },
  },
  {
    label: '评估次要问题',
    field: 'evaluateSecondaryIssues',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'evaluate_secondary_issues',
    },
    dynamicRules: ({}) => {
      return [{ required: true, message: '请选择评估次要问题!' }];
    },
  },
  {
    label: '服务类型',
    field: 'serviceType',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'service_type',
    },
    dynamicRules: ({}) => {
      return [{ required: true, message: '请选择服务类型!' }];
    },
  },
  {
    label: '个案状态',
    field: 'caseStatus',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'case_status',
    },
    dynamicRules: ({}) => {
      return [{ required: true, message: '请选择个案状态!' }];
    },
  },
  {
    label: '咨客主诉',
    field: 'clientsComplaints',
    component: 'InputTextArea',
    dynamicRules: ({}) => {
      return [{ required: true, message: '请输入咨客主诉!' }];
    },
  },
  {
    label: '咨客目标',
    field: 'clientsGoal',
    component: 'InputTextArea',
    dynamicRules: ({}) => {
      return [{ required: true, message: '请输入咨客目标!' }];
    },
  },
  {
    label: '解决过程',
    field: 'resolutionProcess',
    component: 'InputTextArea',
    dynamicRules: ({}) => {
      return [{ required: true, message: '请输入解决过程!' }];
    },
  },
  {
    label: '咨客行动计划',
    field: 'clientsActionPlan',
    component: 'InputTextArea',
    dynamicRules: ({}) => {
      return [{ required: true, message: '请输入咨客行动计划!' }];
    },
  },
  {
    label: '咨客反馈',
    field: 'clientsFeedback',
    component: 'InputTextArea',
    dynamicRules: ({}) => {
      return [{ required: true, message: '请输入咨客反馈!' }];
    },
  },
  {
    label: '危机评估',
    field: 'crisisAssessment',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'crisis_assessment',
    },
  },
  {
    label: '危机程度',
    field: 'crisisLevel',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'crisis_level',
    },
  },
  {
    label: '紧急联系人',
    field: 'emergencyContact',
    component: 'Input',
  },
  {
    label: '电话',
    field: 'telephone',
    component: 'Input',
    dynamicRules: ({}) => {
      return [{ pattern: /^1[3|4|5|7|8|9][0-9]\d{8}$/, message: '电话格式有误' }];
    },
  },
  {
    label: '与咨客关系',
    field: 'clientRelation',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'client_relation',
    },
  },
  {
    label: '创建人',
    field: 'creator',
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
