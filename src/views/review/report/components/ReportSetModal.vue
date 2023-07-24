<template>
  <BasicModal v-bind="$attrs" @register="registerModal" @ok="handleSubmit" :title="title" :width="800" destroyOnClose>
    <BasicForm @register="registerForm" />
    <JVxeTable
      :linkageConfig="linkageConfig"
      ref="vTable1"
      toolbar
      rowNumber
      dragSort
      rowSelection
      :maxHeight="580"
      :dataSource="dataSource"
      :columns="columns1"
    />
  </BasicModal>
</template>

<script lang="ts" setup>
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { computed, ref, unref } from 'vue';
  import { formSchema } from '/@/views/review/report/Report.data';
  import { JVxeTypes, JVxeColumn, JVxeLinkageConfig, JVxeTableInstance } from '/@/components/jeecg/JVxeTable/types';
  import { defHttp } from '/@/utils/http/axios';
  import { pick } from 'lodash-es';
  import { reportSetList, saveReportSet } from '/@/views/review/report/Report.api';
  //设置标题
  const title = computed(() => (!unref(isUpdate) ? '新增' : '编辑'));
  // 声明Emits
  const emit = defineEmits(['register', 'success']);
  const isUpdate = ref(true);

  //表单配置
  const [registerForm, { resetFields, setFieldsValue, validate, getFieldsValue }] = useForm({
    schemas: formSchema,
    showActionButtonGroup: false,
  });
  let arr1: any[] = [];
  let dataSource = ref(arr1);
  let classId = '';
  //表单赋值
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    console.log('data:=====', data);
    //重置表单
    await resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    dataSource.value = [];
    classId = data.record.classId;
    if (unref(isUpdate)) {
      //表单赋值
      await setFieldsValue({
        ...data.record,
      });
      //查询获取分值数据
      dataSource.value = await reportSetList({ reportId: data.record.reportId });
    }
  });
  const vTable1 = ref<JVxeTableInstance>();
  // 验证表格 返回表格数据
  function validateMyTable(tableRef) {
    return new Promise((resolve, reject) => {
      tableRef.value!.validateTable().then((errMap) => {
        if (errMap) {
          reject();
        } else {
          const values = tableRef.value!.getTableData();
          resolve(values);
        }
      });
    });
  }
  //表单提交事件
  async function handleSubmit() {
    let mainData;
    let designValues = [];
    validate()
      .then((formValue) => {
        mainData = formValue;
        return validateMyTable(vTable1);
      })
      .then((tableData1: []) => {
        if (tableData1 && tableData1.length > 0) {
          designValues = tableData1;
        }
        let reportVariateList = designValues.map((i) => pick(i, 'variateId', 'calSymbol'));
        // 生成 formData，用于传入后台
        let formData = Object.assign({}, mainData, { reportVariateList });
        saveOrUpdateFormData(formData);
      })
      .catch(() => {
        setModalProps({ confirmLoading: false });
        console.error('验证未通过!');
      });
  }
  // 表单提交请求
  async function saveOrUpdateFormData(formData) {
    try {
      console.log('表单提交数据', formData);
      setModalProps({ confirmLoading: true });
      await saveReportSet(formData);
      //关闭弹窗
      closeModal();
      //刷新列表
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
  const columns1 = ref<JVxeColumn[]>([
    {
      title: '因子项',
      key: 'variateId',
      align: 'center',
      type: JVxeTypes.select,
      minWidth: 120,
    },
    {
      title: '运算符',
      key: 'calSymbol',
      align: 'center',
      type: JVxeTypes.select,
      options: [
        {
          title: '+',
          value: '+',
        },
        {
          title: '-',
          value: '-',
        },
        {
          title: '*',
          value: '*',
        },
        {
          title: '/',
          value: '/',
        },
      ],
      minWidth: 100,
    },
  ]);
  // 联动配置
  const linkageConfig = ref<JVxeLinkageConfig[]>([{ requestData: requestMenu, key: 'variateId' }]);

  async function requestMenu() {
    let result;
    result = await defHttp.get({
      url: '/variate/variate/getVariateListByClassId',
      params: { classId: classId },
    });
    return result.map((item) => ({ value: item.variateId, text: item.variateName }));
  }
</script>
