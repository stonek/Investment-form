<script setup lang="ts">
import { object, number, string, boolean } from "yup";
import { Investment, Step, Input } from "@/types/Investment";
import { useInvestmentStore } from "@/store/investment";

const store = useInvestmentStore();
const { fetchInvestment, createInvestment } = store;
const investment: Investment = reactive(store.investment);

const MAX_AMOUNT = 100000;
const MIN_AMOUNT = 1000;

const done = ref<boolean>(false);
const showButtons = ref<boolean>(true);

const submitForm = async (values: Investment) => {
  await createInvestment(values);
  await fetchInvestment(1);
  investment.bankAccountNumber = values.bankAccountNumber;
  done.value = true;
  showButtons.value = false;
};

const inputChanged = (values: Input) => {
  if (values.name === "amount") {
    const value = Number(values.value);
    if (Number.isInteger(value)) {
      Object.assign(investment, { amount: values.value });
    }
  }
};

const schema = object({
  amount: number()
    .typeError("Zadejte prosím pouze čísla")
    .moreThan(MIN_AMOUNT - 1, `Musí být číslo vetší jak ${MIN_AMOUNT - 1}`)
    .lessThan(MAX_AMOUNT, `Musí být číslo menší jak ${MAX_AMOUNT}`)
    .integer()
    .required("Pole je povinné."),
});

const schemaSecondStep = object({
  firstName: string().required("Pole je povinné."),
  lastName: string().required("Pole je povinné."),
  phoneNumber: string()
    .matches(
      /^(\+420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
      "Číslo musí být ve spravném tavru."
    )
    .typeError("Zadejte prosím pouze čísla")
    .required("Pole je povinné."),
  email: string().email().required("Pole je povinné."),
});

const schemaThirdStep = object({
  nationalIdNumber: string()
    .matches(
      /^[0-9]{2,6}-?[0-9]{2,10}\/[0-9]{4}$/,
      "Číslo musí být ve spravném tavru: (123456/1234)"
    )
    .required("Pole je povinné."),
  idNumber: number()
    .typeError("Zadejte prosím pouze čísla")
    .required("Pole je povinné."),
  bankAccountNumber: string()
    .matches(
      /^(0*([1-9]\d{0,5})-)?0*([1-9]\d{0,9})$/,
      "Číslo účtu není validní"
    )
    .required("Pole je povinné."),
  policies: boolean().required(),
});

const steps: Array<Step> = [
  { validationSchema: schema },
  { validationSchema: schemaSecondStep },
  { validationSchema: schemaThirdStep },
];

const firstFormSchema = {
  fields: [
    {
      label: "Pravidelná výše investice (Kč)",
      value: investment?.amount,
      name: "amount",
      as: "input",
      type: "range",
      id: "amount-range",
      min: "1000",
      max: "100000",
      step: "1000",
      hideErrors: true,
      classes:
        "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700",
    },
    {
      value: investment?.amount,
      name: "amount",
      as: "input",
      classes:
        "block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
    },
  ],
};

const secondFormSchema = {
  fields: [
    {
      label: "Jméno",
      as: "input",
      id: "firstName",
      value: investment?.firstName,
      type: "text",
      name: "firstName",
      autocomplete: "given-name",
      class:
        "block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
    },
    {
      label: "Přijmení",
      as: "input",
      id: "lastName",
      value: investment?.lastName,
      type: "text",
      name: "lastName",
      autocomplete: "family-name",
      class:
        "block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
    },
    {
      label: "Telefonní číslo",
      id: "phoneNumber",
      as: "input",
      value: investment?.phoneNumber,
      type: "tel",
      name: "phoneNumber",
      autocomplete: "tel",
      class:
        "block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
    },
    {
      label: "Email",
      id: "email",
      as: "input",
      value: investment?.email,
      type: "text",
      name: "email",
      autocomplete: "email",
      class:
        "block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
    },
  ],
};

const thirdFormSchema = {
  fields: [
    {
      label: "Rodné číslo",
      as: "input",
      id: "nationalIdNumber",
      value: investment?.nationalIdNumber,
      type: "text",
      name: "nationalIdNumber",
      class:
        "block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
    },
    {
      label: "Číslo OP",
      as: "input",
      id: "idNumber",
      value: investment?.idNumber,
      type: "text",
      name: "idNumber",
      class:
        "block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
    },
    {
      label: "Bankovní účet",
      as: "input",
      id: "bankAccountNumber",
      value: investment?.bankAccountNumber,
      type: "text",
      name: "bankAccountNumber",
      autocomplete: "cc-number",
      class:
        "block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
    },
    {
      as: "input",
      type: "checkbox",
      id: "policies",
      name: "policies",
      value: investment?.policies ? investment?.policies : true,
      label: "Dávám souhlas ke zpracování mých osobních údajů.",
      labelClasses: "ml-5",
      class:
        "absolute top-0.5 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600",
    },
  ],
};
</script>

<template>
  <div class="m-4">
    <TheMultiStepForm
      class="bg-white px-6 py-10 lg:px-8 rounded mx-auto max-w-2xl"
      :steps="steps"
      :show-buttons="showButtons"
      @submit-form.once="submitForm"
    >
      <template #header>
        <div class="mx-auto max-w-2xl text-center">
          <h2
            class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4"
          >
            Pravidelné investování
          </h2>
          <h3
            class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4"
          >
            {{ investment.amount }} Kč
          </h3>
        </div>
      </template>
      <template #step0>
        <div class="sm:col-span-2">
          <DynamicForm :schema="firstFormSchema" @input="inputChanged" />
        </div>
      </template>
      <template #step1>
        <div class="sm:col-span-2">
          <DynamicForm :schema="secondFormSchema" />
        </div>
      </template>
      <template #step2>
        <div v-if="done" class="text-gray-900">
          Děkujeme. Pravidelná investice {{ investment.amount }} Kč bude
          prováděna z účtu: {{ investment.bankAccountNumber }}
          <div class="mt-4">
            test API s postem cislo 1:
            {{ investment }}
          </div>
        </div>
        <div v-else class="sm:col-span-2">
          <DynamicForm :schema="thirdFormSchema" />
        </div>
      </template>
    </TheMultiStepForm>
  </div>
</template>
