import { BasicColumn, FormSchema } from '/@/components/Table';
import { getReviewClassOptions } from '/@/api/common/api';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '编号',
    align: 'center',
    dataIndex: 'variateId',
    ifShow: false,
  },
  {
    title: '序号',
    align: 'center',
    dataIndex: 'sortNum',
    //ifShow: false,
  },
  {
    title: '量表Id',
    align: 'center',
    dataIndex: 'classId',
    ifShow: false,
  },
  {
    title: '分类名称',
    align: 'center',
    dataIndex: 'className',
  },
  {
    title: '因子名称',
    align: 'center',
    dataIndex: 'variateName',
  },
  {
    title: '创建时间',
    align: 'center',
    dataIndex: 'createTime',
  },
  {
    title: '创建人',
    align: 'center',
    dataIndex: 'createBy',
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '量表名称',
    field: 'classId',
    component: 'ApiSelect',
    componentProps: {
      api: getReviewClassOptions,
    },
    colProps: { span: 6 },
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '',
    field: 'variateId',
    component: 'Input',
    show: false,
  },
  {
    label: '量表名称',
    field: 'classId',
    component: 'ApiSelect',
    componentProps: {
      api: getReviewClassOptions,
    },
  },
  {
    label: '因子名称',
    field: 'variateName',
    component: 'Input',
  },
];
//分值列表
export const answerColumns: BasicColumn[] = [
  {
    title: '',
    align: 'center',
    dataIndex: 'variateGradeId',
    ifShow: false,
  },
  {
    title: '最小分值',
    align: 'center',
    dataIndex: 'gradeSmall',
    edit: true,
    editRule: true,
    editComponent: 'InputNumber',
    width: '20%',
  },
  {
    title: '最大分值',
    align: 'center',
    dataIndex: 'gradeBig',
    edit: true,
    editRule: true,
    editComponent: 'InputNumber',
    width: '20%',
  },
  {
    title: '结果描述',
    align: 'center',
    dataIndex: 'resultExplain',
    edit: true,
    editRule: true,
    width: '50%',
  },
];
