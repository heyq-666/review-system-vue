<template>
  <div>
    <!--引用表格-->
    <BasicTable @register="registerTable" :rowSelection="rowSelection">
      <!--插槽:table标题-->
      <template #tableTitle>
        <a-button type="primary" @click="handleAdd" preIcon="ant-design:plus-outlined"> 新增</a-button>
      </template>
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)" />
      </template>
    </BasicTable>
    <!--子表表格tab-->
    <a-tabs defaultActiveKey="1">
      <a-tab-pane tab="&nbsp;&nbsp;题目列表" key="1">
        <ReviewQuestionList />
      </a-tab-pane>
    </a-tabs>
    <!-- 表单区域 -->
    <ReviewClassModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>

<script lang="ts" name="reviewClass-reviewClass" setup>
  import { computed, unref, provide } from 'vue';
  import { BasicTable, TableAction } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { useModal } from '/@/components/Modal';
  import ReviewClassModal from './components/ReviewClassModal.vue';
  import ReviewQuestionList from './ReviewQuestionList.vue';
  import { columns, searchFormSchema } from './ReviewClass.data';
  import { list, deleteOne, publishBatch } from './ReviewClass.api';
  //注册model
  const [registerModal, { openModal }] = useModal();
  //注册table数据
  const { tableContext } = useListPage({
    tableProps: {
      title: '测评量表',
      api: list,
      columns,
      canResize: false,
      rowSelection: { type: 'radio' },
      formConfig: {
        schemas: searchFormSchema,
        fieldMapToNumber: [],
        fieldMapToTime: [['createTime', ['createTime_begin', 'createTime_end'], 'YYYY-MM-DD']],
      },
      actionColumn: {
        width: 120,
        fixed: 'right',
      },
      pagination: {
        current: 1,
        pageSize: 10,
        pageSizeOptions: ['10', '15', '20'],
      },
      defSort: {
        column: 'sortId',
        order: 'asc',
      },
    },
  });

  const [registerTable, { reload }, { rowSelection, selectedRowKeys }] = tableContext;

  const mainId = computed(() => (unref(selectedRowKeys).length > 0 ? unref(selectedRowKeys)[0] : ''));
  //下发 mainId,子组件接收
  provide('mainId', mainId);
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
   * 删除事件
   */
  async function handleDelete(record) {
    await deleteOne({ id: record.id }, handleSuccess);
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
    ];
  }
  /**
   * 发布/停用量表
   */
  async function handlePublish(record, status) {
    console.log(record);
    await publishBatch({ ids: record.id, status: status }, reload);
  }
</script>

<style scoped></style>
