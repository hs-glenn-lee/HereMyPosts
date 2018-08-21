<template>
  <div @click="isolate" v-if="getIsAlertShowing" class="alert">
    <div class="alert-cont flex-con">
      <div class="alert-frame flex-item flex-con">
        <div class="alert-message flex-item" :style="alertMessageStyle">
          <img class="excl-icon" src="@/assets/images/exclamation-24w24h.png"><span>{{getAlertMessage}}</span>
        </div>
        <div class="flex-item">
          <button class="alert-confirm-button" type="button"
                  @click="hideAlert">확인</button>
        </div>
      </div>
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
      alertMessageStyle () {
        if(this.setAlertIsShowing) {
          return {
            'top': this.alertY +'px',
            'left': this.alertX +'px',
          }
        }else {

        }
      },
      positionAlertCenter () {
        this.alertX = window.innerWidth/2;
        this.alertY = window.innerHeight/2;
      },
      hideAlert (evt) {
        evt.stopPropagation()
        this.setAlertIsShowing(false);
      },
      isolate (evt) {
        evt.stopPropagation()
      }
    },
    computed: {
      ...mapGetters([
        'getAlertCount',
        'getAlertMessage',
        'getIsAlertShowing'
      ])
    },
    created () {
      this.positionAlertCenter()
    }
  }
</script>

<style scoped>
  div.alert {
    top: 0px;
    left: 0px;

    height: 100%;
    width: 100%;

    position: absolute;

    z-index: 999;
    background-color: rgba(236, 236, 236, 0.7);

  }

  div.alert-cont {
    width: 100%;
    height: 100%;
    opacity: 1;
  }

  div.alert-frame {
    width: auto;
    height: auto;

    padding: 16px;
    background-color: #fff;
    border: 1px solid #8a8a8a;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  }


  div.alert-message {
    background-color: #fff;
    position: relative;
    text-align: center;
    margin-bottom: 16px;
  }

  div.alert-message span {
    font-size: 1.2em;
  }

  img.excl-icon {
    height: 1.0em;
    width: 1.0em;
    margin-right: 16px;
  }

  .flex-con {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .flex-item {
    display: flex;
  }


  button.alert-confirm-button {
    font-size: 1em;
    background-color: #8a8a8a;
    border: 1px solid #9a9a9a;
  }
</style>
