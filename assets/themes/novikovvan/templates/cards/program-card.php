<?php
$social = get_field('social', 'options');
$link_telegram = '';
$program_id = wc_get_product($args['program_id']);
$currency_symbol = html_entity_decode(get_woocommerce_currency_symbol());

foreach ($social as $social_item) {
  if ($social_item && strpos($social_item['link'], 't.me')) {
    $link_telegram = $social_item['link'];
  }
}
?>

<div class="program-card swiper-slide">
  <div class="program-card__wrapper">
    <div class="program-card__image" style="background-image: url('<?php echo wp_get_attachment_url($program_id->image_id); ?>');"></div>

    <div class="program-card__info">
      <h4 class="program-card__title"><?php echo $program_id->name; ?></h4>
      <p class="program-card__desc"><?php echo $program_id->description; ?></p>

      <div class="program-card__price">
        <span class="program-card__price--regular"><?php echo $program_id->regular_price; ?> <?php echo $currency_symbol; ?></span>
        <span class="program-card__price--sale"><?php echo $program_id->sale_price; ?> <?php echo $currency_symbol; ?></span>
      </div>

      <a href="<?php echo $link_telegram; ?>" class="program-card__btn btn">
        <span></span>
        Купить
      </a>
    </div>
  </div>
</div>