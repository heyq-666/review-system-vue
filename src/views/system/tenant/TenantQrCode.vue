<template>
  <div>
    <BasicModal v-bind="$attrs" title="二维码预览" @register="tenantCodeModal" :width="500" :height="900">
      <Card hoverable :style="{ marginLeft: '80px', width: '300px', height: '400', background: '#fff' }">
        <template #cover>
          <img alt="example" :src="qrcodeLink" />
        </template>
      </Card>
      <a-button :style="{ marginLeft: '180px', marginTop: '15px' }" type="primary" @click="refreshQrCode">更新二维码</a-button>
    </BasicModal>
  </div>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Card } from 'ant-design-vue';
  import { ref } from 'vue';
  import { aliyahLink } from '/@/utils/common/mytags';
  import { generateAppletsQrCode } from './tenant.api.ts';

  const emit = defineEmits(['success', 'register']);
  const qrcodeLink = ref();
  const tenantId = ref();
  const [tenantCodeModal, { setModalProps }] = useModalInner(async (data) => {
    setModalProps({ confirmLoading: false, showCancelBtn: true, showOkBtn: false });
    qrcodeLink.value = aliyahLink + data.record.appletsQrCodePath;
    tenantId.value = data.record.id;
  });
  async function refreshQrCode() {
    let result = await generateAppletsQrCode({ id: tenantId.value });
    qrcodeLink.value = aliyahLink + result;
    //刷新列表
    emit('success');
  }
</script>
