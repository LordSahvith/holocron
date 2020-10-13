<?php

namespace USimplifiedMagento\FirstModule\Model;

use USimplifiedMagento\FirstModule\Api\Color;

class Red implements Color
{
    public function getColor()
    {
        return 'Red';
    }
}
