import { validateForms } from "../functions/validate-forms.js";

const form = document.querySelector(".form");

async function post(data) {
  const _domain = window.location.origin;

  const response = await fetch(`${_domain}/wp-admin/admin-ajax.php`, {
    method: "post",
    headers: new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
    }),
    body: `action=send_feedback&data1=${data}`,
  });

  const result = await response.json();

  if (result) {
    const resultText = result.message;
    const formResultText = form.querySelector(".form__result-text");

    hideLoading(form);

    if (result.result == true) {
      formResultText.classList.add("success");
    } else {
      formResultText.classList.add("error");
    }

    form.classList.add("result");
    formResultText.textContent = resultText;

    setTimeout(() => {
      form.classList.remove("result");

      if (
        formResultText.classList.contains("success") ||
        formResultText.classList.contains("error")
      ) {
        formResultText.classList.remove("success", "error");
      }
    }, 3000);
  }
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

function afterForm(values) {
  addLoading(form);

  post(JSON.stringify(values));
}

validateForms(".form", rules, afterForm);

function addLoading(form) {
  form.classList.add("loading");
}

function hideLoading(form) {
  form.classList.remove("loading");
}
