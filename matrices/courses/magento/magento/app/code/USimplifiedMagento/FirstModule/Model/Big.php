<?php

namespace USimplifiedMagento\FirstModule\Model;

use USimplifiedMagento\FirstModule\Api\Size;

class Big implements Size
{
    public function getSize()
    {
        return 'Big';
    }
}
