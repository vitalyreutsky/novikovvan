<?php

namespace App\Woocomerce;

final class Init
{
   public function __construct()
   {
      //Removes links
      add_filter('woocommerce_product_is_visible', [self::class, 'product_invisible']);

      //Remove single page
      add_filter('woocommerce_register_post_type_product', [self::class, 'hide_product_page'], 12, 1);
   }

   public static function product_invisible()
   {
      return false;
   }

   public static function hide_product_page($args)
   {
      $args["publicly_queryable"] = false;
      $args["public"] = false;
      return $args;
   }
}
