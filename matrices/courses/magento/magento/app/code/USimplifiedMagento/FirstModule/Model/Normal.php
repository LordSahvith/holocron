<?php

namespace USimplifiedMagento\FirstModule\Model;

use USimplifiedMagento\FirstModule\Api\Size;

class Normal implements Size
{
    public function getSize()
    {
        return 'Normal';
    }
}
