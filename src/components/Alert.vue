<template>
  <div class="alert"
        :style="alertStyle"
        v-if="getIsAlertShowing">

    <div class="alert-message">{{getAlertMessage}}</div>

    <div>
      <button type="button"
              class="whattheheck"
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
        this.alertX = window.pageXOffset;
        this.alertY = window.pageYOffset;
      }
    },
    computed: {
      ...mapGetters([
        'getAlertMessage',
        'getIsAlertShowing',
        'getAlert'
      ]),
      alertStyle () {
        return {
          left: this.alertX,
          top: this.alertY
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
