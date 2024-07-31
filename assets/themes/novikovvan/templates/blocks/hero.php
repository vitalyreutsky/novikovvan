<?php
$title = get_field('title');
$desc = get_field('description');
$image = get_field('image');
?>

<div class="hero" style="background-image: url('<?php echo wp_get_attachment_url($image); ?>');">
   <div class="container hero__container">
      <div class="hero__wrapper">
         <div class="hero__info">
            <?php if ($title) : ?>
               <h1 class="hero__title main-title"><?php echo $title; ?></h1>
            <?php endif; ?>

            <?php if ($desc) : ?>
               <p class="hero__desc"><?php echo $desc; ?></p>
            <?php endif; ?>

            <a href="#" class="hero__btn btn">
               <span></span>
               Подробнее
            </a>
         </div>
      </div>

      <div class="hero__social">
         <?php get_template_part('templates/components/social-media'); ?>
      </div>
   </div>
</div>