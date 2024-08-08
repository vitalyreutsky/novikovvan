import JustValidate from "just-validate";

export const validateForms = (selector, rules, afterSend) => {
  const form = document?.querySelector(selector);

  if (!form) {
    return false;
  }

  if (!rules) {
    return false;
  }

  const validation = new JustValidate(selector, {
    validateBeforeSubmitting: true,
  });

  for (let item of rules) {
    validation.addField(item.ruleSelector, item.rules);
  }

  validation.onSuccess((ev) => {
    const formData = new FormData(ev.target);

    afterSend(Object.fromEntries(formData));

    ev.target.reset();
  });
};
