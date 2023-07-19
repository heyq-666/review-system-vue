<template>
  <BasicModal v-bind="$attrs" @register="registerQuestion" width="50%" @ok="handleSubmit" destroyOnClose showFooter>
    <BasicForm @register="registerForm" />
    <JVxeTable ref="vTable1" toolbar dragSort rowSelection :maxHeight="580" :dataSource="dataSource1" :columns="columns" />
  </BasicModal>
</template>

<script lang="ts" setup>
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { reviewQuestionFormSchema } from '/@/views/review/reviewClass/ReviewClass.data';
  import { ref, unref } from 'vue';
  import { JVxeColumn, JVxeTypes } from '/@/components/jeecg/JVxeTable/src/types';

  const isUpdate = ref(true);
  //表单配置
  const [registerForm, { resetFields, setFieldsValue }] = useForm({
    schemas: reviewQuestionFormSchema,
    showActionButtonGroup: false,
  });
  let arr1: any[] = [];
  let dataSource1 = ref(arr1);
  //表单赋值
  const [registerQuestion, { setModalProps }] = useModalInner(async (data) => {
    //重置表单
    await resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    dataSource1.value = [];
    //表单赋值
    if (unref(isUpdate)) {
      await setFieldsValue({
        ...data.record,
      });
    } else {
      await setFieldsValue({
        ...data,
      });
    }
  });
  //表单提交事件
  async function handleSubmit() {
    console.log('表单提交');
  }
  const columns = ref<JVxeColumn[]>([
    {
      title: '答案序号',
      key: 'rightAnswer',
      align: 'center',
      type: JVxeTypes.select,
      options: [
        { title: 'A', value: '1' },
        { title: 'B', value: '2' },
        { title: 'C', value: '3' },
        { title: 'D', value: '4' },
        { title: 'E', value: '5' },
        { title: 'F', value: '6' },
        { title: 'G', value: '7' },
      ],
      minWidth: 90,
    },
    {
      title: '内容',
      key: 'content',
      align: 'center',
      type: JVxeTypes.textarea,
      minWidth: 220,
    },
    {
      title: '分值',
      key: 'gradeSamll',
      align: 'center',
      type: JVxeTypes.inputNumber,
      minWidth: 90,
      validateRules: [
        { required: true, message: '${title}不能为空' },
        { pattern: /^[1-9]\d*$/, message: '请输入零以上的正整数' },
      ],
    },
  ]);
</script>

<style scoped></style>
