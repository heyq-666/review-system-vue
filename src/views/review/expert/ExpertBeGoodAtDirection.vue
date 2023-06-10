<template>
  <a-card :bordered="false" style="height: 100%">
    <div class="j-table-operator" style="width: 100%">
      <a-button type="primary" preIcon="ant-design:plus-outlined" @click="onAddDepart">新增</a-button>
      <a-button type="primary" preIcon="ant-design:plus-outlined" @click="onAddChildDepart()">添加下级</a-button>
      <template v-if="checkedKeys.length > 0">
        <a-dropdown>
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="onDeleteBatch">
                <icon icon="ant-design:delete-outlined" />
                <span>删除</span>
              </a-menu-item>
            </a-menu>
          </template>
          <a-button>
            <span>批量操作 </span>
            <icon icon="akar-icons:chevron-down" />
          </a-button>
        </a-dropdown>
      </template>
    </div>
    <a-alert type="info" show-icon class="alert" style="margin-bottom: 8px">
      <template #message>
        <template v-if="checkedKeys.length > 0">
          <span>已选中 {{ checkedKeys.length }} 条记录</span>
          <a-divider type="vertical" />
          <a @click="checkedKeys = []">清空</a>
        </template>
        <template v-else>
          <span>未选中任何数据</span>
        </template>
      </template>
    </a-alert>
    <a-spin :spinning="loading">
      <!--组织机构树-->
      <template v-if="treeData.length > 0">
        <a-tree
          v-if="!treeReloading"
          checkable
          :clickRowToExpand="false"
          :treeData="treeData"
          :selectedKeys="selectedKeys"
          :checkStrictly="checkStrictly"
          :load-data="loadChildrenTreeData"
          :checkedKeys="checkedKeys"
          v-model:expandedKeys="expandedKeys"
          @check="onCheck"
          @select="onSelect"
        >
          <template #title="{ key: treeKey, title, dataRef }">
            <a-dropdown :trigger="['contextmenu']">
              <Popconfirm
                :visible="visibleTreeKey === treeKey"
                title="确定要删除吗？"
                ok-text="确定"
                cancel-text="取消"
                placement="rightTop"
                @confirm="onDelete(dataRef)"
                @visibleChange="onVisibleChange"
              >
                <span>{{ title }}</span>
              </Popconfirm>

              <template #overlay>
                <a-menu @click="">
                  <a-menu-item key="1" @click="onAddChildDepart(dataRef)">添加子级</a-menu-item>
                  <a-menu-item key="2" @click="visibleTreeKey = treeKey">
                    <span style="color: red">删除</span>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </template>
        </a-tree>
      </template>
      <a-empty v-else description="暂无数据" />
    </a-spin>
    <BeGoodAtFormModal :rootTreeData="treeData" @register="registerModal" @success="loadRootTreeData" />
  </a-card>
</template>

