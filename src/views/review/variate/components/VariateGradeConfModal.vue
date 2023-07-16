<template>
  <BasicModal v-bind="$attrs" @register="registerGradeModal" @ok="handleSubmit" destroyOnClose>
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>

<script lang="ts" setup>
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { gradeFormSchema } from '/@/views/review/variate/VariateList.data';
  import { saveScoreSet } from '/@/views/review/variate/VariateList.api';

  // 声明Emits
  const emit = defineEmits(['register', 'success']);
  const [registerForm, { resetFields, setFieldsValue, validate, getFieldsValue }] = useForm({
    schemas: gradeFormSchema,
    showActionButtonGroup: false,
  });

  //表单赋值
  const [registerGradeModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    //重置表单
    await resetFields();
    setModalProps({
      confirmLoading: false,
      cancelText: '关闭',
      title: '计分设置',
      width: '800px',
    });
    await setFieldsValue({
      ...data.record,
      ruleCode: data.ruleCode,
    });
  });
  //表单提交事件
  async function handleSubmit() {
    try {
      const values = await validate();
      console.log('提交数据：', values);
      setModalProps({ confirmLoading: true });
      //提交表单
      //await saveOrUpdate(values,true);
      let valuesNew = handleGradeDataList(values.gradeRuleList);
      values.gradeRuleList = valuesNew;
      //总条目运算
      let gradeAllRule = handleAllGradeDataList(values.gradeAllRule);
      values.gradeAllRule = gradeAllRule;
      console.log('传递给后台的值：', values);
      await saveScoreSet(values);
      //关闭弹窗
      closeModal();
      //刷新列表
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
  //解析计分设置文本内容整合传入后台
  function handleGradeDataList(values) {
    if (values != '') {
      let data = values.toString();
      //数字
      let number = [];
      number = data.replace(/[^0-9]/gi, ',').split(',');
      //运算符
      let operator = data.match(/\D/g, ',');
      let formData = [];
      for (let i = 0; i < operator.length; i++) {
        let temp = {};
        temp = {
          questionId: number[i],
          calSymbol: operator[i],
        };
        formData.push(temp);
      }
      let temp = {
        questionId: number[number.length - 1],
        cym: '',
      };
      formData.push(temp);
      return formData;
    }
  }
  function handleAllGradeDataList(values) {
    if (values != '') {
      let data = values.toString();
      //数字
      let number = data.replace(/[^0-9]/gi, ',').split(',');
      number = number.slice(1, number.length);
      //运算符
      let operator = data.match(/\D/g, ',');
      let formData = [];
      if (number.length > 1 && operator.length > 1) {
        let temp = {
          calTotal: number[0],
          calSymbol: operator[0],
          calTotal1: number[1],
          calSymbol1: operator[1],
        };
        formData.push(temp);
      } else {
        let temp = {
          calTotal: number[0],
          calSymbol: operator[0],
        };
        formData.push(temp);
      }
      return formData;
    }
  }
</script>

<style scoped></style>
