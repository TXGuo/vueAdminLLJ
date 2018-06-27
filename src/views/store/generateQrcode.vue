<template>
	<div id="qrCode">
	<div id='code'></div>
		<canvas id="canvas"></canvas>
	</div>
</template>

<script>
import Vue from 'vue'
// import QRCode from 'qrcode'

// Vue.use(QRCode)

export default{
  props: ['qrcodeId'],
  data () {
    return {
      codes: ''
    }
  },
  methods: {
    useqrcode () {
      // var canvas = document.getElementById('canvas')
      // QRCode.toCanvas(canvas, this.qrcodeId, function (error) {
      //   if (error) console.error(error)
      // })
    }
  },
  mounted () {
    // this.useqrcode()
  }
}
</script>

<style>
  #canvas{width:200px!important;height:200px!important;}
</style>
