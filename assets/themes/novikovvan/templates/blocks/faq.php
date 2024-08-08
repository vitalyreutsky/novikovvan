<?php
$title = get_field('title');
$bg_image = get_field('bg_image');
$faq_list = get_field('faq_list');
?>

<section class="faq bg-block" id="faq" style="background-image: url('<?php echo wp_get_attachment_url($bg_image); ?>');">
  <div class="container">
    <div class="faq__wrapper">
      <?php if ($title) : ?>
        <h2 class="faq__title main-title"><?php echo $title; ?></h2>
      <?php endif; ?>

      <div class="faq__list">
        <?php foreach ($faq_list as $key => $faq_elem) :
          $question = $faq_elem['question'];
          $answer = $faq_elem['answer']; ?>
          <div class="faq__elem wrapper-white" data-aos="<?php echo $key % 2 === 0 ? 'fade-right' : 'fade-left'; ?>">
            <div class="faq__question">
              <span><?php echo $key + 1; ?></span>
              <h3><?php echo $question; ?></h3>
            </div>
            <div class="faq__answer">
              <p><?php echo $answer; ?></p>
            </div>
          </div>
        <?php endforeach; ?>
      </div>
    </div>
  </div>
</section>