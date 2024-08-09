<?php
$site_logo = get_field('site_logo', 'options');

// menu
$locations = get_nav_menu_locations();
$nav_items = wp_get_nav_menu_items($locations['footer-menu']);

// contacts
$copyright = get_field('copyright', 'options');
$mail = get_field('mail', 'options');
?>


<footer class="footer">
  <div class="container">
    <div class="footer__wrapper">
      <div class="footer__copyright">
        <?php if ($site_logo) : ?>
          <a href="/" class="footer__logo">
            <?php echo App\Base\SvgSupport::get_inline_svg_by_id($site_logo); ?>
          </a>
        <?php endif; ?>

        <?php if ($copyright) : ?>
          <p class="footer__copyright" data-da=".footer__wrapper,768,last"><?php echo $copyright; ?></p>
        <?php endif; ?>
      </div>

      <div class="footer__menu">
        <nav class="footer__nav nav" title="nav-menu">
          <ul class="nav__list list-reset">
            <?php
            foreach ($nav_items as $ind => $nav_item) :
              $page_id = $nav_item->object_id;
            ?>
              <li class="nav__item">
                <a href="<?php echo $nav_item->url; ?>" class="nav__link<?php echo $page_id == get_the_id() ? ' active' : null; ?>">
                  <span><?php echo $nav_item->title; ?></span>
                </a>
              </li>
            <?php endforeach; ?>
          </ul>
        </nav>
      </div>

      <div class="footer__support">
        <?php if ($mail) : ?>
          <a href="mailto:<?php echo $mail; ?>" class="footer__support-mail nav__link">
            <span><?php echo $mail; ?></span>
          </a>
        <?php endif; ?>
      </div>
    </div>
  </div>
</footer>