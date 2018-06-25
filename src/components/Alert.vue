<template>
  <div class="alert"
        :style="alertStyle">
    <div class="alert-message">{{getAlertMessage}}</div>
    <div>
      <button type="button"
        @click="setAlertIsShowing(false)">확인</button>
    </div>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex';
  import {mapGetters} from 'vuex';

  export default {
    name: 'Alert',
    data () {
      return {
        alertX: '',
        alertY: ''
      }
    },
    methods: {
      ...mapMutations([
        'setAlertIsShowing',
        'setAlert',
        'setAlertMessage'
      ]),
      positionAlertCenter () {
        this.alertX = window.innerWidth/2;
        this.alertY = window.innerHeight/2;
      }
    },
    computed: {
      ...mapGetters([
        'getAlertCount',
        'getAlertMessage',
        'getIsAlertShowing'
      ]),
      alertStyle () {
        return {
          left: (this.alertX - 250 /*div.alert.width*/)+'px',
          top: (this.alertY-100 /*div.alert.height/2*/)+'px'
        }
      }
    },
    created () {
      this.positionAlertCenter()
    }
  }
</script>

<style scoped>
div.alert {
  position: absolute;
  width: 500px;
  z-index: 999;
  background-color: white;
  border: 1px solid black;
}
</style>
