<template>
  <div class="loading"
        :class="{'showing':isLoading}">

    <div class="loading-img-wrapper"
          :style="wrapperDivStyle">
      <img class="loading-img" src="@/assets/images/loading.gif">
    </div>

  </div>
</template>

<script>
  import {mapMutations} from 'vuex';
  import {mapGetters} from 'vuex';

  export default {
    name: 'Alert',
    props: {
      isLoading: Boolean
    },
    data () {
      return {
        imgWrapperPaddingTop: ''
      }
    },
    methods: {
      ...mapMutations([

      ]),
      calcWrapperPaddingTop () {
        this.imgWrapperPaddingTop = window.innerHeight/2;
      }
    },
    computed: {
      ...mapGetters([
        'isManagerLoading'
      ]),
      wrapperDivStyle () {
        return {
          'padding-top': (this.imgWrapperPaddingTop - 120 /*half of loading img height*/)+'px'
        }
      }
    },
    created () {
      this.calcWrapperPaddingTop()
    },
    watch : {
      isLoading (to,from) {
        console.log(to);
        console.log(from);
      }
    }
  }
</script>

<style scoped>
div.loading {
  position: absolute;

  z-index: 998;
  background-color: #ececec;

  width: 100%;
  height: 100%;

  left: 0px;
  top: 0px;

  opacity: 0;
  visibility: hidden;

}
  div.loading.showing {
    visibility: visible;
    opacity: 0.7;
    transition: visibility 0s, opacity 0.5s linear;
  }
  img.loading-img {
    display: block;
    margin: auto;
  }
</style>
