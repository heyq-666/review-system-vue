<template>
  <BasicModal v-bind="$attrs" @register="registerModal1" title="测评记录" :showOkBtn="false" width="1200px" destroyOnClose>
    <BasicTable @register="registerTable">
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
    </BasicTable>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getRecordList, deleteRecord } from '/@/views/review/userManage/ReviewUser.api';
  import { recordColumn } from '/@/views/review/userManage/ReviewUser.data';
  import { ref, unref } from 'vue';
  const userId = ref('');
  const [registerModal1, { setModalProps, closeModal }] = useModalInner(async (data) => {
    userId.value = data.userId;
    setProps({ searchInfo: { userId: unref(userId) } });
    reload();
  });
  //注册table数据
  const [registerTable, { reload, setProps }] = useTable({
    api: getRecordList,
    columns: recordColumn,
    striped: true,
    useSearchForm: false,
    showTableSetting: false,
    ellipsis: true,
    clickToRowSelect: false,
    bordered: true,
    showIndexColumn: true,
    pagination: true,
    tableSetting: { fullScreen: true },
    canResize: false,
    actionColumn: {
      width: 100,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
      fixed: undefined,
    },
  });
  function getTableAction(record) {
    return [
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
   * 删除
   */
  async function handleDelete(record) {
    await deleteRecord({ resultId: record.resultId }, reload);
  }
</script>
