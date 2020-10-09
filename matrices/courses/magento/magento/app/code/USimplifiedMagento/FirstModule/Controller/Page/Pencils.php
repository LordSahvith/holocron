<?php

namespace USimplifiedMagento\FirstModule\Controller\Page;

use Magento\Framework\App\Action\Action;
use Magento\Framework\App\Action\Context;
use USimplifiedMagento\FirstModule\NonMagentoWay\PencilInterface;

class Pencils extends Action
{
    protected $pencilInterface;

    public function __construct(Context $context, PencilInterface $pencilInterface)
    {
        $this->pencilInterface = $pencilInterface;
        parent::__construct($context);
    }

    public function execute()
    {
        echo $this->pencilInterface->getPencilType();
    }
}
