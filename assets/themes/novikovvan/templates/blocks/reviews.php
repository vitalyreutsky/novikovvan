<?php
$title = get_field('title');
$bg_image = get_field('bg_image');
$reviews = get_field('reviews');
?>

<section class="reviews bg-block" id="reviews" style="background-image: url('<?php echo wp_get_attachment_url($bg_image); ?>');">
   <div class="container">
      <div class="reviews__wrapper">
         <?php if ($title) : ?>
            <h2 class="reviews__title main-title" data-aos="fade-up"><?php echo $title; ?></h2>
         <?php endif; ?>

         <div class="reviews__tabs tabs" data-tabs="reviews" data-aos="zoom-in-up">
            <ul class="reviews__tabs-nav list-reset tabs__nav">
               <?php foreach ($reviews as $review_btn) : ?>
                  <li class="reviews__tabs-nav-item tabs__nav-item">
                     <button class="btn-reset reviews__tabs-nav-btn tabs__nav-btn" type="button">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <?php echo $review_btn['title']; ?>
                     </button>
                  </li>
               <?php endforeach; ?>
            </ul>
            <div class="reviews__tabs tabs__content main-slider">
               <?php foreach ($reviews as $review) : ?>
                  <div class="reviews__tabs-panel tabs__panel main-slider__items swiper">
                     <div class="reviews__tabs-panel-wrapper tabs__panel-wrapper swiper-wrapper">
                        <?php foreach ($review['photo'] as $photo) : ?>
                           <div class="reviews__tabs-panel-item tabs__panel-image swiper-slide">
                              <?php echo wp_get_attachment_image($photo['image']['ID'], 'full'); ?>
                           </div>
                        <?php endforeach; ?>
                     </div>

                     <div class="reviews__tabs-btns"></div>
                  </div>
               <?php endforeach; ?>
            </div>
         </div>
      </div>
   </div>
</section>