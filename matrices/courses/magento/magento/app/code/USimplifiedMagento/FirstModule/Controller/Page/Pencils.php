<?php

namespace USimplifiedMagento\FirstModule\Controller\Page;

use Magento\Framework\App\Action\Action;
use Magento\Framework\App\Action\Context;
use USimplifiedMagento\FirstModule\Api\PencilInterface;
use USimplifiedMagento\FirstModule\Model\Book;

class Pencils extends Action
{
    protected $pencilInterface;
    protected $book;

    public function __construct(Context $context, PencilInterface $pencilInterface, Book $book)
    {
        $this->pencilInterface = $pencilInterface;
        $this->book = $book;
        parent::__construct($context);
    }

    public function execute()
    {
//        $color = $this->pencilInterface->getPencilColor();
        $pencilColor = $this->getPencilColor($this->pencilInterface);
        $bookColor = $this->getPencilColor($this->book);

        $this->getColorType($pencilColor);
        echo $this->pencilInterface->getPencilType();
        echo PHP_EOL;
        $this->getColorType($bookColor);
        echo $this->book->getPencilType();
    }

    public function getPencilColor($object)
    {
        return $object->getPencilColor();
    }

    public function getColorType($color)
    {
        switch ($color) {
            case 'Green':
                echo 'Consular' . PHP_EOL;
                break;
            case 'Red':
                echo 'Sith' . PHP_EOL;
                break;
            default:
                echo 'Jedi Temple Guard' . PHP_EOL;
                break;
        }
    }
}
