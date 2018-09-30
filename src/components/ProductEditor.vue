<template>
  <component-editor :componentToEdit="componentToEdit">
  </component-editor>
</template>

<script>
import ComponentEditor from './ComponentEditor';

export default {
  name: 'product-editor',
  components: { ComponentEditor },
  data() {
    return {
      componentToEdit: {
        name: 'product',
        content: {
          title: 'Ethereum sssssMug',
          author: 'julianmnst',
          permlink: 'eth-mug654682',
          pending_payout_value: '211.630 SBD',
          price: '10.000 SBD',
          image: 'https://rlv.zcache.com/ethereum_mug-r0703ea79845841799e1cbc587e18dd03_kz9an_540.jpg?rlvnet=1',
          type: 'direct-sell',
          marked: false,
          description: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed in erat non ante pellentesque faucibus. Curabitur velit eros, varius et placerat a, porta vitae tortor. Ut quis vehicula est, eu ultricies odio. Etiam non dolor sagittis, consequat ipsum sit amet, sollicitudin libero. Aliquam eu lectus id risus vulputate cursus sed vel quam. Vestibulum scelerisque, nunc blandit efficitur interdum, ipsum lacus semper purus, quis rhoncus dui leo pulvinar nulla. Proin tellus nunc, gravida sed tristique non, efficitur vitae leo. Quisque gravida sed purus sed lobortis. Ut mi elit, condimentum vitae dapibus eu, tristique et dui. Phasellus commodo orci at ornare consequat. Etiam ut diam ut ligula ullamcorper consectetur. Aenean hendrerit volutpat rutrum. Quisque et tempor turpis, eu ultricies lectus. ',
          pictures: [
            'https://rlv.zcache.com/ethereum_mug-r0703ea79845841799e1cbc587e18dd03_kz9an_540.jpg?rlvnet=1',
            'https://steemitimages.com/0x0/http://puu.sh/qj7LB/1bfd81aa0c.jpg',
            'https://hoodl.me/wp-content/uploads/2017/12/bitcoin-logo-mug.jpg',
            'https://hodlmonkey.com/wp-content/uploads/2017/11/mockup-f11bb83c.jpg'
          ],
          available: 1
        }
      }
    }
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:100:300,400,500,700,900|Material+Icons');
</style>