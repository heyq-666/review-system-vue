<template>
  <div>
    <BasicTable @register="registerTable">
      <template #tableTitle>
        <a-button type="primary" @click="handleAdd" preIcon="ant-design:plus-outlined"> 录入</a-button>
      </template>
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)" />
      </template>
    </BasicTable>
    <ReviewBannerModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>

<script lang="ts" setup>
  import { BasicTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage';
  import ReviewBannerModal from '/@/views/review/banner/components/ReviewBannerModal.vue';
  import { deleteOne, list, publishBatch } from '/@/views/review/banner/ReviewBanner.api';
  import { columns } from '/@/views/review/banner/ReviewBanner.data';

  const [registerModal, { openModal }] = useModal();

  //注册table数据
  const { tableContext } = useListPage({
    tableProps: {
      title: '专题列表',
      api: list,
      columns,
      canResize: false,
      actionColumn: {
        width: 120,
        fixed: 'right',
      },
      useSearchForm: false,
      pagination: {
        current: 1,
        pageSize: 5,
        pageSizeOptions: ['5', '10', '15'],
      },
    },
  });
  const [registerTable, { reload }, { selectedRowKeys }] = tableContext;

  function getTableAction(record) {
    return [
      {
        label: '编辑',
        onClick: handleEdit.bind(null, record),
      },
    ];
  }
  function getDropDownAction(record) {
    return [
      {
        label: '详情',
        onClick: handleDetail.bind(null, record),
      },
      {
        label: '下线',
        ifShow: record.status == 1,
        popConfirm: {
          title: '确定下线吗?',
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
        label: '删除',
        popConfirm: {
          title: '是否确认删除',
          confirm: handleDelete.bind(null, record),
        },
      },
    ];
  }
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
   * 编辑
   */
  function handleEdit(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
      showFooter: true,
    });
  }
  /**
   * 成功回调
   */
  function handleSuccess() {
    (selectedRowKeys.value = []) && reload();
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
   * 删除
   */
  async function handleDelete(record) {
    await deleteOne({ id: record.id }, handleSuccess);
  }
  /**
   * 发布/停用公告
   */
  async function handlePublish(record, status) {
    await publishBatch({ ids: record.id, status: status }, reload);
  }
</script>

<style scoped></style>
