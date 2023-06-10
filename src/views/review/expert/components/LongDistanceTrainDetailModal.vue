<template>
  <BasicModal v-bind="$attrs" @register="registerLongModal" destroyOnClose :title="title" :width="800" :height="1200" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>

<script lang="ts" setup>
  //表单赋值
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { computed, ref, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form';
  import { itemFormSchema } from '/@/views/review/expert/ReviewExpert.data';
  import { saveOrUpdateLangDisTrain } from '/@/views/review/expert/ReviewExpert.api';

  // Emits声明
  const emit = defineEmits(['register', 'success']);
  const isUpdate = ref(true);
  //表单配置
  const [registerForm, { setProps, resetFields, setFieldsValue, validate }] = useForm({
    //labelWidth: 150,
    schemas: itemFormSchema,
    showActionButtonGroup: false,
    baseColProps: { span: 24 },
  });
  const expertId = ref('');
  const [registerLongModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    //重置表单
    await resetFields();
    setModalProps({ confirmLoading: false, showCancelBtn: !!data?.showFooter, showOkBtn: !!data?.showFooter });
    isUpdate.value = !!data?.isUpdate;
    expertId.value = data.expertId;
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
      let param = {
        startTime: values.startTime,
        endTime: values.endTime,
        trainingExperience: values.trainingExperience,
        expertId: expertId.value,
      };
      setModalProps({ confirmLoading: true });
      //提交表单
      await saveOrUpdateLangDisTrain(param, isUpdate.value);
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
