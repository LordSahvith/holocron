<?php

namespace USimplifiedMagento\FirstModule\Model;

use USimplifiedMagento\FirstModule\Api\Size;

class Small implements Size
{
    public function getSize()
    {
        return 'Small';
    }
}
