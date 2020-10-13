<?php

namespace USimplifiedMagento\FirstModule\Model;

use USimplifiedMagento\FirstModule\Api\PencilInterface;
use USimplifiedMagento\FirstModule\Api\Color;
use USimplifiedMagento\FirstModule\Api\Size;

class Pencil implements PencilInterface
{
    protected $color;
    protected $size;

    public function __construct(Color $color, Size $size)
    {
        $this->color = $color;
        $this->size = $size;
    }

    public function getPencilType()
    {
        return 'You have a: ' . $this->size->getSize() . ' ' . $this->color->getColor() . ' pencil.';
    }
}
