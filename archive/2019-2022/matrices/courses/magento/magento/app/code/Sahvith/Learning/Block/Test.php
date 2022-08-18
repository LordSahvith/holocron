<?php

namespace Sahvith\Learning\Block;

use \Magento\Framework\View\Element\Template;

class Test extends Template
{
    protected function _construct()
    {
        parent::_construct();
        $this->setTemplate('Sahvith_Learning::index.phtml');
    }

    public function greeting()
    {
        return "Hey this is working.";
    }
}