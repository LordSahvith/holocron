<?php

class Form{
    const BASE_PATH = '/var/www/Mod2/ObjectConstants';

    public function logger($data){
        file_put_contents(self::BASE_PATH . '/log/log.txt', $data, FILE_APPEND);
    }

    public function loadHtml(){
        return require Form::BASE_PATH . '/html/contents.php';
    }
}
