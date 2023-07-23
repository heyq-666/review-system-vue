<template>
  <BasicModal v-bind="$attrs" :okButtonProps="okButtonProps" @register="registerModal" destroyOnClose>
    <BasicForm @register="registerForm" />
    <a-form style="display: flex; flex-flow: row wrap">
      <a-col style="color: #ff0000">{{ '表达式中仅以q代表题目序号，输入表达式后请按顺序通过下拉框选中题目序号' }}</a-col>
      <div v-for="(str, index) of realTestValue" :key="index">
        <a-row v-if="str == 'q'">
          <!--          <a-col style="text-align: center">
            <a-input :value="str" style="text-align: center; width: 40px" />
          </a-col>
          <a-col style="text-align: center">{{ index + 1 }}</a-col>-->
          <a-select
            style="width: 80px"
            @change="
              (val) => {
                handleAsyncChange(val, index);
              }
            "
          >
            <template v-for="tenant in tenantList" :key="tenant.id">
              <a-select-option :value="tenant.name">{{ tenant.name }}</a-select-option>
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
  import { checkRuleInput } from '/@/views/system/checkRule/check.rule.data';
  import { ref } from 'vue';
  let realTestValue = ref('');
  const okButtonProps = {
    style: { display: 'none' },
  };
  const tenantList = ref([{ name: '题号1' }, { name: '题号2' }, { name: '题号3' }, { name: '题号4' }]);
  const [registerForm, { resetFields, setFieldsValue, validate, getFieldsValue }] = useForm({
    schemas: checkRuleInput,
    showActionButtonGroup: false,
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  });

  //表单赋值
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    //重置表单
    await resetFields();
    realTestValue.value = '';
    setModalProps({
      confirmLoading: false,
      cancelText: '关闭',
      title: '功能测试',
      width: '1000px',
    });
    await setFieldsValue({
      ruleCode: data.ruleCode,
      testValue: realTestValue,
    });
  });
  function handleAsyncChange(val, index) {
    console.log('输入数据：', realTestValue.value);
    console.log('打印val:', val);
    console.log('打印index：', index);
    const newStr = realTestValue.value.substring(0, index) + val + realTestValue.value.substring(index + 2);
    console.log('变更后：', newStr);
    realTestValue.value = newStr;
  }
</script>

<style scoped></style>
