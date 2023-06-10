<template>
  <BasicModal v-bind="$attrs" @register="longDistanceTrainModal" destroyOnClose :title="title" :width="800" :height="900">
    <BasicTable @register="longDistanceTrainTable" :searchInfo="searchInfo">
      <template #tableTitle>
        <a-button type="primary" @click="handleCreate"> 新增</a-button>
      </template>
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
    </BasicTable>
  </BasicModal>
  <LongDistanceTrainDetailModal @register="registerLongModal" @success="handleSuccess" />
</template>

<script lang="ts" setup>
  import { BasicModal, useModal, useModalInner } from '/@/components/Modal';
  import { BasicTable, TableAction } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { deleteOneLongDistanceTrain, expertLongDistanceTrainList } from '/@/views/review/expert/ReviewExpert.api';
  import { calendarDetailSchema, expertLongDistanceTrainColumns } from '/@/views/review/expert/ReviewExpert.data';
  import { computed, ref } from 'vue';
  import LongDistanceTrainDetailModal from '/@/views/review/expert/components/LongDistanceTrainDetailModal.vue';
  const searchInfo = {};
  const expertId = ref('');
  //注册modal
  const [longDistanceTrainModal, { setModalProps }] = useModalInner(async (data) => {
    setModalProps({ confirmLoading: false, showCancelBtn: true, showOkBtn: false });
    searchInfo['expertId'] = data.record.id;
    expertId.value = data.record.id;
  });
  //设置标题
  const title = computed(() => '长程培训列表');
  //注册table数据
  const { tableContext } = useListPage({
    tableProps: {
      api: expertLongDistanceTrainList,
      columns: expertLongDistanceTrainColumns,
      canResize: false,
      showTableSetting: false,
      formConfig: {
        schemas: calendarDetailSchema,
        autoSubmitOnEnter: true,
        showAdvancedButton: true,
      },
      actionColumn: {
        width: 120,
        fixed: 'right',
      },
    },
  });
  const [longDistanceTrainTable, { reload }, { selectedRowKeys }] = tableContext;

  const [registerLongModal, { openModal }] = useModal();
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
        onClick: handleDelete.bind(null, record),
      },
    ];
  }
  /**
   * 删除事件
   */
  async function handleDelete(record) {
    await deleteOneLongDistanceTrain({ id: record.id }, handleSuccess);
  }
  /**
   * 成功回调
   */
  function handleSuccess() {
    (selectedRowKeys.value = []) && reload();
  }
  /**
   * 新增
   */
  function handleCreate() {
    openModal(true, {
      isUpdate: false,
      showFooter: true,
      expertId: expertId.value,
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
