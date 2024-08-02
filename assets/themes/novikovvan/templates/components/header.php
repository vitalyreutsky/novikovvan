<?php
$site_logo = get_field('site_logo', 'options');
?>

<header class="header">
  <div class="container">
    <div class="header__wrapper" data-aos="fade-down">
      <?php if ($site_logo) : ?>
        <a href="/" class="header__logo">
          <?php echo App\Base\SvgSupport::get_inline_svg_by_id($site_logo); ?>
        </a>
      <?php endif; ?>

      <nav class="header__nav nav" title="nav-menu">
        <ul class="list-reset nav__list">
          <li class="nav__item">
            <a href="#" class="nav__link">
              <span>Обо мне</span>
            </a>
          </li>

          <li class="nav__item">
            <a href="#" class="nav__link">
              <span>Отзывы</span>
            </a>
          </li>

          <li class="nav__item">
            <a href="#" class="nav__link">
              <span>Программы тренировок</span>
            </a>
          </li>

          <li class="nav__item">
            <a href="#" class="nav__link">
              <span>Контакты</span>
            </a>
          </li>

          <li class="nav__item">
            <a href="#" class="nav__link">
              <span>Вопросы</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</header>