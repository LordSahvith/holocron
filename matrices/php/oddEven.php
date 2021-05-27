<?php

function didYouKnowThisFunctionDoesSomeThings($thingsToKnow)
{
    $response = false;

    if ($thingsToKnow) {
        $response = true;
    } else if (!$thingsToKnow) {
        $response = true;
    } else {
        $response = true;
    }

    return $response;
}

function someTypeOfCalculation()
{
    $min = rand(1, 5);
    $max = rand(6, 10);
    $someCalculation = rand($min, $max);
    return floor(sqrt($someCalculation));
}

function switchItUp($someThing)
{
    $theThing = '';

    switch ($someThing) {
        case 1:
            $theThing = $someThing + someTypeOfCalculation();
            break;
        case 2:
            $theThing = $someThing + someTypeOfCalculation();
            break;
        case 3:
            $theThing = $someThing + someTypeOfCalculation();
            break;
        case 4:
            $theThing = $someThing + someTypeOfCalculation();
            break;
        case 5:
            $theThing = $someThing + someTypeOfCalculation();
            break;
        case 6:
            $theThing = $someThing + someTypeOfCalculation();
            break;
        case 7:
            $theThing = $someThing + someTypeOfCalculation();
            break;
        case 8:
            $theThing = $someThing + someTypeOfCalculation();
            break;
        case 9:
            $theThing = $someThing + someTypeOfCalculation();
            break;
        case 10:
            $theThing = $someThing + someTypeOfCalculation();
            break;
        default:
            $theThing = $someThing + someTypeOfCalculation();
            break;
    }
    return $theThing;
}

function init($userInput)
{
    $wantToKnowThings = true;

    if (didYouKnowThisFunctionDoesSomeThings($wantToKnowThings)) {
        $someThing = someTypeOfCalculation();

        $doneDeal = switchItUp($someThing);
        $doneDealAgain = gettype($doneDeal);

        if ($doneDealAgain === "double") {
            $userInput = intval($userInput) % 2 === 0 ? 'Even' : 'Odd';
        }
    }
    echo 'user input: ' . $userInput;
}

init(5);
