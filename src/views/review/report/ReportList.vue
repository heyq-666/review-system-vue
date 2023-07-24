<template>
  <div>
    <BasicTable @register="registerTable">
      <!--插槽:table标题-->
      <template #tableTitle>
        <a-button type="primary" @click="handleAdd" preIcon="ant-design:plus-outlined"> 添加维度</a-button>
      </template>
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
    </BasicTable>
    <!-- 表单区域 -->
    <ReportModal @register="registerModal" @success="handleSuccess" />
    <ReportSetModal @register="registerReportSetModal" @success="handleSuccess" />
  </div>
</template>

<script lang="ts" setup>
  import { BasicTable, TableAction } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { list } from '/@/views/review/report/Report.api';
  import { columns, searchFormReport } from '/@/views/review/report/Report.data';
  import { useModal } from '/@/components/Modal';
  import ReportModal from '/@/views/review/report/components/ReportModal.vue';
  import ReportSetModal from '/@/views/review/report/components/ReportSetModal.vue';
  import { deleteOne } from '/@/views/review/report/Report.api';
  //注册model
  const [registerModal, { openModal }] = useModal();
  const [registerReportSetModal, { openModal: openReportSetModal }] = useModal();
  const { tableContext } = useListPage({
    tableProps: {
      title: '维度列表',
      api: list,
      columns,
      formConfig: {
        schemas: searchFormReport,
      },
      canResize: false,
      actionColumn: {
        width: 200,
        fixed: 'right',
      },
      defSort: {
        column: 'classId',
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
   * 删除事件
   */
  async function handleDelete(record) {
    await deleteOne({ reportId: record.reportId }, handleSuccess);
  }
  /**
   * 成功回调
   */
  function handleSuccess() {
    (selectedRowKeys.value = []) && reload();
  }
  /**
   * 计分设置
   */
  function handleReportSetEdit(record: Recordable) {
    console.log('传入数据：', record);
    openReportSetModal(true, {
      record,
      isUpdate: true,
      showFooter: true,
      ruleCode: 'gradeConf',
    });
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
        label: '维度设置',
        onClick: handleReportSetEdit.bind(null, record),
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
  /**
   * 下拉操作栏
   */
  /*function getDropDownAction(record) {
    return [
      {
        label: '删除',
        popConfirm: {
          title: '是否确认删除',
          confirm: handleDelete.bind(null, record),
        },
      },
    ];
  }*/
</script>

<style scoped></style>