<script lang="ts" setup>
  import { nextTick, ref, unref, defineExpose } from 'vue';
  import { useModal } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { deleteBatchDepart } from '/@/views/system/depart/depart.api';
  import { queryBeGoodAtTreeSync } from '/@/views/review/expert/ReviewExpert.api';
  import { Popconfirm } from 'ant-design-vue';
  import BeGoodAtFormModal from '/@/views/review/expert/components/BeGoodAtFormModal.vue';

  const emit = defineEmits(['select', 'rootTreeData']);
  const { createMessage } = useMessage();
  const loading = ref<boolean>(false);
  // 部门树列表数据
  const treeData = ref<any[]>([]);
  // 当前选中的项
  const checkedKeys = ref<any[]>([]);
  // 当前展开的项
  const expandedKeys = ref<any[]>([]);
  // 当前选中的项
  const selectedKeys = ref<any[]>([]);
  // 树组件重新加载
  const treeReloading = ref<boolean>(false);
  // 树父子是否关联
  const checkStrictly = ref<boolean>(true);
  // 当前选中的部门
  const currentDepart = ref<any>(null);
  // 控制确认删除提示框是否显示
  const visibleTreeKey = ref<any>(null);

  // 注册 modal
  const [registerModal, { openModal }] = useModal();

  // 加载顶级部门信息
  async function loadRootTreeData() {
    try {
      loading.value = true;
      treeData.value = [];
      const result = await queryBeGoodAtTreeSync();
      if (Array.isArray(result)) {
        treeData.value = result;
      }
      if (expandedKeys.value.length === 0) {
        autoExpandParentNode();
      } else {
        if (selectedKeys.value.length === 0) {
          let item = treeData.value[0];
          if (item) {
            // 默认选中第一个
            setSelectedKey(item.id, item);
          }
        } else {
          emit('select', currentDepart.value);
        }
      }
      emit('rootTreeData', treeData.value);
    } finally {
      loading.value = false;
    }
  }

  loadRootTreeData();

  // 加载子级部门信息
  async function loadChildrenTreeData(treeNode) {
    try {
      const result = await queryBeGoodAtTreeSync({
        pid: treeNode.dataRef.id,
      });
      if (result.length == 0) {
        treeNode.dataRef.isLeaf = true;
      } else {
        treeNode.dataRef.children = result;
        if (expandedKeys.value.length > 0) {
          // 判断获取的子级是否有当前展开的项
          let subKeys: any[] = [];
          for (let key of expandedKeys.value) {
            if (result.findIndex((item) => item.id === key) !== -1) {
              subKeys.push(key);
            }
          }
          if (subKeys.length > 0) {
            expandedKeys.value = [...expandedKeys.value];
          }
        }
      }
      treeData.value = [...treeData.value];
      emit('rootTreeData', treeData.value);
    } catch (e) {
      console.error(e);
    }
    return Promise.resolve();
  }

  // 自动展开父节点，只展开一级
  function autoExpandParentNode() {
    let item = treeData.value[0];
    if (item) {
      if (!item.isLeaf) {
        expandedKeys.value = [item.key];
      }
      // 默认选中第一个
      setSelectedKey(item.id, item);
      reloadTree();
    } else {
      emit('select', null);
    }
  }

  // 重新加载树组件，防止无法默认展开数据
  async function reloadTree() {
    await nextTick();
    treeReloading.value = true;
    await nextTick();
    treeReloading.value = false;
  }

  /**
   * 设置当前选中的行
   */
  function setSelectedKey(key: string, data?: object) {
    selectedKeys.value = [key];
    if (data) {
      currentDepart.value = data;
      emit('select', data);
    }
  }

  // 添加一级部门
  function onAddDepart() {
    openModal(true, { isUpdate: false, isChild: false });
  }

  // 添加子级部门
  function onAddChildDepart(data = currentDepart.value) {
    if (data == null) {
      createMessage.warning('请先选择一个部门');
      return;
    }
    const record = { parentId: data.id };
    openModal(true, { isUpdate: false, isChild: true, record });
  }

  // 树复选框选择事件
  function onCheck(e) {
    if (Array.isArray(e)) {
      checkedKeys.value = e;
    } else {
      checkedKeys.value = e.checked;
    }
  }

  // 树选择事件
  function onSelect(selKeys, event) {
    console.log('select: ', selKeys, event);
    if (selKeys.length > 0 && selectedKeys.value[0] !== selKeys[0]) {
      setSelectedKey(selKeys[0], event.selectedNodes[0]);
    } else {
      // 这样可以防止用户取消选择
      setSelectedKey(selectedKeys.value[0]);
    }
  }

  /**
   * 根据 ids 删除部门
   * @param idListRef array
   * @param confirm 是否显示确认提示框
   */
  async function doDeleteDepart(idListRef, confirm = true) {
    const idList = unref(idListRef);
    if (idList.length > 0) {
      try {
        loading.value = true;
        await deleteBatchDepart({ ids: idList.join(',') }, confirm);
        await loadRootTreeData();
      } finally {
        loading.value = false;
      }
    }
  }

  // 删除单个部门
  async function onDelete(data) {
    if (data) {
      onVisibleChange(false);
      doDeleteDepart([data.id], false);
    }
  }

  // 批量删除部门
  async function onDeleteBatch() {
    try {
      await doDeleteDepart(checkedKeys);
      checkedKeys.value = [];
    } finally {
    }
  }

  function onVisibleChange(visible) {
    if (!visible) {
      visibleTreeKey.value = null;
    }
  }
  defineExpose({
    loadRootTreeData,
  });
</script>
