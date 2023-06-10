<template>
  <div>
    <!--引用表格-->
    <BasicTable @register="registerTable">
      <!--插槽:table标题-->
      <template #tableTitle>
        <a-button type="primary" @click="handleAdd" preIcon="ant-design:plus-outlined"> 新增</a-button>
        <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>
        <j-upload-button type="primary" preIcon="ant-design:import-outlined" @click="onImportXls"> 导入</j-upload-button>
        <a-button type="primary" preIcon="ant-design:export-outlined" @click="openQuestionAnswerModal"> 导出答题记录</a-button>
      </template>
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)" />
      </template>
    </BasicTable>
    <!-- 表单区域 -->
    <ReviewUserModal @register="registerModal" @success="handleSuccess" />
    <!-- 测评记录表单区域 -->
    <ReviewRecordModal @register="registerModal1" @success="handleSuccess" />
    <!-- 答题记录导出表单 -->
    <QuestionAnswer @register="registerQuestionAnswer" @success="handleSuccess" />
  </div>
</template>

<script lang="ts" name="reviewUser-reviewUser" setup>
  import { BasicTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage';
  import ReviewUserModal from './components/ReviewUserModal.vue';
  import { columns, searchFormSchema } from './ReviewUser.data';
  import { list, deleteOne, getImportUrl, getExportUrl } from './ReviewUser.api';
  import ReviewRecordModal from '/@/views/review/userManage/components/ReviewRecordModal.vue';
  import QuestionAnswer from '/@/views/review/userManage/components/QuestionAnswerModal.vue';
  //注册model
  const [registerModal, { openModal }] = useModal();
  const [registerModal1, { openModal: openRecordModal }] = useModal();
  const [registerQuestionAnswer, { openModal: openQuestionAnswer }] = useModal();
  //注册table数据
  const { tableContext, onExportXls, onImportXls } = useListPage({
    tableProps: {
      title: '测评用户',
      api: list,
      columns,
      canResize: false,
      formConfig: {
        schemas: searchFormSchema,
        autoSubmitOnEnter: true,
        showAdvancedButton: true,
        fieldMapToNumber: [],
        fieldMapToTime: [],
      },
      actionColumn: {
        width: 120,
        fixed: 'right',
      },
      defSort: {
        column: 'updateTime',
        order: 'desc',
      },
    },
    exportConfig: {
      name: '测评用户',
      url: getExportUrl,
    },
    importConfig: {
      url: getImportUrl,
      success: handleSuccess,
    },
  });

  const [registerTable, { reload }, { selectedRowKeys }] = tableContext;

  /**
   * 新增事件
   */
  function handleAdd() {
    openModal(true, {
      isUpdate: false,
      showFooter: true,
    });
  }
  /**
   * 编辑事件
   */
  function handleEdit(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
      showFooter: true,
    });
  }
  /**
   * 详情
   */
  function handleDetail(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
      showFooter: false,
    });
  }
  /**
   * 查看测评记录
   */
  function handleRecordDetail(record: Recordable) {
    openRecordModal(true, {
      record,
      userId: record.userId,
      isUpdate: true,
      showFooter: false,
    });
  }
  /**
   * 删除事件
   */
  async function handleDelete(record) {
    await deleteOne({ userId: record.userId }, handleSuccess);
  }
  /**
   * 成功回调
   */
  function handleSuccess() {
    (selectedRowKeys.value = []) && reload();
  }
  /**
   * 操作栏
   */
  function getTableAction(record) {
    return [
      {
        label: '编辑',
        onClick: handleEdit.bind(null, record),
      },
    ];
  }
  /**
   * 下拉操作栏
   */
  function getDropDownAction(record) {
    return [
      {
        label: '查看测评记录',
        onClick: handleRecordDetail.bind(null, record),
      },
      {
        label: '详情',
        onClick: handleDetail.bind(null, record),
      },
      {
        label: '删除',
        popConfirm: {
          title: '是否确认删除',
          confirm: handleDelete.bind(null, record),
        },
      },
    ];
  }
  function openQuestionAnswerModal() {
    openQuestionAnswer(true, {});
  }
</script>

<style scoped></style>
