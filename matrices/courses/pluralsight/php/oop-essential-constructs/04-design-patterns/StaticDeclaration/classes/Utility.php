<?php

class Utility
{
    public static $symbol = '$';

    public static function formatCurrency($value)
    {
        return self::$symbol . $value;
    }
}
