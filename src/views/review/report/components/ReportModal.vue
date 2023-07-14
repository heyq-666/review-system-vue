<template>
  <BasicModal v-bind="$attrs" @register="registerModal" @ok="handleSubmit" :title="title" :width="800" destroyOnClose>
    <BasicForm @register="registerForm" />
    <JVxeTable ref="vTable1" toolbar rowNumber dragSort rowSelection :maxHeight="580" :dataSource="dataSource" :columns="columns" />
  </BasicModal>
</template>

<script lang="ts" setup>
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { computed, ref, unref } from 'vue';
  import { formSchema } from '/@/views/review/report/Report.data';
  import { JVxeTypes, JVxeColumn, JVxeTableInstance } from '/@/components/jeecg/JVxeTable/types';
  import { pick } from 'lodash-es';
  import { reportList, saveReport, updateReport } from '/@/views/review/report/Report.api';

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

  //表单赋值
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    //重置表单
    await resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    dataSource.value = [];
    console.log('维度数据：', data.record);
    if (unref(isUpdate)) {
      //表单赋值
      await setFieldsValue({
        ...data.record,
      });
      //查询获取分值数据
      dataSource.value = await reportList({ reportId: data.record.reportId });
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
        let reportGradeList = designValues.map((i) => pick(i, 'gradeSmall', 'gradeBig', 'resultExplain'));
        // 生成 formData，用于传入后台
        let formData = Object.assign({}, mainData, { reportGradeList });
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
      if (isUpdate.value) {
        await updateReport(formData);
      } else {
        await saveReport(formData);
      }
      //关闭弹窗
      closeModal();
      //刷新列表
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
  const columns = ref<JVxeColumn[]>([
    {
      title: '最小分值',
      key: 'gradeSmall',
      align: 'center',
      type: JVxeTypes.inputNumber,
      minWidth: 180,
      validateRules: [
        { required: true, message: '${title}不能为空' },
        { pattern: /^[1-9]\d*$/, message: '请输入零以上的正整数' },
      ],
    },
    {
      title: '最大分值',
      key: 'gradeBig',
      align: 'center',
      type: JVxeTypes.inputNumber,
      minWidth: 180,
      validateRules: [
        { required: true, message: '${title}不能为空' },
        { pattern: /^[1-9]\d*$/, message: '请输入零以上的正整数' },
      ],
    },
    {
      title: '结果描述',
      key: 'resultExplain',
      align: 'center',
      minWidth: 180,
      type: JVxeTypes.input,
      validateRules: [{ required: true, message: '${title}不能为空' }],
    },
  ]);
</script>
