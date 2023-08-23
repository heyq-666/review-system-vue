<!--量表选择框-->
<template>
  <div>
    <BasicModal v-bind="$attrs" @register="register" :title="modalTitle" width="800px" @ok="handleOk" destroyOnClose @visible-change="visibleChange">
      <BasicTable
        :columns="columns"
        v-bind="config"
        :useSearchForm="true"
        :formConfig="formConfig"
        :api="getReviewUserGroup"
        :searchInfo="searchInfo"
        :rowSelection="rowSelection"
        :indexColumnProps="indexColumnProps"
      />
    </BasicModal>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent';
  import { useSelectBiz } from '/@/components/Form/src/jeecg/hooks/useSelectBiz';
  import { selectProps } from '/@/components/Form/src/jeecg/props/props';
  import { useAttrs } from '/@/hooks/core/useAttrs';
  import { getReviewUserGroup } from '/@/api/common/api';

  export default defineComponent({
    name: 'ReviewClassSelectModal',
    components: {
      //此处需要异步加载BasicTable
      BasicModal,
      BasicTable: createAsyncComponent(() => import('/@/components/Table/src/BasicTable.vue'), {
        loading: true,
      }),
    },
    props: {
      ...selectProps,
      //选择框标题
      modalTitle: {
        type: String,
        default: '用户组选择',
      },
    },
    emits: ['register', 'getSelectResult'],
    setup(props, { emit }) {
      //注册弹框
      const [register, { closeModal }] = useModalInner();
      const attrs = useAttrs();
      //表格配置
      const config = {
        canResize: false,
        bordered: true,
        size: 'small',
        rowKey: unref(props).rowKey,
      };
      const getBindValue = Object.assign({}, unref(props), unref(attrs), config);
      const [{ rowSelection, indexColumnProps, visibleChange, getSelectResult }] = useSelectBiz(getReviewUserGroup, getBindValue);
      const searchInfo = ref(props.params);
      //查询form
      const formConfig = {
        //labelWidth: 220,
        baseColProps: {
          xs: 24,
          sm: 24,
          md: 24,
          lg: 14,
          xl: 14,
          xxl: 14,
        },
        schemas: [
          {
            label: '用户组',
            field: 'title',
            component: 'JInput',
          },
        ],
      };
      //定义表格列
      const columns = [
        {
          title: '用户组',
          dataIndex: 'title',
          width: 40,
          align: 'left',
        },
      ];

      /**
       * 确定选择
       */
      function handleOk() {
        getSelectResult((options, values) => {
          //回传选项和已选择的值
          emit('getSelectResult', options, values);
          //关闭弹窗
          closeModal();
        });
      }

      return {
        config,
        handleOk,
        searchInfo,
        register,
        indexColumnProps,
        visibleChange,
        getReviewUserGroup,
        formConfig,
        getBindValue,
        columns,
        rowSelection,
      };
    },
  });
</script>
