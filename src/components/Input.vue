<template>
    <div class="form_group d-flex align-items-center">
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
        <button v-show="value" @click="handleClear">clear</button>
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
        this.$emit('input', event.target.value);
        this.$nextTick(this.setNativeInputValue);
      },
      handleChange(event) {
        this.$emit('change', event.target.value);
      },
      handleClear(event) {
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
