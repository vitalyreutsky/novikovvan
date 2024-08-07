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

      <div class="header__nav" data-menu>
        <nav class="nav" title="nav-menu">
          <ul class="list-reset nav__list">
            <li class="nav__item">
              <a href="#about" class="nav__link navigation__item" data-menu-item>
                <span>Обо мне</span>
              </a>
            </li>

            <li class="nav__item">
              <a href="#reviews" class="nav__link navigation__item" data-menu-item>
                <span>Отзывы</span>
              </a>
            </li>

            <li class="nav__item">
              <a href="#programs" class="nav__link navigation__item" data-menu-item>
                <span>Программы тренировок</span>
              </a>
            </li>

            <li class="nav__item">
              <a href="#faq" class="nav__link navigation__item" data-menu-item>
                <span>Вопросы</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div class="header__social" data-da=".header__nav,1024,last">
        <?php get_template_part('templates/components/social-media'); ?>
      </div>

      <button class="btn-reset burger" aria-label="Открыть меню" aria-expanded="false" data-burger>
        <span class="burger__line"></span>
      </button>
    </div>
  </div>
</header>