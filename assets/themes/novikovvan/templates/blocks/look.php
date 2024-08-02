<?php
$title  = get_field('title');
$phone_image = get_field('phone_image');
$figure_image = get_field('figure_image');
$bg_image = get_field('bg_image');
$types = get_field('types');
?>

<section class="look" style="background-image: url('<?php echo wp_get_attachment_url($bg_image); ?>');">
   <div class="container">
      <div class="look__wrapper">
         <?php if ($title) : ?>
            <h2 class="look__title main-title"><?php echo $title; ?></h2>
         <?php endif; ?>

         <div class="look__inner">
            <div class="look__program" style="background-image: url('<?php echo wp_get_attachment_url($phone_image); ?>');">
               <div class="look__program-inner">
                  <div class="swiper look__program-slider">
                     <div class="swiper-wrapper look__program-slider-wrapper">
                        <?php foreach ($types as $type) :
                        ?>
                           <div class="swiper-slide look__program-slider-slide">
                              <?php echo $type['type']; ?>
                           </div>
                        <?php endforeach; ?>
                     </div>
                  </div>

                  <div class="look__program-btns">
                  </div>
               </div>
            </div>

            <?php if ($figure_image) : ?>
               <div class="look__image">
                  <?php echo wp_get_attachment_image($figure_image, 'full'); ?>
               </div>
            <?php endif; ?>
         </div>
      </div>
   </div>
</section>