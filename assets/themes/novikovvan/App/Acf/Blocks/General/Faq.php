<?php

namespace App\Acf\Blocks\General;

use App\Acf\Blocks\Helpers\Block;
use App\Acf\Blocks\RegisterBlock;

final class Faq implements \App\Acf\Blocks\Helpers\BlockItem
{

   public static function setBlockParams(): void
   {
      RegisterBlock::addBlock(
         new Block(
            'faq',
            'Faq',
            'Faq block',
            'templates/blocks/faq.php',
            '',
            '',
            array(
               'align' => false,
               'mode'  => false,
               'jsx'   => true,
               'anchor' => true,
            ),
            array(
               'title'       => "Faq block",
               'description' => "Faq block"
            ),
            'block-default',
            'novikovvan'
         )
      );
   }
}
