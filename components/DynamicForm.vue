<template>
  <div
    v-for="{
      as,
      name,
      label,
      children,
      classes,
      value,
      hideErrors,
      labelClasses,
      ...attrs
    } in schema.fields"
    :key="name"
    class="relative"
  >
    <label
      :for="name"
      :class="labelClasses"
      class="block text-sm font-semibold text-gray-900 mt-4"
      >{{ label }}</label
    >
    <Field
      :id="name"
      :value="value"
      :as="as"
      :name="name"
      :class="classes"
      v-bind="attrs"
      validate-on-input
      @input="input"
    >
      <template v-if="children && children.length">
        <component
          :is="tag"
          v-for="({ tag, text, ...childAttrs }, idx) in children"
          :key="idx"
          v-bind="childAttrs"
        >
          {{ text }}
        </component>
      </template>
    </Field>
    <ErrorMessage v-if="!hideErrors" :name="name" class="text-red" />
  </div>
</template>

<script setup lang="ts">
defineProps({
  schema: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["input"]);
function input(event: Event) {
  emit("input", {
    name: (event.target as HTMLInputElement).name,
    value: (event.target as HTMLInputElement).value,
  });
}
</script>

<style scoped>
input:-webkit-autofill,
input:-webkit-autofill:focus {
  transition: background-color 600000s 0s, color 600000s 0s;
}
</style>
