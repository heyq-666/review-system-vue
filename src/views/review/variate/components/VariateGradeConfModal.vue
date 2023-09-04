<template>
  <BasicModal v-bind="$attrs" @register="registerGradeModal" @ok="handleSubmit" :maskClosable="false" destroyOnClose>
    <BasicForm @register="registerForm" />
    <a-alert
      type="info"
      showIcon
      message="表达式案列：(q1+q2)*2+q2/2+q3。注意事项：1、仅以q/Q或f/F开头代表题目序号，并在下拉框选择题目序号。2、括号()使用英文括号。3、用+，-，*，/代表加减乘除。"
      style="margin-bottom: 8px; margin-left: 50px; width: 600px"
    />
    <a-form style="display: flex; flex-flow: row wrap; margin-left: 50px; margin-top: 5px">
      <div v-for="(str, index) of realTestValue" :key="index">
        <a-row v-if="str == 'q' || str == 'Q'">
          <a-col v-if="isNumber(realTestValue, index) == 1">
            {{ realTestValue[index] + realTestValue[index + 1] }}
          </a-col>
          <a-col v-if="isNumber(realTestValue, index) == 2">
            {{ realTestValue[index] + realTestValue[index + 1] + realTestValue[index + 2] }}
          </a-col>
          <a-col v-if="isNumber(realTestValue, index) == 3">
            {{ realTestValue[index] + realTestValue[index + 1] + realTestValue[index + 2] + realTestValue[index + 3] }}
          </a-col>
          <a-select
            style="width: 60px; margin-left: 10px"
            @change="
              (val) => {
                handleAsyncChange(val, index);
              }
            "
          >
            <template v-for="tenant in tenantList" :key="tenant.questionId">
              <a-select-option :value="tenant.questionNum">{{ tenant.questionNum }}</a-select-option>
            </template>
          </a-select>
        </a-row>

        <a-row v-if="str == 'f' || str == 'F'">
          <a-col v-if="isNumber(realTestValue, index) == 1">
            {{ realTestValue[index] + realTestValue[index + 1] }}
          </a-col>
          <a-col v-if="isNumber(realTestValue, index) == 2">
            {{ realTestValue[index] + realTestValue[index + 1] + realTestValue[index + 2] }}
          </a-col>
          <a-col v-if="isNumber(realTestValue, index) == 3">
            {{ realTestValue[index] + realTestValue[index + 1] + realTestValue[index + 2] + realTestValue[index + 3] }}
          </a-col>
          <a-select
            style="width: 60px; margin-left: 10px"
            @change="
              (val) => {
                handleAsyncChangeF(val, index);
              }
            "
          >
            <template v-for="tenant in tenantList" :key="tenant.questionId">
              <a-select-option :value="tenant.questionNum">{{ tenant.questionNum }}</a-select-option>
            </template>
          </a-select>
        </a-row>
      </div>
    </a-form>
  </BasicModal>
</template>

<script lang="ts" setup>
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { gradeFormSchema } from '/@/views/review/variate/VariateList.data';
  import { questionNumList, saveScoreSet } from '/@/views/review/variate/VariateList.api';
  import { ref } from 'vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  // 声明Emits
  const emit = defineEmits(['register', 'success']);
  const [registerForm, { resetFields, setFieldsValue, validate, getFieldsValue }] = useForm({
    schemas: gradeFormSchema,
    showActionButtonGroup: false,
    showSubmitButton: true,
  });
  const { createMessage } = useMessage();
  let realTestValue = ref('');
  //const tenantList = ref([{ name: '题号1' }, { name: '题号2' }, { name: '题号3' }, { name: '题号4' }]);
  const tenantList = ref<any>([]);
  //表单赋值
  const [registerGradeModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    tenantList.value = await questionNumList({ classId: data.record.classId });
    //重置表单
    await resetFields();
    realTestValue.value = data.record.variateGradeConf;
    setModalProps({
      confirmLoading: false,
      cancelText: '关闭',
      title: '计分设置',
      width: '800px',
      height: 600,
    });
    await setFieldsValue({
      ...data.record,
      ruleCode: data.ruleCode,
      variateGradeConf: realTestValue,
    });
  });
  //表单提交事件
  async function handleSubmit() {
    console.log('realTestValue:', realTestValue.value.length);
    if (realTestValue.value.includes('q')) {
      createMessage.error('请从下拉框选择题目序号!');
      return false;
    }
    try {
      const values = await validate();
      console.log('提交数据：', values);
      setModalProps({ confirmLoading: true });
      await saveScoreSet(values);
      //关闭弹窗
      closeModal();
      //刷新列表
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
  function handleAsyncChange(val, index) {
    //替换输入表达式中的题号-通过下拉框选择
    let num = isNumber(realTestValue.value, index);
    if (num == 1) {
      const newStr = realTestValue.value.substring(0, index) + '#' + val + '#' + realTestValue.value.substring(index + 2);
      realTestValue.value = newStr;
    }
    if (num == 2) {
      const newStr = realTestValue.value.substring(0, index) + '#' + val + '#' + realTestValue.value.substring(index + 3);
      realTestValue.value = newStr;
    }
    if (num == 3) {
      const newStr = realTestValue.value.substring(0, index) + '#' + val + '#' + realTestValue.value.substring(index + 4);
      realTestValue.value = newStr;
    }
  }
  function handleAsyncChangeF(val, index) {
    //替换输入表达式中的题号-通过下拉框选择
    let num = isNumber(realTestValue.value, index);
    if (num == 1) {
      const newStr = realTestValue.value.substring(0, index) + '@' + val + '@' + realTestValue.value.substring(index + 2);
      realTestValue.value = newStr;
    }
    if (num == 2) {
      const newStr = realTestValue.value.substring(0, index) + '@' + val + '@' + realTestValue.value.substring(index + 3);
      realTestValue.value = newStr;
    }
    if (num == 3) {
      const newStr = realTestValue.value.substring(0, index) + '@' + val + '@' + realTestValue.value.substring(index + 4);
      realTestValue.value = newStr;
    }
  }
  function isNumber(realTestValue, index) {
    let num = 0;
    if (realTestValue[index + 1] in [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]) {
      num = 1;
      if (realTestValue[index + 2] in [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]) {
        num = 2;
        if (realTestValue[index + 3] in [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]) {
          num = 3;
        }
      }
    }
    return num;
  }
</script>

<style scoped></style>
