<template>
  <BasicModal v-bind="$attrs" @register="registerGradeModal" @ok="handleSubmit" destroyOnClose>
    <BasicForm @register="registerForm" />
    <a-form style="display: flex; flex-flow: row wrap; margin-left: 50px; margin-top: 5px">
      <div v-for="(str, index) of realTestValue" :key="index">
        <a-row v-if="str == 'q'">
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
  // 声明Emits
  const emit = defineEmits(['register', 'success']);
  const [registerForm, { resetFields, setFieldsValue, validate, getFieldsValue }] = useForm({
    schemas: gradeFormSchema,
    showActionButtonGroup: false,
    showSubmitButton: true,
  });

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
    try {
      const values = await validate();
      console.log('提交数据：', values);
      setModalProps({ confirmLoading: true });
      //提交表单
      //await saveOrUpdate(values,true);
      //let valuesNew = handleGradeDataList(values.gradeRuleList);
      //values.gradeRuleList = valuesNew;
      //总条目运算
      //let gradeAllRule = handleAllGradeDataList(values.gradeAllRule);
      //values.gradeAllRule = gradeAllRule;
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
      const newStr = realTestValue.value.substring(0, index) + val + realTestValue.value.substring(index + 2);
      realTestValue.value = newStr;
    }
    if (num == 2) {
      const newStr = realTestValue.value.substring(0, index) + val + realTestValue.value.substring(index + 3);
      realTestValue.value = newStr;
    }
    if (num == 3) {
      const newStr = realTestValue.value.substring(0, index) + val + realTestValue.value.substring(index + 4);
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
  //解析计分设置文本内容整合传入后台
  /*  function handleGradeDataList(values) {
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
        calSymbol: '',
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
  }*/
</script>

<style scoped></style>
