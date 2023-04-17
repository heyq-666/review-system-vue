<template>
  <div>
    <BasicModal v-bind="$attrs" @register="contactRecordsListModal" destroyOnClose :title="title" :width="800" :height="900">
      <BasicTable @register="contactRecordsListTable" :searchInfo="searchInfo">
        <!--操作栏-->
        <template #action="{ record }">
          <TableAction :actions="getTableAction(record)" />
        </template>
      </BasicTable>
      <!--      <ContactRecordsDetailModal @register="contactRecordsDetailModal" @success="handleSuccess" />-->
      <ContactRecordsModal @register="contactRecordsDetailModal" @success="handleSuccess" />
    </BasicModal>
  </div>
</template>

<script lang="ts" setup>
  import { BasicModal, useModal, useModalInner } from '/@/components/Modal';
  import { computed } from 'vue';
  import { BasicTable, TableAction } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { contactRecordsListColumns, contactRecordsListSchema } from '/@/views/review/intake/ReviewIntake.data';
  import { contactRecordsList, deleteOneContactRecord } from '/@/views/review/intake/ReviewIntake.api';
  //import ContactRecordsDetailModal from '/@/views/review/intake/components/ContactRecordsDetailModal.vue';
  import ContactRecordsModal from '/@/views/review/intake/components/ContactRecordsModal.vue';

  const searchInfo = {};
  //注册modal
  const [contactRecordsListModal, { setModalProps }] = useModalInner(async (data) => {
    setModalProps({ confirmLoading: false, showCancelBtn: true, showOkBtn: false });
    searchInfo['intakeId'] = data.record.id;
  });
  //注册联系记录详情modal
  const [contactRecordsDetailModal, { openModal }] = useModal();

  //设置标题
  const title = computed(() => '联系记录列表');
  //注册table数据
  const { tableContext } = useListPage({
    tableProps: {
      api: contactRecordsList,
      columns: contactRecordsListColumns,
      canResize: false,
      showTableSetting: false,
      useSearchForm: false,
      formConfig: {
        schemas: contactRecordsListSchema,
        autoSubmitOnEnter: true,
        showAdvancedButton: true,
      },
      actionColumn: {
        width: 120,
        fixed: 'right',
      },
    },
  });
  const [contactRecordsListTable, { reload }, { selectedRowKeys }] = tableContext;
  /**
   * 操作栏
   */
  function getTableAction(record) {
    return [
      {
        label: '删除',
        onClick: handleDelete.bind(null, record),
      },
      {
        label: '编辑',
        onClick: handleEditContactRecord.bind(null, record),
      },
    ];
  }
  /**
   * 删除事件
   */
  async function handleDelete(record) {
    await deleteOneContactRecord({ id: record.id }, handleSuccess);
  }
  /**
   * 成功回调
   */
  function handleSuccess() {
    (selectedRowKeys.value = []) && reload();
  }

  /**
   * 联系记录编辑事件
   */
  function handleEditContactRecord(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
      showFooter: true,
    });
  }
</script>

<style lang="less" scoped>
  /** 时间和数字输入框样式 */
  :deep(.ant-input-number) {
    width: 100%;
  }

  :deep(.ant-calendar-picker) {
    width: 100%;
  }
</style>
