<template>
  <BasicModal v-bind="$attrs" @register="registerQuestion" width="50%" :title="getTitle" @ok="handleSubmit" destroyOnClose showFooter>
    <a-form ref="formRef" :model="router" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="量表名称" name="className" style="margin-left: -400px">
        <a-input v-model:value="className" placeholder="量表名称" disabled />
      </a-form-item>
      <a-form-item label="题目类型" name="questionType" style="margin-left: -400px">
        <a-select v-model:value="router.questionType">
          <a-select-option v-for="item in options" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="题目内容" name="content" style="margin-left: -400px">
        <a-input v-model:value="router.content" placeholder="题目内容" />
      </a-form-item>
      <a-form-item v-if="router.questionType == 1 || router.questionType == 3" label="选项" style="margin-left: -400px">
        <a-table bordered :data-source="dataSource" :columns="columns" :pagination="false">
          <template #bodyCell="{ column, text, record }">
            <template v-if="column.dataIndex === 'selectContent'">
              <div class="editable-cell">
                <div v-if="editableData[record.answerId]" class="editable-cell-input-wrapper">
                  <a-input v-model:value="editableData[record.answerId].selectContent" @pressEnter="save(record.answerId)" />
                  <check-outlined class="editable-cell-icon-check" @click="save(record.answerId)" />
                </div>
                <div v-else class="editable-cell-text-wrapper">
                  {{ text || ' ' }}
                  <edit-outlined class="editable-cell-icon" @click="edit(record.answerId)" />
                </div>
              </div>
            </template>
            <template v-if="column.dataIndex === 'selectGrade'">
              <div class="editable-cell">
                <div v-if="editableData[record.answerId]" class="editable-cell-input-wrapper">
                  <a-input v-model:value="editableData[record.answerId].selectGrade" @pressEnter="save(record.answerId)" />
                  <check-outlined class="editable-cell-icon-check" @click="save(record.answerId)" />
                </div>
                <div v-else class="editable-cell-text-wrapper">
                  {{ text || ' ' }}
                  <edit-outlined class="editable-cell-icon" @click="edit(record.answerId)" />
                </div>
              </div>
            </template>
            <template v-else-if="column.dataIndex === 'operation'">
              <a-popconfirm v-if="dataSource.length" title="Sure to delete?" @confirm="onDelete(record.answerId)">
                <a>删除</a>
              </a-popconfirm>
            </template>
          </template>
        </a-table>
        <a-button class="editable-add-btn" type="primary" @click="handleAdd">添加</a-button>
      </a-form-item>
    </a-form>
  </BasicModal>
</template>

