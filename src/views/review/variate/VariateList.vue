<template>
  <div>
    <BasicTable @register="registerTable">
      <!--插槽:table标题-->
      <template #tableTitle>
        <a-button type="primary" @click="handleAdd" preIcon="ant-design:plus-outlined"> 添加因子</a-button>
      </template>
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)" />
      </template>
    </BasicTable>
    <!-- 表单区域 -->
    <VariateModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>

<script lang="ts" setup>
  import { BasicTable, TableAction } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { list } from '/@/views/review/variate/VariateList.api';
  import { columns, searchFormSchema } from '/@/views/review/variate/VariateList.data';
  import { useModal } from '/@/components/Modal';
  import VariateModal from '/@/views/review/variate/components/VariateModal.vue';
  import { deleteOne } from '/@/views/review/variate/VariateList.api';

  //注册model
  const [registerModal, { openModal }] = useModal();

  const { tableContext } = useListPage({
    tableProps: {
      title: '因子列表',
      api: list,
      columns,
      formConfig: {
        schemas: searchFormSchema,
      },
      canResize: false,
      actionColumn: {
        width: 120,
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
    await deleteOne({ variateId: record.variateId }, handleSuccess);
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
      /*{
        label: '计分设置',
        onClick: handleRecordDetail.bind(null, record),
      },*/
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

<style scoped></style>
