<script setup lang="ts">
import { Step } from "@/types/Investment";
const props = defineProps<{
  steps: Array<Step>;
  showButtons: boolean;
}>();

const activeStepIndex = ref<number>(0);
const emit = defineEmits(["submitForm"]);

const submitNextText = "Next";
const submitSaveText = "Save";
const buttonBackValue = "Back";

const currentSchema = computed(() => {
  return props.steps[activeStepIndex.value].validationSchema;
});

const nextStep = (values: object) => {
  if (activeStepIndex.value === props.steps.length - 1) {
    emit("submitForm", values);
    return;
  }
  activeStepIndex.value++;
};

function prevStep() {
  if (activeStepIndex.value <= 0) {
    return;
  }
  activeStepIndex.value--;
}
</script>
<template>
  <Form :validation-schema="currentSchema" keep-values @submit="nextStep">
    <slot name="header" />
    <div v-for="(step, index) in steps" :id="'step' + index" :key="index">
      <div v-if="activeStepIndex === index">
        <slot :name="'step' + index" />
      </div>
    </div>
    <slot name="footer">
      <div v-if="showButtons" class="mt-10 w-full flex row-auto">
        <button
          v-if="activeStepIndex > 0"
          type="button"
          class="flex rounded-md bg-gray-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
          @click="prevStep"
        >
          {{ buttonBackValue }}
        </button>
        <button
          v-if="activeStepIndex < props.steps.length - 1"
          type="submit"
          class="flex ml-auto rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {{ submitNextText }}
        </button>
        <button
          v-if="activeStepIndex === props.steps.length - 1"
          type="submit"
          class="flex ml-auto rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {{ submitSaveText }}
        </button>
      </div>
    </slot>
  </Form>
</template>
