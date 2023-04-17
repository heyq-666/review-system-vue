<template>
  <BasicModal v-bind="$attrs" @register="contactRecordsModal" destroyOnClose :title="title" :width="900" @ok="handleSubmit">
    <BasicForm @register="contactRecordForm" />
  </BasicModal>
</template>

<script lang="ts" setup>
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { computed, ref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form';
  import { contactRecordFormSchema } from '/@/views/review/intake/ReviewIntake.data';
  import { saveContactRecords } from '/@/views/review/intake/ReviewIntake.api';

  // Emits声明
  const emit = defineEmits(['register', 'success']);
  const isUpdate = ref(true);

  //表单配置
  const [contactRecordForm, { setProps, resetFields, setFieldsValue, validate }] = useForm({
    //labelWidth: 150,
    schemas: contactRecordFormSchema,
    showActionButtonGroup: false,
    baseColProps: { span: 24 },
  });
  //表单赋值
  const [contactRecordsModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    //重置表单
    await resetFields();
    setModalProps({ confirmLoading: false, showCancelBtn: !!data?.showFooter, showOkBtn: !!data?.showFooter });
    isUpdate.value = !!data?.isUpdate;
    //if (unref(isUpdate)) {
    //表单赋值
    await setFieldsValue({
      ...data.record,
    });
    //}
    // 隐藏底部时禁用整个表单
    setProps({ disabled: !data?.showFooter });
  });
  //设置标题
  const title = computed(() => '新增联系记录');
  //表单提交事件
  async function handleSubmit() {
    try {
      let values = await validate();
      setModalProps({ confirmLoading: true });
      //提交表单
      await saveContactRecords(values, isUpdate.value);
      //关闭弹窗
      closeModal();
      //刷新列表
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>

<style scoped></style>
