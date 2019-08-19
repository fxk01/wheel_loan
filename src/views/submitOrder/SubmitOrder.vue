<template>
  <div class="submit-order">
    <EnquiryMsg />
  </div>
</template>

<script>
  import EnquiryMsg from '@/components/enquiryMsg/EnquiryMsg.vue';

  export default {
    name: 'enquiry',
    components: {
      [EnquiryMsg.name]: EnquiryMsg,
    },
    data() {
      return {

      }
    }
  }
</script>