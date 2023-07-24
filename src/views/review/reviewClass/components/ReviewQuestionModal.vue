<template>
  <BasicModal v-bind="$attrs" @register="registerModal" destroyOnClose :title="title" :width="800" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>

<script lang="ts" setup>
  import { ref, computed, unref, inject } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { reviewQuestionSaveOrUpdate } from '../ReviewClass.api';

  //接收主表id
  const mainId = inject('mainId');
  // Emits声明
  const emit = defineEmits(['register', 'success']);
  const isUpdate = ref(true);
  let showOrHide = ref(false);
  const reviewQuestionFormSchema: FormSchema[] = [
    // TODO 子表隐藏字段，目前写死为ID
    {
      label: '',
      field: 'id',
      component: 'Input',
      show: false,
    },
    {
      label: '测评量表',
      field: 'className',
      component: 'Input',
      dynamicDisabled: true,
    },
    {
      label: '题目类型',
      field: 'questionType',
      component: 'JDictSelectTag',
      componentProps: ({ formModel }) => {
        return {
          options: [
            { label: '单选题', value: 1, key: '1' },
            { label: '问答题', value: 2, key: '2' },
            { label: '多选题', value: 3, key: '3' },
          ],
          onChange: () => {
            if (formModel.questionType == 1 || formModel.questionType == 3) {
              showOrHide.value = true;
            } else {
              showOrHide.value = false;
            }
          },
        };
      },
    },
    {
      label: '题目内容',
      field: 'content',
      component: 'InputTextArea',
    },
  ];
  //表单配置
  const [registerForm, { setProps, resetFields, setFieldsValue, validate }] = useForm({
    schemas: reviewQuestionFormSchema,
    showActionButtonGroup: false,
    baseColProps: { span: 24 },
  });
  //表单赋值
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
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
      if (unref(mainId)) {
        values['classId'] = unref(mainId);
      }
      //提交表单
      await reviewQuestionSaveOrUpdate(values, isUpdate.value);
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

  .AStockOutDetailTable {
    & /deep/ .ant-table-thead > tr > th,
    .ant-table-tbody > tr > td {
      padding: 1px 1px;
      overflow-wrap: break-word;
      text-align: center;
    }
    & /deep/ .ant-table-tbody .ant-table-row td {
      padding-top: 1px;
      padding-bottom: 1px;
      text-align: center;
    }
  }
</style>
