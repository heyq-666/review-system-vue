<template>
  <div>
    <BasicModal v-bind="$attrs" @register="expertCalendarDetailModal" destroyOnClose :title="title" :width="800" :height="900">
      <BasicTable @register="calendarDetailTable" :searchInfo="searchInfo">
        <!--操作栏-->
        <template #action="{ record }">
          <TableAction :actions="getTableAction(record)" />
        </template>
      </BasicTable>
    </BasicModal>
  </div>
</template>

<script lang="ts" setup>
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { computed } from 'vue';
  import { BasicTable, TableAction } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { expertCalendarDetailList, deleteOneCalendar } from '/@/views/review/expert/ReviewExpert.api';
  import { calendarDetailColumns, calendarDetailSchema } from '/@/views/review/expert/ReviewExpert.data';
  const searchInfo = {};
  //注册modal
  const [expertCalendarDetailModal, { setModalProps }] = useModalInner(async (data) => {
    setModalProps({ confirmLoading: false, showCancelBtn: true, showOkBtn: false });
    searchInfo['expertId'] = data.record.id;
  });
  //设置标题
  const title = computed(() => '专家日历');
  //注册table数据
  const { tableContext } = useListPage({
    tableProps: {
      api: expertCalendarDetailList,
      columns: calendarDetailColumns,
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
  const [calendarDetailTable, { reload }, { selectedRowKeys }] = tableContext;
  /**
   * 操作栏
   */
  function getTableAction(record) {
    return [
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
    await deleteOneCalendar({ id: record.id }, handleSuccess);
  }
  /**
   * 成功回调
   */
  function handleSuccess() {
    (selectedRowKeys.value = []) && reload();
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