<script lang="ts" setup>
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { computed, reactive, ref, unref } from 'vue';
  import { cloneDeep } from 'lodash-es';
  import { CheckOutlined, EditOutlined } from '@ant-design/icons-vue';
  import { defHttp } from '/@/utils/http/axios';
  import { Api, saveOrUpdateQuestion } from '/@/views/review/reviewClass/ReviewClass.api';
  const labelCol = reactive({
    xs: { span: 5 },
    sm: { span: 11 },
  });
  const wrapperCol = reactive({
    xs: { span: 5 },
    sm: { span: 11 },
  });
  // Emits声明
  const emit = defineEmits(['register', 'success']);
  const formRef = ref();
  let router = reactive({});
  const isUpdate = ref(true);
  const questionId = ref();
  const dataSource = ref<any>([]);
  const className = ref();
  const classId = ref();
  const [registerQuestion, { setModalProps, closeModal }] = useModalInner(async (data) => {
    isUpdate.value = !!data?.isUpdate;
    className.value = data.className;
    classId.value = data.classId;
    setModalProps({ confirmLoading: false });
    initRouter();
    if (unref(isUpdate)) {
      dataSource.value = [];
      router = Object.assign(router, data.record);
      questionId.value = data.record.questionId;
      defHttp
        .get({ url: Api.reviewAnswerList, params: { questionId: data.record.questionId } })
        .then((res) => {
          console.log('选项列表res：', res);
          console.log('选项列表dataSource：', dataSource.value);
          if (dataSource.value.length <= 0) {
            for (let i = 0; i < res.length; i++) {
              dataSource.value.push(res[i]);
            }
          }
        })
        .catch(() => {
          console.log('获取数据失败');
        });
    } else {
      dataSource.value = [];
    }
  });
  //初始化参数
  function initRouter() {
    router = Object.assign(router, {
      className: '',
      questionType: '',
      content: '',
      questionId: '',
    });
  }
  const getTitle = computed(() => (!unref(isUpdate) ? '新增题目' : '编辑题目'));
  const options = [
    {
      value: '1',
      label: '单选题',
    },
    {
      value: '2',
      label: '问答题',
    },
    {
      value: '3',
      label: '多选题',
    },
  ];
  const columns = [
    {
      title: '答案序号',
      align: 'center',
      dataIndex: 'selCode',
    },
    {
      title: '内容',
      align: 'center',
      dataIndex: 'selectContent',
    },
    {
      title: '分值',
      align: 'center',
      dataIndex: 'selectGrade',
    },
    {
      title: '操作',
      align: 'center',
      dataIndex: 'operation',
    },
  ];
  const count = computed(() => dataSource.value.length + 1);
  const editableData = reactive({});
  const save = (answerId: string) => {
    Object.assign(dataSource.value.filter((item) => answerId === item.answerId)[0], editableData[answerId]);
    delete editableData[answerId];
  };
  const edit = (answerId: string) => {
    editableData[answerId] = cloneDeep(dataSource.value.filter((item) => answerId === item.answerId)[0]);
  };
  const onDelete = (answerId: string) => {
    dataSource.value = dataSource.value.filter((item) => item.answerId !== answerId);
  };
  //控制选项添加数量
  const arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
  const handleAdd = () => {
    if (count.value <= arr.length) {
      const newData = {
        answerId: count.value, //定位选项，后台再由uuid方式生成
        selCode: arr[count.value - 1],
        selectContent: '',
        selectGrade: ``,
        selectId: '',
      };
      dataSource.value.push(newData);
    }
  };
  /**
   * 提交
   */
  async function handleSubmit() {
    await formRef.value.validate().then(() => {
      try {
        //重新构造表单提交对象,切记不可修改router对象，数组修改为字符串容易造成界面混乱
        let params = Object.assign({}, router, {
          selectList: unref(dataSource.value),
          classId: classId.value,
        });
        console.log('表单提交对象:', params);
        closeModal();
        setModalProps({ confirmLoading: true });
        //提交表单
        saveOrUpdateQuestion(params, unref(isUpdate)).then(() => {
          closeModal();
          emit('success');
        });
      } finally {
        setModalProps({ confirmLoading: false });
      }
    });
  }
</script>

<style lang="less" scoped>
  ::v-deep .ant-table-thead > tr > th,
  .ant-table-tbody > tr > td {
    padding: 6px 6px;
    overflow-wrap: break-word;
  }
  ::v-deep .ant-table-tbody .ant-table-row td {
    padding-top: 6px;
    padding-bottom: 6px;
  }
  .editable-cell {
    position: relative;
    .editable-cell-input-wrapper,
    .editable-cell-text-wrapper {
      padding-right: 24px;
    }

    .editable-cell-text-wrapper {
      padding: 5px 24px 5px 5px;
    }

    .editable-cell-icon,
    .editable-cell-icon-check {
      position: absolute;
      right: 0;
      width: 20px;
      cursor: pointer;
    }

    .editable-cell-icon {
      margin-top: 1px;
      display: none;
    }

    .editable-cell-icon-check {
      line-height: 28px;
    }

    .editable-cell-icon:hover,
    .editable-cell-icon-check:hover {
      color: #108ee9;
    }
  }
  .editable-cell:hover .editable-cell-icon {
    display: inline-block;
  }
</style>
