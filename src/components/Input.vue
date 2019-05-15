<template>
    <div class="form_group d-flex align-items-center" :class="{focusin}">
        <input
                type="text"
                class="form_control"
                v-bind="$attrs"
                :autocomplete="autocomplete"
                ref="input"
                @input="handleInput"
                @focus="handleFocus"
                @blur="handleBlur"
                @change="handleChange">
        <button v-show="value" @click="handleClear">
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                 width="357px" height="357px" viewBox="0 0 357 357" style="enable-background:new 0 0 357 357;" xml:space="preserve">
	<g id="clear">
		<polygon points="357,35.7 321.3,0 178.5,142.8 35.7,0 0,35.7 142.8,178.5 0,321.3 35.7,357 178.5,214.2 321.3,357 357,321.3
			214.2,178.5 		"/>
	</g>
</svg></button>
    </div>
</template>

<script>
  export default {
    name: "Input",
    props:{
      value: [String, Number],
      autocomplete: {
        type: String,
        default: 'off'
      },
    },
    data(){
      return {
        focusin: false
      }
    },
    watch:{
      nativeInputValue() {
        this.setNativeInputValue();
      },
    },
    computed:{
      nativeInputValue() {
        return this.value === null || this.value === undefined ? '' : String(this.value);
      },
    },
    methods:{
      focus() {
        this.getInput().focus();
      },
      blur() {
        this.getInput().blur();
      },
      handleBlur(event) {
        if(!event.target.value.length > 0){
          this.focusin = false
        }
        this.$emit('blur', event);
      },
      setNativeInputValue() {
        const input = this.getInput();
        input.value = this.nativeInputValue;
      },
      handleFocus(event) {
        this.$emit('focus', event);
      },
      handleInput(event) {

        if(event.target.value.length){
          this.focusin = true
        }else {
          this.focusin = false
        }
        this.$emit('input', event.target.value);
        this.$nextTick(this.setNativeInputValue);
      },
      handleChange(event) {
        this.$emit('change', event.target.value);
      },
      handleClear() {
        this.focusin = false
        this.$emit('input', '');
        this.$emit('change', '');
        this.$emit('clear');
      },
      getInput() {
        return this.$refs.input;
      },
    },
    mounted() {
      this.setNativeInputValue();
    },
  }
</script>

<style scoped>

</style>
