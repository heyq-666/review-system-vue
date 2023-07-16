<template>
  <div>
    <!--引用表格-->
    <BasicTable @register="registerQuestionList" :searchInfo="searchInfo">
      <!--插槽:table标题-->
      <template #tableTitle>
        <a-button type="primary" @click="handleCreate" preIcon="ant-design:plus-outlined"> 新增题目</a-button>
        <j-upload-button type="primary" preIcon="ant-design:import-outlined" @click="onImportXls">导入题库</j-upload-button>
        <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出题库</a-button>
      </template>
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
    </BasicTable>
    <QuestionModal @register="registerQuestion" />
  </div>
</template>

<script lang="ts" setup>
  import { BasicTable, TableAction } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { useModal } from '/@/components/Modal';
  import QuestionModal from '/@/views/review/reviewClass/components/QuestionEdit.vue';
  import { reviewQuestionColumns } from './ReviewClass.data';
  import { reviewQuestionList, reviewQuestionDelete, reviewQuestionExportUrl } from './ReviewClass.api';
  import { inject, unref, watch } from 'vue';
  import { isEmpty } from '/@/utils/is';
  import { useMessage } from '/@/hooks/web/useMessage';
  //提示弹窗
  const $message = useMessage();
  //接收主表id
  const mainId = inject('mainId') || '';
  const className = inject('className') || '';
  const [registerQuestion, { openModal }] = useModal();
  const searchInfo = {};
  // 列表页面公共参数、方法
  const { tableContext, onImportXls, onExportXls } = useListPage({
    tableProps: {
      api: reviewQuestionList,
      columns: reviewQuestionColumns,
      canResize: false,
      useSearchForm: false,
      actionColumn: {
        width: 180,
      },
      pagination: {
        current: 1,
        pageSize: 5,
        pageSizeOptions: ['5', '10', '20'],
      },
      defSort: {
        column: 'questionNum',
        order: 'asc',
      },
    },
    importConfig: {
      url: '/reviewQuestion/reviewQuestion/importReviewQuestion?classId=' + unref(mainId),
    },
    exportConfig: {
      url: reviewQuestionExportUrl,
    },
  });

  //注册table数据
  const [registerQuestionList, { reload }, { selectedRowKeys }] = tableContext;
  /**
   * 新增事件
   */
  function handleCreate() {
    if (isEmpty(unref(mainId))) {
      $message.createMessage.warning('无量表信息');
      return;
    }
    openModal(true, {
      classId: unref(mainId),
      className: unref(className),
      isUpdate: false,
      showFooter: true,
    });
  }
  watch(
    mainId,
    () => {
      searchInfo['classId'] = unref(mainId);
      reload();
    },
    { immediate: true }
  );

  /**
   * 编辑事件
   */
  async function handleEdit(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
      showFooter: true,
    });
  }

  /**
   * 删除事件
   */
  async function handleDelete(record) {
    await reviewQuestionDelete({ id: record.id }, handleSuccess);
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
      {
        label: '删除',
        popConfirm: {
          title: '是否确认删除',
          confirm: handleDelete.bind(null, record),
        },
      },
    ];
  }
</script>
