<?php
return [
    'db' => [
        'dsn' => 'mysql:host=127.0.0.1;dbname=site',
        'user' => 'admin',
        'pass' => 'test',
    ],
    'forms' => [
        'register' => [
            'name' => 'register',
            'id' => 'form1',
            'method' => 'post',
            'action' => 'index.php',
            'fields' => [
                'first_name' => [
                    'label' => 'First Name',
                    'type' => 'text',
                    'name' => 'first_name',
                    'priority' => 1,
                    'required' => true,
                    'value' => '',
                    'validator' => [
                        'StringLength' => [
                            'minimum' => 2,
                            'maximum' => 30,
                        ],
                    ],
                ],
                'last_name' => [
                    'label' => 'Last Name',
                    'type' => 'text',
                    'name' => 'last_name',
                    'priority' => 2,
                    'required' => true,
                    'value' => '',
                    'validator' => [
                        'StringLength' => [
                            'minimum' => 2,
                            'maximum' => 30,
                        ],
                    ],
                ],
                'email' => [
                    'label' => 'Email',
                    'type' => 'text',
                    'name' => 'email',
                    'priority' => 3,
                    'required' => true,
                    'value' => '',
                    'validator' => 'email',
                ],
                'emailPreferredContact' => [
                    'label' => 'Contact By Email',
                    'type' => 'checkbox',
                    'name' => 'email_preferred_contact',
                    'priority' => 4,
                    'required' => true,
                    'value' => false,
                    'validator' => 'boolean',
                ],
                'country' => [
                    'label' => 'Country',
                    'type' => 'select',
                    'name' => 'country',
                    'multiple' => false,
                    'priority' => 5,
                    'required' => true,
                    'value' => '',
                    'options' => 'country',
                    'validator' => 'InArray',
                ],
                'submit' => [
                    'type' => 'submit',
                    'priority' => 6,
                    'value' => 'Submit',
                ],
            ],
        ],
        'login' => [
            'name' => 'login',
            'id' => 'form1',
            'method' => 'post',
            'action' => 'index.php',
            'fields' => [
                'username' => [
                    'type' => 'text',
                    'name' => 'username',
                    'priority' => 1,
                    'required' => true,
                    'value' => '',
                ],
                'password' => [
                    'type' => 'password',
                    'name' => 'password',
                    'priority' => 2,
                    'required' => true,
                    'value' => '',
                ],
            ],
        ],
    ],
];