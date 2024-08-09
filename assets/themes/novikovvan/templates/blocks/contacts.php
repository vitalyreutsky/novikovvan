<?php
$title = get_field('title');
?>

<section class="contacts bg-block">
  <div class="container">
    <div class="contacts__wrapper">
      <?php if ($title) : ?>
        <h2 class="contacts__title main-title"><?php echo $title; ?></h2>
      <?php endif; ?>

      <form class="form">
        <div class="form__fields">
          <div class="form__field form__field--name">
            <input type="text" name="name" id="name" placeholder="Ваше имя" class="form__field-input input-name input-reset">
          </div>

          <div class="form__field form__field--mail">
            <input class="form__field-input input-mail input-reset" type="email" name="email" placeholder="E-mail" id="email" />
          </div>

          <div class="form__field form__field--message">
            <textarea id="message" name="message" placeholder="Ваше сообщение" class="form__field-input input-reset"></textarea>
          </div>

          <button class="btn btn-reset">
            <span>Отправить</span>
          </button>
        </div>

        <div class="form__result">
          <p class="form__result-text"></p>
        </div>
      </form>
    </div>
  </div>
</section>