<?php

namespace App\Acf\Blocks\General;

use App\Acf\Blocks\Helpers\Block;
use App\Acf\Blocks\RegisterBlock;

final class ProgramsList implements \App\Acf\Blocks\Helpers\BlockItem
{

   public static function setBlockParams(): void
   {
      RegisterBlock::addBlock(
         new Block(
            'programs-list',
            'Programs List',
            'Programs List block',
            'templates/blocks/programs-list.php',
            '',
            '',
            array(
               'align' => false,
               'mode'  => false,
               'jsx'   => true,
               'anchor' => true,
            ),
            array(
               'title'       => "Programs List block",
               'description' => "Programs List block"
            ),
            'block-default',
            'novikovvan'
         )
      );
   }
}
