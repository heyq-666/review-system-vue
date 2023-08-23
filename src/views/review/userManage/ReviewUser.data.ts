import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { getReviewProjectOptions } from '/@/api/common/api';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '用户名',
    align: 'center',
    dataIndex: 'userName',
    width: '120px',
  },
  {
    title: '真实姓名',
    align: 'center',
    dataIndex: 'realName',
    width: '120px',
  },
  {
    title: '性别',
    align: 'center',
    dataIndex: 'sex_dictText',
    width: '70px',
  },
  {
    title: '用户组',
    align: 'center',
    dataIndex: 'departName',
    width: '180px',
  },
  {
    title: '手机号',
    align: 'center',
    dataIndex: 'mobilePhone',
    width: '120px',
  },
  {
    title: '微信id',
    align: 'center',
    dataIndex: 'openid',
  },
  {
    title: '操作时间',
    align: 'center',
    dataIndex: 'updateTime',
    width: '180px',
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '用户名',
    field: 'userName',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '真实姓名',
    field: 'realName',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '用户组',
    field: 'groupId',
    component: 'JSelectDept',
    colProps: { span: 6 },
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '',
    field: 'userId',
    component: 'Input',
    show: false,
  },
  {
    label: '用户名',
    field: 'userName',
    component: 'Input',
  },
  {
    label: '性别',
    field: 'sex',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'sex',
      placeholder: '请选择性别',
    },
  },
  {
    label: '用户组',
    field: 'groupId',
    component: 'JSelectDept',
  },
  {
    label: '真实姓名',
    field: 'realName',
    component: 'Input',
  },
  {
    label: '密码',
    field: 'password',
    component: 'StrengthMeter',
    rules: [
      {
        required: true,
        message: '请输入登录密码',
      },
    ],
  },
  {
    label: '确认密码',
    field: 'confirmPassword',
    component: 'InputPassword',
    dynamicRules: ({ values }) => rules.confirmPassword(values, true),
  },
  {
    label: '手机号码',
    field: 'mobilePhone',
    component: 'Input',
    //对手机号唯一做校验
    /*dynamicRules: ({ model, schema }) => {
      return [
        { ...rules.duplicateCheckRule('review_user', 'mobile_phone', model, schema, true)[0] },
        { pattern: /^1[3|4|5|7|8|9][0-9]\d{8}$/, message: '手机号码格式有误' },
      ];
    },*/
    dynamicRules: ({}) => {
      return [{ pattern: /^1[3|4|5|7|8|9][0-9]\d{8}$/, message: '手机号码格式有误' }];
    },
  },
];
export const recordColumn: BasicColumn[] = [
  {
    title: 'resultId',
    dataIndex: 'resultId',
    ifShow: false,
  },
  {
    title: '题库名称',
    dataIndex: 'title',
    width: 120,
  },
  {
    title: '总得分',
    dataIndex: 'totalGrade',
    width: 80,
  },
  {
    title: '结果描述',
    dataIndex: 'resultExplain',
    width: 500,
    ellipsis: false,
  },
  {
    title: '测评时间',
    dataIndex: 'createTime',
    width: 120,
  },
];
export const questionAnswerFormSchema: FormSchema[] = [
  {
    label: '用户组',
    field: 'groupId',
    component: 'JSelectDept',
  },
  {
    label: '测评项目',
    field: 'projectId',
    component: 'ApiSelect',
    componentProps: {
      api: getReviewProjectOptions,
    },
  },
  {
    label: '开始时间',
    field: 'startTime',
    component: 'DatePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      //valueType: 'Date',
      showTime: true,
    },
  },
  {
    label: '结束时间',
    field: 'endTime',
    component: 'DatePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      //valueType: 'Date',
      showTime: true,
    },
  },
];
