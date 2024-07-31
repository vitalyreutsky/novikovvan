<?php
$social = get_field('social', 'options');
?>

<div class="social">
   <ul class="social__list list-reset">
      <?php foreach ($social as $item) : ?>
         <li class="social__item">
            <a class="social__link" href="<?php echo $item['link']; ?>" target="_blank">
               <span></span>
               <span></span>
               <span></span>
               <span></span>

               <?php echo App\Base\SvgSupport::get_inline_svg_by_id($item['icon']); ?>
            </a>
         </li>
      <?php endforeach; ?>
   </ul>
</div>