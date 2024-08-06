<?php
$title = get_field('title');

$product_categories = get_terms('product_cat');
$count = count($product_categories);
?>

<section class="program-list bg-block" id="programs">
   <div class="container">
      <div class="program-list__wrapper">
         <?php if ($title) : ?>
            <h2 class="program-list__title main-title" data-aos="zoom-in-up"><?php echo $title; ?></h2>
         <?php endif; ?>

         <?php if ($count > 0) : ?>
            <div class="programs-list__tabs main__tabs tabs" data-tabs="programs" data-aos="zoom-in-up">
               <ul class="programs-list__tabs-nav main__tabs-nav list-reset tabs__nav border-anim">
                  <?php foreach ($product_categories as $product_category) :
                     if ($product_category->count > 0) {
                  ?>
                        <li class="programs-list__tabs-nav-item main__tabs-nav-item tabs__nav-item">
                           <button class="btn-reset programs-list__tabs-nav-btn main__tabs-nav-btn tabs__nav-btn" type="button">
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                              <?php echo $product_category->name; ?>
                           </button>
                        </li>
                  <?php
                     }
                  endforeach; ?>
               </ul>

               <div class="program-list__tabs main__tabs tabs__content main-slider">
                  <?php foreach ($product_categories as $product_category) :
                     $args = array(
                        'posts_per_page' => -1,
                        'tax_query' => array(
                           'relation' => 'AND',
                           array(
                              'taxonomy' => 'product_cat',
                              'field' => 'slug',
                              'terms' => $product_category->slug
                           )
                        ),
                        'post_type' => 'product',
                        'orderby' => 'title,'
                     );

                     $products = get_posts($args);
                     if ($product_category->count > 0) {
                  ?>
                        <div class="program-list__tabs-panel main__tabs-panel tabs__panel program-list__cards swiper">
                           <div class="program-list__tabs-panel-wrapper main__tabs-panel-wrapper tabs__panel-wrapper swiper-wrapper">
                              <?php foreach ($products as $product) : ?>
                                 <?php get_template_part('templates/cards/program-card', null, array('program_id' => $product)); ?>
                              <?php endforeach; ?>
                           </div>

                           <div class="program-list__cards-btns main__tabs-btns"></div>
                        </div>
                  <?php
                     }
                  endforeach; ?>
               </div>
            </div>
         <?php endif; ?>
      </div>
   </div>
</section>