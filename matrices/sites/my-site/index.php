<?php include 'components/header.php'; ?>

<style>
    section:nth-child(even) {
        background: #eee;
    }
    section:nth-child(odd) {
        background: #ddd;
    }
</style>

<main>
    <section class="bb-hero bb-mediaBlock bb-mediaBlock-fullCopy--centered">
        <div class="bb-mediaBlock-image">
            <picture>
                <source media="(min-width: 768px)" srcset="https://via.placeholder.com/1600x780/f00">
                <source media="(min-width: 641px)" srcset="https://via.placeholder.com/780x480/f00">
                <source media="(max-width: 640px)" srcset="https://via.placeholder.com/640x400/f00">
                <img src="https://via.placeholder.com/1600x780/f00" alt="">
            </picture>
        </div>
        <div class="bb-mediaBlock-copy">
            <h1>Hello there...I'm Mr&nbsp;Anderson</h1>
        </div>
    </section>

    <section class="bb-mediaBlock">
        <div class="bb-mediaBlock-copy">
            <h1>Lorem Ipsum</h1>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia, enim corrupti perspiciatis eveniet voluptate quidem quis tempora, debitis amet ipsam voluptatum impedit quo, quam fugit excepturi. Et hic fugit maxime? Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, amet.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, doloremque laborum explicabo magni qui ea maiores velit cum nulla repellendus suscipit veniam nostrum quos, totam assumenda ab inventore eligendi? Accusamus.</p>
        </div>

        <div class="bb-mediaBlock-cta">
            <a class="bb-button" href="#">Lorem Ipsum</a>
        </div>
    </section>

<section class="bb-mediaBlock">
    <div class="bb-mediaBlock-title">
        <h1>Lorem Ipsum</h1>
    </div>

    <div class="bb-mediaBlock bb-mediaBlock-copyBelowImage">
        <div class="bb-mediaBlock-image">
            <picture>
                <source media="(min-width: 768px)" srcset="https://via.placeholder.com/1600x780/f00">
                <source media="(min-width: 641px)" srcset="https://via.placeholder.com/780x480/f00">
                <source media="(max-width: 640px)" srcset="https://via.placeholder.com/640x400/f00">
                <img src="https://via.placeholder.com/1600x780/f00" alt="">
            </picture>
        </div>

        <div class="bb-mediaBlock-copy">
            <p>Lorem ipsum</p>
        </div>

        <div class="bb-mediaBlock-cta">
            <a class="bb-button" href="#">Lorem Ipsum</a>
        </div>
    </div>
</section>
</main>

<?php include 'components/footer.php'; ?>