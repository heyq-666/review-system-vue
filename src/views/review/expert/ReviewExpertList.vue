<template>
  <div>
    <!--引用表格-->
    <BasicTable @register="registerTable" :rowSelection="rowSelection">
      <!--插槽:table标题-->
      <template #tableTitle>
        <a-button type="primary" @click="handleAdd" preIcon="ant-design:plus-outlined"> 新增</a-button>
        <a-dropdown v-if="selectedRowKeys.length > 0">
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="batchHandleDelete">
                <Icon icon="ant-design:delete-outlined" />
                删除
              </a-menu-item>
            </a-menu>
          </template>
          <a-button
            >批量操作
            <Icon icon="mdi:chevron-down" />
          </a-button>
        </a-dropdown>
      </template>
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)" />
      </template>
      <!--字段回显插槽-->
      <template #htmlSlot="{ text }">
        <div v-html="text"></div>
      </template>
    </BasicTable>
    <!-- 表单区域 -->
    <ReviewExpertModal @register="registerModal" @success="handleSuccess" />
    <!-- 专家日历表单 -->
    <ReviewCalendarModal @register="registerCalendarModal" @success="handleSuccess" />
    <!-- 专家排班表单 -->
    <ReviewCalendarDetailModal @register="expertCalendarDetailModal" @success="handleSuccess" />
  </div>
</template>

<script lang="ts" name="reviewExpert-reviewExpert" setup>
  import { BasicTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage';
  import ReviewExpertModal from '/@/views/review/expert/components/ReviewExpertModal.vue';
  import ReviewCalendarModal from '/@/views/review/expert/components/ReviewCalendarModal.vue';
  import ReviewCalendarDetailModal from '/@/views/review/expert/components/ReviewCalendarDetailModal.vue';
  import { columns, searchFormSchema } from '/@/views/review/expert/ReviewExpert.data';
  import { list, deleteOne, batchDelete, getImportUrl, getExportUrl } from '/@/views/review/expert/ReviewExpert.api';
  //注册model
  const [registerModal, { openModal }] = useModal();
  const [registerCalendarModal, { openModal: openRecordModal }] = useModal();
  const [expertCalendarDetailModal, { openModal: openDetailModal }] = useModal();
  //注册table数据
  const { tableContext } = useListPage({
    tableProps: {
      title: 'review_expert',
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
    },
    exportConfig: {
      name: 'review_expert',
      url: getExportUrl,
    },
    importConfig: {
      url: getImportUrl,
      success: handleSuccess,
    },
  });

  const [registerTable, { reload }, { rowSelection, selectedRowKeys }] = tableContext;

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
   * 专家日历设置
   */
  function handleCalendar(record: Recordable) {
    openRecordModal(true, {
      record,
      isUpdate: true,
      showFooter: true,
    });
  }
  /**
   * 专家日历详情
   */
  function handleDetailCalendar(record: Recordable) {
    openDetailModal(true, {
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
   * 删除事件
   */
  async function handleDelete(record) {
    await deleteOne({ id: record.id }, handleSuccess);
  }
  /**
   * 批量删除事件
   */
  async function batchHandleDelete() {
    await batchDelete({ ids: selectedRowKeys.value }, handleSuccess);
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
        label: '日历设置',
        onClick: handleCalendar.bind(null, record),
      },
      {
        label: '查看日历',
        onClick: handleDetailCalendar.bind(null, record),
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
</script>

<style scoped></style>
