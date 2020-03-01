<?php
echo "<h1>PHP Strings</h1>";

$test = 'test';
$testStringSingleQuotes = 'This is a $test string using single quotes';
$testStringDoubleQuotes = "This is a $test string using double quotes";
echo '$test = ' . $test; 
echo "<br />";
echo $testStringSingleQuotes;
echo "<br />";
echo $testStringDoubleQuotes;
echo "<br />";
echo "<br />";

echo 'Using apotrophe\'s in single quotes need to be escaped with \\';
echo "<br />";
echo 'Also \n doesn\'t work inside single quotes';
echo "<br />";
echo "Alternatively you don't need to esapce the single ' like so: doesn\'t";
echo "<br />";
echo "<br />";

$place = 1;
echo 'this is looking for $placest, but only $place exists.';
echo "<br />";
echo "in order to have variable followed by text you need {} around variable." . ' {$place}st = ' ,  "{$place}st.";
echo "<br />";
echo 'you can also mix single & double quotes.' . " this has double so this works ${place}st time," . ' unlike this $place' . "(should be $place)";
echo "<br />";
echo "<br />";

echo <<<EOT
        this is multi line
    that respects format
            of the text

            -someone
EOT;
echo "<br />";
echo "<br />";

print("the print function works similar to echo but can only recieve one parameter");
echo "<br />";
echo "echo can", " recieve ", " mulitple parameters separated by", " a coma";
echo "<br />";
echo "<br />";

$cases = "This is testing case functions.";
echo $cases . " - before functions.<br />";
$cases = strtoupper($cases);
echo $cases . " - after strtoupper().<br />";
$cases = strtolower($cases);
echo $cases . " - after strtolower().<br />";
echo "<br />";

$quote1 = '"There is no great genius without a mixture of madness."';
$strLength = strlen($quote1);
echo "$quote1 Has $strLength characters.";
echo "<br />";
echo "<br />";

$quote2 = '"Courage is resistance to fear, mastery of fear, not absence of fear."';
echo "$quote2 <br />";
echo "1st occurance of 'fear' is at " .  strpos($quote2, "fear");
echo "<br />";
echo "2nd occurance of 'fear is at " . strpos($quote2, "fear", 27);
echo "<br />";
echo "<br />";

$quote3 = '"Fear is to be recognized and loved."';
echo "$quote3 <br />";
$replaced = str_replace("loved.", "forgotten. -Durzo Blint", $quote3, $count);
echo "$replaced<br />";
echo "number of occurrences replaced was $count.";
echo "<br />";
echo "<br />";

$quote4 = '"Only those who will risk going too far can possibly find out how far one can go."';
echo "$quote4 <br />";
echo substr($quote4, 4, 5);
echo "<br />";
echo "<br />";

$anotherQuote = '"With great power comes great responsibility." - Uncle Ben';
echo "$anotherQuote <br />";
$quoteArray = str_split($anotherQuote, 4);
print_r($quoteArray);

?>