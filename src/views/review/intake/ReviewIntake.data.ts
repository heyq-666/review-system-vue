import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '来电记录编号',
    align: 'center',
    dataIndex: 'callRecordNumber',
  },
  {
    title: '挂断时间',
    align: 'center',
    dataIndex: 'hangupTime',
    customRender: ({ text }) => {
      return !text ? '' : text.length > 10 ? text.substr(0, 10) : text;
    },
  },
  {
    title: '公司名称',
    align: 'center',
    dataIndex: 'companyName',
  },
  /*{
    title: '分支机构',
    align: 'center',
    dataIndex: 'branch',
  },*/
  {
    title: '员工姓名',
    align: 'center',
    dataIndex: 'employeeName',
  },
  {
    title: '员工工号',
    align: 'center',
    dataIndex: 'employeeJobNumber',
  },
  {
    title: '员工职位',
    align: 'center',
    dataIndex: 'employeePosition',
  },
  {
    title: '岗位',
    align: 'center',
    dataIndex: 'station',
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '公司名称',
    field: 'companyId',
    component: 'JSelectDept',
  },
  {
    label: '员工工号',
    field: 'employeeJobNumber',
    component: 'Input',
  },
  {
    label: '员工姓名',
    field: 'employeeName',
    component: 'Input',
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '来电记录编号',
    field: 'callRecordNumber',
    component: 'Input',
  },
  {
    label: '挂断时间',
    field: 'hangupTime',
    component: 'DatePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      //valueType: 'Date',
      showTime: true,
    },
  },
  {
    label: '呈现问题描述',
    field: 'problemDescription',
    component: 'InputTextArea',
  },
  {
    label: '备注',
    field: 'note',
    component: 'InputTextArea',
  },
  {
    label: '来电类型',
    field: 'callType',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'call_type',
    },
    dynamicRules: ({}) => {
      return [{ required: true, message: '请选择来电类型!' }];
    },
  },
  {
    label: '是否重点个案',
    field: 'keyCases',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'yn',
    },
  },
  {
    label: '公司名称',
    field: 'companyId',
    component: 'JSelectDept',
    dynamicRules: ({}) => {
      return [{ required: true, message: '请输入公司名称!' }];
    },
  },
  {
    label: '对自己或他人有危险',
    field: 'dangerousSituation',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'yn',
    },
  },
  /*{
    label: '分支机构',
    field: 'branch',
    component: 'InputNumber',
  },*/
  {
    label: '个案紧急程度',
    field: 'caseUrgency',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'case_urgency',
    },
  },
  {
    label: '是否使用过EAP',
    field: 'usedEap',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'yn',
    },
  },
  {
    label: '对EAP认识',
    field: 'eapCognition',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'eap_cognition',
    },
  },
  {
    label: '员工姓名',
    field: 'employeeName',
    component: 'Input',
    dynamicRules: ({}) => {
      return [{ required: true, message: '请输入员工姓名 !' }];
    },
  },
  {
    label: '婚姻状态',
    field: 'maritalStatus',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'marital_status',
    },
  },
  {
    label: '员工生日',
    field: 'employeeBirthday',
    component: 'DatePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
      placeholder: '请选择生日',
    },
  },
  {
    label: '员工工号',
    field: 'employeeJobNumber',
    component: 'Input',
  },
  {
    label: '工作电话',
    field: 'jobPhone',
    component: 'Input',
    dynamicRules: ({}) => {
      return [{ pattern: /^1[3|4|5|7|8|9][0-9]\d{8}$/, message: '工作电话格式有误' }];
    },
  },
  {
    label: '员工职位',
    field: 'employeePosition',
    component: 'Input',
  },
  {
    label: '咨客性别',
    field: 'clientGender',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'sex',
    },
  },
  {
    label: '家庭电话',
    field: 'familyPhone',
    component: 'Input',
    dynamicRules: ({}) => {
      return [{ pattern: /^1[3|4|5|7|8|9][0-9]\d{8}$/, message: '家庭电话格式有误' }];
    },
  },
  {
    label: '电子邮件',
    field: 'clientEmail',
    component: 'Input',
    dynamicRules: ({}) => {
      return [{ pattern: /^([\w]+\.*)([\w]+)@[\w]+\.\w{3}(\.\w{2}|)$/, message: '电子邮件格式有误' }];
    },
  },
  {
    label: '工作种类',
    field: 'workType',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'work_type',
    },
  },
  {
    label: '咨客地区',
    field: 'clientArea',
    component: 'JAreaSelect',
    dynamicRules: ({}) => {
      return [{ required: true, message: '请选择咨客地区 !' }];
    },
  },
  {
    label: '岗位',
    field: 'station',
    component: 'Input',
  },
  {
    label: '转介来源',
    field: 'referralSource',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'referral_source',
    },
    dynamicRules: ({}) => {
      return [{ required: true, message: '请选择转介来源 !' }];
    },
  },
  {
    label: '希望预约时间',
    field: 'expectAppointTime',
    component: 'DatePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      //valueType: 'Date',
      showTime: true,
    },
  },
  {
    label: '呈现问题类型',
    field: 'problemType',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'problem_type',
    },
    dynamicRules: ({}) => {
      return [{ required: true, message: '请选择呈现问题类型 !' }];
    },
  },
  {
    label: '对咨询师的期待',
    field: 'expectationsForConsultants',
    component: 'InputTextArea',
  },
  // TODO 主键隐藏字段，目前写死为ID
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
];

//联系记录表单
export const contactRecordFormSchema: FormSchema[] = [
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    label: '员工姓名',
    field: 'employeeName',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    label: '联系记录类型',
    field: 'contactRecordType',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'contact_record_type',
    },
  },
  {
    label: '联系人姓名',
    field: 'contactName',
    component: 'Input',
  },
  {
    label: '服务人员姓名',
    field: 'servicePersonName',
    component: 'Input',
  },
  {
    label: '联系时间',
    field: 'contactTime',
    component: 'DatePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      //valueType: 'Date',
      showTime: true,
    },
  },
  {
    label: '持续分钟',
    field: 'durationMinutes',
    component: 'InputNumber',
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
    label: '备注',
    field: 'contactRecordNote',
    component: 'InputTextArea',
  },
];

//intake记录列表数据
export const contactRecordsListColumns: BasicColumn[] = [
  {
    title: '联系记录id',
    align: 'center',
    dataIndex: 'id',
    ifShow: false,
  },
  {
    title: '联系人姓名',
    align: 'center',
    dataIndex: 'contactName',
  },
  {
    title: '服务人员姓名',
    align: 'center',
    dataIndex: 'servicePersonName',
  },
  {
    title: '联系类型',
    align: 'center',
    dataIndex: 'contactType_dictText',
  },
  {
    title: '联系时间',
    align: 'center',
    dataIndex: 'contactTime',
  },
];
//intake记录列表查询数据
export const contactRecordsListSchema: FormSchema[] = [];
/**
 * 流程表单调用这个方法获取formSchema
 * @param param
 */
export function getBpmFormSchema(_formData): FormSchema[] {
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}
