<template>
  <BasicModal v-bind="$attrs" @register="registerReportModal" destroyOnClose :title="title" :width="800" @ok="handleSubmit">
    <BasicForm @register="registerReportForm" />
  </BasicModal>
</template>

<script lang="ts" setup>
  import { ref, computed, unref, provide } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { reportConfigFormSchema } from '../ReviewClass.data';
  import { saveReportConf } from '../ReviewClass.api';
  // Emits声明
  const emit = defineEmits(['register', 'success']);
  const isUpdate = ref(true);
  const classId = ref();
  //表单配置
  const [registerReportForm, { setProps, resetFields, setFieldsValue, validate }] = useForm({
    schemas: reportConfigFormSchema,
    showActionButtonGroup: false,
    baseColProps: { span: 24 },
  });
  //下发 mainId,子组件接收
  provide('mainId', classId);
  //表单赋值
  const [registerReportModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    //重置表单
    await resetFields();
    setModalProps({ confirmLoading: false, showCancelBtn: !!data?.showFooter, showOkBtn: !!data?.showFooter });
    isUpdate.value = !!data?.isUpdate;
    if (unref(isUpdate)) {
      //表单赋值
      await setFieldsValue({
        ...data.record,
      });
    }
    // 隐藏底部时禁用整个表单
    setProps({ disabled: !data?.showFooter });
  });
  //设置标题
  const title = computed(() => (!unref(isUpdate) ? '新增' : '编辑'));
  //表单提交事件
  async function handleSubmit() {
    try {
      let values = await validate();
      setModalProps({ confirmLoading: true });
      //提交表单
      await saveReportConf(values);
      //关闭弹窗
      closeModal();
      //刷新列表
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>

<style lang="less" scoped>
  /** 时间和数字输入框样式 */
  :deep(.ant-input-number) {
    width: 100%;
  }

  :deep(.ant-calendar-picker) {
    width: 100%;
  }
</style>
