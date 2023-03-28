<template>
  <div>
    <BasicTable @register="registerTable">
      <template #tableTitle>
        <a-button type="primary" @click="handleAdd" preIcon="ant-design:plus-outlined"> 添加项目</a-button>
      </template>
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)" />
      </template>
    </BasicTable>
    <!--表单-->
    <ReviewProjectModal @register="registerModal" @success="handleSuccess" />
    <!--二维码查看-->
    <ProjectQrCode value="codeUrl" @register="register" />
  </div>
</template>

<script lang="ts" name="reviewProject" setup>
  import { BasicTable, TableAction } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { deleteOne, list } from '/@/views/review/reviewProject/ReviewProject.api';
  import { columns } from '/@/views/review/reviewProject/ReviewProject.data';
  import { useModal } from '/@/components/Modal';
  import ReviewProjectModal from '/@/views/review/reviewProject/components/ReviewProjectModal.vue';
  import ProjectQrCode from '/@/views/review/reviewProject/components/ProjectQrCode.vue';

  const [registerModal, { openModal }] = useModal();
  const [register, { openModal: qrCodeModal }] = useModal();
  //注册table数据
  const { tableContext } = useListPage({
    tableProps: {
      title: '项目列表',
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
        pageSize: 10,
        pageSizeOptions: ['10', '15', '20'],
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
        label: '查看二维码',
        onClick: function () {
          qrCodeModal(true, {
            record,
            showFooter: false,
          });
        },
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
   * 删除单个项目
   */
  async function handleDelete(record) {
    await deleteOne({ id: record.id }, handleSuccess);
  }
</script>

<style scoped></style>
