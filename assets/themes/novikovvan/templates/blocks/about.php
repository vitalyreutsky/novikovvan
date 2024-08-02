<?php
$title = get_field('title');
$desc = get_field('description');
$about_achievements = get_field('about_achievements');
$desc = get_field('description');
?>

<section class="about bg-block">
   <div class="container about__container">
      <div class="about__inner">
         <?php if ($title) : ?>
            <h1 class="about__title main-title" data-aos="fade-right"><?php echo $title; ?></h1>
         <?php endif; ?>


         <div class="achievements__slider" data-aos="fade-left" data-sliders-count="<?php echo count($about_achievements); ?>">
            <div class="achievements__items">
               <?php foreach ($about_achievements as $item) :
               ?>
                  <div class="achievements__item">
                     <?php echo wp_get_attachment_image($item['image'], 'full') ?>

                     <p class="sliders__item-text">
                        <?php echo $item['text']; ?>
                     </p>
                  </div>
               <?php endforeach; ?>
            </div>

            <ul class="achievements__pagination list-reset">
               <?php foreach ($about_achievements as $item) : ?>
                  <li class="achievements__pagination-item">
                     <div class="pagination__button"></div>
                  </li>
               <?php endforeach; ?>
            </ul>
         </div>
      </div>

      <?php if ($desc) : ?>
         <div class="about__description" data-aos="fade-up">
            <?php echo $desc; ?>
         </div>
      <?php endif; ?>
   </div>
</section>