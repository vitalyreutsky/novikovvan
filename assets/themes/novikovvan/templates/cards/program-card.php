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


$product = wc_get_product($program_id);
$variations = $product->get_available_variations();
$variations_id = wp_list_pluck($variations, 'variation_id');
?>

<div class="program-card program-list__tabs-panel-item main__tabs-panel-item tabs__panel-image swiper-slide">
  <div class="program-card__wrapper">
    <div class="program-card__image" style="background-image: url('<?php echo wp_get_attachment_url($program_id->image_id); ?>');"></div>

    <div class="program-card__info">
      <h4 class="program-card__title"><?php echo $program_id->name; ?></h4>
      <p class="program-card__desc"><?php echo $program_id->description; ?></p>

      <div class="program-card__prices">
        <?php foreach ($variations_id as $key => $value) :
          $variation = wc_get_product($value);
        ?>
          <div class="program-card__price">
            <h4><?php echo str_replace('Price: ', '', $variation->attribute_summary); ?> :</h4>
            <div class="program-card__price-sum">
              <span class="program-card__price-sum--regular"><?php echo $variation->regular_price . $currency_symbol; ?></span>
              /
              <span><?php echo $variation->sale_price . $currency_symbol; ?></span>
            </div>
          </div>
        <?php endforeach; ?>
      </div>

      <a href="<?php echo $link_telegram; ?>" class="program-card__btn btn">
        <span></span>
        Купить
      </a>
    </div>
  </div>
</div>