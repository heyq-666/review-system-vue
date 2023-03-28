<template>
  <div>
    <BasicModal v-bind="$attrs" @register="registerCalendarModal" destroyOnClose :title="title" :width="800" :height="900" @ok="handleSubmit">
      <BasicForm @register="calendarForm" />
    </BasicModal>
  </div>
</template>

<script lang="ts" setup>
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { calendarFormSchema } from '/@/views/review/expert/ReviewExpert.data';
  import { computed, ref, unref } from 'vue';
  import { saveCalendarInfo } from '/@/views/review/expert/ReviewExpert.api';

  // Emits声明
  const emit = defineEmits(['register', 'success']);
  //表单配置
  const [calendarForm, { setProps, resetFields, setFieldsValue, validate }] = useForm({
    schemas: calendarFormSchema,
    showActionButtonGroup: false,
    baseColProps: { span: 24 },
  });
  const isUpdate = ref(true);
  //表单赋值
  const [registerCalendarModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    isUpdate.value = !!data?.isUpdate;
    //重置表单
    await resetFields();
    setModalProps({ confirmLoading: false, showCancelBtn: !!data?.showFooter, showOkBtn: !!data?.showFooter });
    //表单赋值
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
  const title = computed(() => '专家日历');
  //表单提交事件
  async function handleSubmit() {
    try {
      let values = await validate();
      console.log('提交：', values);
      setModalProps({ confirmLoading: true });
      //提交表单
      await saveCalendarInfo(values);
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
