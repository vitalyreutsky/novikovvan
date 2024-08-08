import { validateForms } from "../functions/validate-forms.js";

export async function post(data) {
  const _domain = window.location.origin;

  let response = await fetch(`${_domain}/wp-admin/admin-ajax.php`, {
    method: "post",
    headers: new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
    }),
    body: `action=send_feedback&data=${data}`,
  });
}

const rules = [
  {
    ruleSelector: ".input-name",
    rules: [
      {
        rule: "customRegexp",
        value: /^[A-zА-яЁё ]+$/,
        errorMessage: "Введите только буквы",
      },
      {
        rule: "minLength",
        value: 2,
        errorMessage: "Введите минимум 2 символа",
      },
      {
        rule: "required",
        value: true,
        errorMessage: "Введите ваше имя",
      },
    ],
  },
  {
    ruleSelector: ".input-mail",
    rules: [
      {
        rule: "email",
        errorMessage: "Введите корректный e-mail",
      },
      {
        rule: "required",
        value: true,
        errorMessage: "Введите ваш e-mail",
      },
    ],
  },
];

const afterForm = (values) => {
  console.log("success");

  post(JSON.stringify(values));
};

validateForms(".form", rules, afterForm);
