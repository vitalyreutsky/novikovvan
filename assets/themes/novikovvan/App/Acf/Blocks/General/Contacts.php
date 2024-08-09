<?php

namespace App\Acf\Blocks\General;

use App\Acf\Blocks\Helpers\Block;
use App\Acf\Blocks\RegisterBlock;

final class Contacts implements \App\Acf\Blocks\Helpers\BlockItem
{

   public static function setBlockParams(): void
   {
      RegisterBlock::addBlock(
         new Block(
            'contacts',
            'Contacts',
            'Contacts block',
            'templates/blocks/contacts.php',
            '',
            '',
            array(
               'align' => false,
               'mode'  => false,
               'jsx'   => true,
               'anchor' => true,
            ),
            array(
               'title'       => "Contacts block",
               'description' => "Contacts block"
            ),
            'block-default',
            'novikovvan'
         )
      );
   }
}
