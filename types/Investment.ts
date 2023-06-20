interface Investment {
  firstName?: String;
  lastName?: String;
  phoneNumber?: String;
  email?: String;
  bankAccountNumber?: String;
  nationalIdNumber?: String;
  idNumber?: String;
  policies?: Boolean;
  amount?: Number;
}

interface Step {
  validationSchema?: any;
}

interface Input {
  name?: string;
  value?: string;
}

export { Investment, Step, Input };
