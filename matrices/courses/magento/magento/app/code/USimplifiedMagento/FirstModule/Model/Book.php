<?php

namespace USimplifiedMagento\FirstModule\Model;

use USimplifiedMagento\FirstModule\Api\Size;
use USimplifiedMagento\FirstModule\Api\Color;

class Book
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

    public function getPencilColor()
    {
        return $this->color->getColor();
    }

    public function getPencilSize()
    {
        return $this->size->getSize();
    }
}
