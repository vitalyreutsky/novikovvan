<?php
$title = get_field('title');
$desc = get_field('description');
$image = get_field('image');
$statistics = get_field('statistics');
?>

<div class="hero count-block bg-block" style="background-image: url('<?php echo wp_get_attachment_url($image); ?>');">
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

         <div class="hero__bottom">
            <div class="hero__statistics statistics__items">
               <?php foreach ($statistics as $key => $item) :  ?>
                  <div class="statistics__item">
                     <div class="statistics__item-inner">
                        <div class="statistics__item-count count" data-target="<?php echo $item['count']; ?>"><span>0</span>
                           <p>+</p>
                        </div>
                        <p class="statistics__item-text"><?php echo $item['text']; ?></p>
                     </div>
                  </div>
               <?php endforeach; ?>
            </div>

            <div class="hero__social">
               <?php get_template_part('templates/components/social-media'); ?>
            </div>
         </div>
      </div>
   </div>
</div>