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
            <a href="#about" class="nav__link navigation__item">
              <span>Обо мне</span>
            </a>
          </li>

          <li class="nav__item">
            <a href="#reviews" class="nav__link navigation__item">
              <span>Отзывы</span>
            </a>
          </li>

          <li class="nav__item">
            <a href="#programs" class="nav__link navigation__item">
              <span>Программы тренировок</span>
            </a>
          </li>

          <li class="nav__item">
            <a href="#faq" class="nav__link navigation__item">
              <span>Вопросы</span>
            </a>
          </li>
        </ul>
      </nav>

      <div class="header__social">
        <?php get_template_part('templates/components/social-media'); ?>
      </div>
    </div>
  </div>
</header>