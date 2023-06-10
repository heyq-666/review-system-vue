<template>
  <div>
    <!--引用表格-->
    <BasicTable @register="registerTable">
      <!--插槽:table标题-->
      <template #tableTitle>
        <a-button type="primary" @click="handleAdd" preIcon="ant-design:plus-outlined"> 添加量表</a-button>
      </template>
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)" />
      </template>
    </BasicTable>
    <!-- 表单区域 -->
    <ReviewClassModal @register="registerModal" @success="handleSuccess" />
    <!-- 报告设置 -->
    <ReviewReportConf @register="registerReportModal" @success="handleSuccess" />
    <!-- 报告列表设置 -->
    <ReviewReportListModal @register="reviewReportListModal" @success="handleSuccess" />
  </div>
</template>

<script lang="ts" name="reviewClass-reviewClass" setup>
  import { BasicTable, TableAction } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { useModal } from '/@/components/Modal';
  import ReviewClassModal from './components/ReviewClassModal.vue';
  import { columns, searchFormSchema } from './ReviewClass.data';
  import { list, deleteOne, publishBatch } from './ReviewClass.api';
  import ReviewReportConf from '/@/views/review/reviewClass/components/ReviewReportConf.vue';
  import ReviewReportListModal from '/@/views/review/reviewClass/components/ReviewReportListModal.vue';
  //注册model
  const [registerModal, { openModal }] = useModal();
  const [registerReportModal, { openModal: openReportConfModal }] = useModal();
  const [reviewReportListModal, { openModal: openReportListModal }] = useModal();
  //注册table数据
  const { tableContext } = useListPage({
    tableProps: {
      title: '测评量表',
      api: list,
      columns,
      rowKey: 'classId',
      formConfig: {
        schemas: searchFormSchema,
        fieldMapToTime: [['createTime', ['createTime_begin', 'createTime_end'], 'YYYY-MM-DD']],
      },
      rowSelection: { type: 'radio' },
      actionColumn: {
        width: 120,
        fixed: 'right',
      },
      defSort: {
        column: 'sortId',
        order: 'asc',
      },
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
      isOpenQuestionList: false,
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
      isOpenQuestionList: true,
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
      isOpenQuestionList: false,
    });
  }
  /**
   * 删除事件
   */
  async function handleDelete(record) {
    await deleteOne({ classId: record.classId }, handleSuccess);
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
      {
        label: '停用',
        ifShow: record.status == 1,
        popConfirm: {
          title: '确定停用吗?',
          confirm: handlePublish.bind(null, record, 0),
        },
      },
      {
        label: '发布',
        ifShow: record.status == 0,
        popConfirm: {
          title: '确定发布吗?',
          confirm: handlePublish.bind(null, record, 1),
        },
      },
      {
        label: '报告设置',
        onClick: handleReportConf.bind(null, record),
      },
      {
        label: '查看报告',
        onClick: handleReportList.bind(null, record),
      },
    ];
  }
  /**
   * 报告设置
   */
  function handleReportConf(record: Recordable) {
    openReportConfModal(true, {
      record,
      isUpdate: true,
      showFooter: true,
    });
  }
  /**
   * 发布/停用量表
   */
  async function handlePublish(record, status) {
    await publishBatch({ classIds: record.classId, status: status }, reload);
  }
  /**
   * 专家日历详情
   */
  function handleReportList(record: Recordable) {
    openReportListModal(true, {
      record,
      isUpdate: true,
      showFooter: true,
    });
  }
</script>

<style scoped></style>
