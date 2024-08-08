<?php

namespace App\Acf\Blocks\General;

use App\Acf\Blocks\Helpers\Block;
use App\Acf\Blocks\RegisterBlock;

final class Form implements \App\Acf\Blocks\Helpers\BlockItem
{

   public static function setBlockParams(): void
   {
      RegisterBlock::addBlock(
         new Block(
            'form',
            'Form',
            'Form block',
            'templates/blocks/form.php',
            '',
            '',
            array(
               'align' => false,
               'mode'  => false,
               'jsx'   => true,
               'anchor' => true,
            ),
            array(
               'title'       => "Form block",
               'description' => "Form block"
            ),
            'block-default',
            'novikovvan'
         )
      );
   }
}
