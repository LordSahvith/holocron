<?php

namespace Sahvith\Learning\Controller\Index;

use \Magento\Framework\App\Action\Action;
use \Magento\Framework\App\Action\Context;
use \Magento\Framework\View\Result\PageFactory;

class Index extends Action
{
    /**
     * @var PageFactory
     */
    protected $resultPageFactory;

    public function __construct(Context $context, PageFactory $resultPageFactory)
    {
        $this->resultPageFactory = $resultPageFactory;
        parent::__construct($context);
    }

    public function execute() 
    {
        /* Result changing the handle */
        $resultPage = $this->resultPageFactory->create();
        $resultPage->getConfig()->getTitle()->set("This is a Page Title.");
        return $resultPage;
    }
}