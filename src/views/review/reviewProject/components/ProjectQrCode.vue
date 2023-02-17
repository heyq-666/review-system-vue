<template>
  <div>
    <BasicModal v-bind="$attrs" title="二维码预览">
      <template>
        <!--        <ImagePreview src="https://review-img.oss-cn-beijing.aliyuncs.com/qrcode/2021-11-25/12_1637822484171.jpg" />-->
        <van-image-preview />
        <VanImagePreview />
      </template>
      <button>更新二维码</button>
    </BasicModal>
  </div>
</template>
<script lang="ts" setup>
  import { BasicModal } from '/@/components/Modal';
  import { ImagePreview } from '/@/components/Preview';

  const VanImagePreview = ImagePreview.Component;
</script>
