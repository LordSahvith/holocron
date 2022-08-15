function skier(name, sound) {
    return {
        name, // object literal enhancement
        sound, // takes name from parameter and assigns
        powderYell: function() {
            let yell = this.sound.toUpperCase();
            console.log(`${yell}! ${yell}!`)
        }
    }
}

console.log(skier('savhith', 'heeeellllaaaa').name);
skier('savhith', 'heeeellllaaaa').powderYell();
