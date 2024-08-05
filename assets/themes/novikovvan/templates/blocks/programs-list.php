<?php
$title = get_field('title');
$programs_list = get_field('programs_list');
?>
<section class="program-list bg-block" id="programs">
   <div class="container">
      <div class="program-list__wrapper">
         <?php if ($title) : ?>
            <h2 class="program-list__title main-title" data-aos="zoom-in-up"><?php echo $title; ?></h2>
         <?php endif; ?>

         <div class="program-list__cards swiper" data-aos="zoom-in-up">
            <div class="program-list__cards-wrapper swiper-wrapper">
               <?php foreach ($programs_list as $program) {
                  get_template_part('templates/cards/program-card', null, array('program_id' => $program));
               } ?>
            </div>

            <div class="program-list__cards-btns">
            </div>
         </div>
      </div>
   </div>
</section>