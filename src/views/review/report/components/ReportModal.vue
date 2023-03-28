<template>
  <div>
    <BasicModal v-bind="$attrs" @register="registerModal" destroyOnClose :title="title" :width="800" @ok="handleSubmit">
      <BasicForm @register="registerForm" />
      <!-- 选项表单 -->
      <BasicTable
        @register="answerTable"
        @edit-end="handleEditEnd"
        :searchInfo="searchInfo"
        @edit-cancel="handleEditCancel"
        :beforeEditSubmit="beforeEditSubmit"
      />
    </BasicModal>
  </div>
</template>

<script lang="ts" setup>
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { computed, ref, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form';
  import { reportColumns, formSchema } from '/@/views/review/report/Report.data';
  import { saveOrUpdate } from '/@/views/review/userManage/ReviewUser.api';
  import { BasicTable } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { reportList } from '/@/views/review/report/Report.api';
  import { useMessage } from '/@/hooks/web/useMessage';
  // Emits声明
  const emit = defineEmits(['register', 'success']);
  const isUpdate = ref(true);
  const reportId = ref();
  //表单配置
  const [registerForm, { setProps, resetFields, setFieldsValue, validate }] = useForm({
    schemas: formSchema,
    showActionButtonGroup: false,
    baseColProps: { span: 24 },
  });
  const searchInfo = {};
  //表单赋值
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    //重置表单
    await resetFields();
    setModalProps({ confirmLoading: false, showCancelBtn: !!data?.showFooter, showOkBtn: !!data?.showFooter });
    isUpdate.value = !!data?.isUpdate;
    if (unref(isUpdate)) {
      reportId.value = data.record.reportId;
      searchInfo['reportId'] = reportId.value;
      //表单赋值
      await setFieldsValue({
        ...data.record,
      });
    }
    // 隐藏底部时禁用整个表单
    setProps({ disabled: !data?.showFooter });
  });
  //设置标题
  const title = computed(() => (!unref(isUpdate) ? '添加维度' : '维度编辑'));
  //表单提交事件
  async function handleSubmit() {
    try {
      let values = await validate();
      setModalProps({ confirmLoading: true });
      //提交表单
      await saveOrUpdate(values, isUpdate.value);
      //关闭弹窗
      closeModal();
      //刷新列表
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
  //选项表单配置
  const { tableContext } = useListPage({
    tableProps: {
      title: '分值设置',
      api: reportList,
      columns: reportColumns,
      canResize: false,
      useSearchForm: false,
      pagination: false,
      showActionColumn: false,
      showTableSetting: false,
      showIndexColumn: true,
      defSort: {
        column: 'reportGradeId',
        order: 'asc',
      },
    },
  });
  const [answerTable] = tableContext;
  const { createMessage } = useMessage();

  function handleEditEnd({ record, index, key, value }: Recordable) {
    console.log(record, index, key, value);
    return false;
  }
  function handleEditCancel() {
    console.log('cancel');
  }
  async function beforeEditSubmit({ record, index, key, value }) {
    console.log('单元格数据正在准备提交', { record, index, key, value });
    return await feakSave({ id: record.id, key, value });
  }
  // 模拟将指定数据保存
  function feakSave({ value, key, id }) {
    createMessage.loading({
      content: `正在模拟保存${key}`,
      key: '_save_fake_data',
      duration: 0,
    });
    return new Promise((resolve) => {
      setTimeout(() => {
        if (value === '') {
          createMessage.error({
            content: '保存失败：不能为空',
            key: '_save_fake_data',
            duration: 2,
          });
          resolve(false);
        } else {
          createMessage.success({
            content: `记录${id}的${key}已保存`,
            key: '_save_fake_data',
            duration: 2,
          });
          resolve(true);
        }
      }, 2000);
    });
  }
</script>
<style scoped></style>
