<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bare Bones - Elements</title>

    <link rel="stylesheet" href="../css/bare-bones.css">
</head>

<body>

    <h1>Heading 1 - &lt;h1&gt;</h1>
    <h2>Heading 2 - &lt;h2&gt;</h2>
    <h3>Heading 3 - &lt;h3&gt;</h3>
    <h4>Heading 4 - &lt;h4&gt;</h4>
    <h5>Heading 5 - &lt;h5&gt;</h5>
    <h6>Heading 6 - &lt;h6&gt;</h6>

    <br>

    <p>Paragraph - &lt;p&gt;</p>

    <br>

    <a href="#">Link - &lt;a&gt;</a>

    <br>
    <br>

    <button>Button - &lt;button&gt;</button>

    <br>
    <br>

    <ol>
        <li>List Item 1</li>
        <li>List Item 2</li>
        <li>List Item 3</li>
        <li>List Item 4</li>
    </ol>

    <ul>
        <li>List Item 1</li>
        <li>List Item 2</li>
        <li>List Item 3</li>
        <li>List Item 4</li>
    </ul>

    <br>

    <img src="../assets/images/red-mobile.jpg" alt="">

    <br>
    <br>

    <picture>
        <source media="(min-width: 992px)" srcset="../assets/images/red-desktop.jpg">
        <source media="(min-width: 641px)" srcset="../assets/images/red-tablet-v2.jpg">
        <source media="(max-width: 640px)" srcset="../assets/images/red-mobile.jpg">
        <img src="../images/red-desktop.jpg" alt="">
    </picture>

    <br>
    <br>

    <!-- TODO: use own video -->
    <video controls autoplay>
        <source src="../assets/videos/big-buck.mp4" type="video/mp4">
        <source src="../assets/videos/big-buck.ogg" type="video/ogg">
        Your browser does not support the video tag.
    </video>

    <br>
    <br>

    <!-- TODO: use own audio -->
    <audio controls>
        <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg">
        <source src="https://www.w3schools.com/html/horse.ogg" type="audio/ogg">
        Your browser does not support the audio element.
    </audio>

    <br>
    <br>

    <canvas id="myCanvas" style="background: #000;"></canvas>

    <br>
    <br>

    <!-- TODO: use own video -->
    <iframe src="https://www.youtube.com/embed/5gcjGuKVcbM" title="YouTube video player"></iframe>

    <br>
    <br>

    <form>
        <label for="firstName">First name:</label><br>
        <input type="text" id="firstName" name="firstName"><br>
        <label for="lastName">Last name:</label><br>
        <input type="text" id="lastName" name="lastName">
        <br>
        <input type="submit" value="Submit">
    </form>

    <br>

    <p>Choose side:</p>
    <form>
        <input type="radio" id="sith" name="fav_side" value="Sith">
        <label for="sith">Sith</label><br>
        <input type="radio" id="jedi" name="fav_side" value="Jedi">
        <label for="jedi">Jedi</label><br>
        <input type="radio" id="grey" name="fav_side" value="Grey">
        <label for="grey">Grey</label>
        <br>
        <input type="submit" value="Submit">
    </form>

    <br>

    <form>
        <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
        <label for="vehicle1"> I have a bike</label><br>
        <input type="checkbox" id="vehicle2" name="vehicle2" value="Car">
        <label for="vehicle2"> I have a car</label><br>
        <input type="checkbox" id="vehicle3" name="vehicle3" value="Feet">
        <label for="vehicle3"> I have feet</label>
        <br>
        <input type="submit" value="Submit">
    </form>

    <br>

    <label for="cars">Choose a car:</label>
    <select id="cars" name="cars">
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="fiat">Fiat</option>
        <option value="audi">Audi</option>
    </select>

    <br>
    <br>

    <label for="cars2">Choose a car:</label>
    <select id="cars2" name="cars2" size="4" multiple>
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="fiat">Fiat</option>
        <option value="audi">Audi</option>
    </select>

    <br>
    <br>

    <textarea name="message" rows="10" cols="30" placeholder="The cat was playing in the garden."></textarea>

    <br>
    <br>

    <form>
        <fieldset>
            <legend>Personalia:</legend>
            <label for="fname">First name:</label><br>
            <input type="text" id="fname" name="fname" value="Lord"><br>
            <label for="lname">Last name:</label><br>
            <input type="text" id="lname" name="lname" value="Sahvith"><br><br>
            <input type="submit" value="Submit">
        </fieldset>
    </form>

    <br>
    <br>

    <p>Datalist:</p>
    <form>
        <input list="browsers">
        <datalist id="browsers">
            <option value="Internet Explorer">
            <option value="Firefox">
            <option value="Chrome">
            <option value="Opera">
            <option value="Safari">
        </datalist>
    </form>

    <br>
    <br>

    <form>
        <label for="favcolor">Select your favorite color:</label>
        <input type="color" id="favcolor" name="favcolor">
    </form>

    <br>
    <br>

    <form>
        <label for="birthday">Birthday:</label>
        <input type="date" id="birthday" name="birthday">
    </form>

    <br>
    <br>

    <form>
        <label for="bdaymonth">Birthday (month and year):</label>
        <input type="month" id="bdaymonth" name="bdaymonth">
    </form>

    <br>
    <br>

    <form>
        <label for="birthdaytime">Birthday (date and time):</label>
        <input type="datetime-local" id="birthdaytime" name="birthdaytime">
    </form>

    <br>
    <br>

    <form>
        <label for="email">Enter your email:</label>
        <input type="email" id="email" name="email">
    </form>

    <br>
    <br>

    <form>
        <label for="myfile">Select a file:</label>
        <input type="file" id="myfile" name="myfile">
    </form>

    <br>
    <br>

    <form>
        <label for="quantity">Quantity (between 1 and 5):</label>
        <input type="number" id="quantity" name="quantity" min="1" max="5">
    </form>

    <br>
    <br>

    <form>
        <label for="vol">Volume (between 0 and 50):</label>
        <input type="range" id="vol" name="vol" min="0" max="50">
    </form>

    <br>
    <br>

    <form>
        <label for="gsearch">Search Google:</label>
        <input type="search" id="gsearch" name="gsearch">
    </form>

    <br>
    <br>

    <form>
        <label for="phone">Enter your phone number:</label>
        <input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}">
    </form>

    <br>
    <br>

    <form>
        <label for="appt">Select a time:</label>
        <input type="time" id="appt" name="appt">
    </form>

    <br>
    <br>

    <form>
        <label for="homepage">Add your homepage:</label>
        <input type="url" id="homepage" name="homepage">
    </form>

    <br>
    <br>

    <form>
        <label for="week">Select a week:</label>
        <input type="week" id="week" name="week">
    </form>

    <br>
    <br>

</body>

</html>