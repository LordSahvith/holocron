<?php
/**
 * Class Form
 */
class Form{
    public $model;
    public $config = [];
    public $fields = [];
    public $data;
    public $isValid = false;

    /**
     * @param $model
     * @param array $params
     */
    public function __construct($model, array $params){
        $this->model = $model;
        $this->config = $params;
    }

    /**
     * @return string
     */
    public function getStartTag(){
        $config = $this->config;
        $form = "<form";
        $form .= $config['id'] ? " id=\"{$config['id']}\"" : null;
        $form .= $config['name'] ? " name=\"{$config['name']}\"" : null;
        $form .= $config['action'] ? " action=\"{$config['action']}\"" : null;
        $form .= $config['method'] ? " method=\"{$config['method']}\"" : null;
        $form .= '>';
        return $form;
    }

    /**
     * @return bool
     */
    public function generateFields(){
        $config = $this->config;
        $newField = null;
        foreach($config['fields'] as $field){
            switch ($field['type']){
                case 'text':
                    require_once CLASSES . 'Form/Inputs/Text.php';
                    $newField = new Text();
                    $field['type'] ? $newField->setType($field['type']) : null;
                    $field['label'] ? $newField->setLabel($field['label']) : null;
                    $field['validator'] ? $newField->setValidator($field['validator']) : null;
                    break;
                case 'submit':
                    require_once CLASSES . 'Form/Inputs/Submit.php';
                    $newField = new Submit();
                    $field['type'] ? $newField->setType($field['type']) : null;
                    break;
                case 'checkbox':
                    require_once CLASSES . 'Form/Inputs/Checkbox.php';
                    $newField = new Checkbox();
                    $field['type'] ? $newField->setType($field['type']) : null;
                    $field['label'] ? $newField->setLabel($field['label']) : null;
                    $field['validator'] ? $newField->setValidator($field['validator']) : null;
                    break;
                case 'select':
                    require_once CLASSES . 'Form/Inputs/Select.php';
                    require_once CLASSES . 'Form/Inputs/Option.php';
                    $newField = new Select();
                    $option = new Option();
                    $options = [];
                    $values = null;
                    $field['multiple'] ? $newField->setMultiple($field['multiple']) : null;
                    $field['label'] ? $newField->setLabel($field['label']) : null;
                    if(is_string($field['options'])){
                        $stmt = $this->model->getCountry();
                        $values = $stmt->fetchAll(PDO::FETCH_COLUMN);
                        sort($values);
                        $options = $option->getOptions($values);
                    }
                    if(is_array($field['options'])){
                        $values = $field['options'];
                        $options = $option->getOptions($values);
                    }
                    if($options && $values){
                        $field['validator'] ? $newField->setValidator($field['validator'], $values) : null;
                        $newField->setOptions($options);
                    }
                    break;
            }
            if(!$newField){
                return false;
            } else {
                //Set common fields
                !empty($field['value']) ? $newField->setValue($field['value']) : null;
                !empty($field['name']) ? $newField->setName($field['name']) : null;
                !empty($field['required']) ? $newField->setRequired($field['required']) : null;
                !empty($field['priority']) ? $this->fields[$field['priority']] = $newField : null;
            }
        }
        ksort($this->fields);
        return true;
    }

    /**
     * @param $data
     */
    public function setData($data){
        $this->data = $data;
    }

    /**
     * @return mixed
     */
    public function getData()
    {
        return $this->data;
    }

    public function validate(){
        $invalidCount = null;
        foreach ($this->data as $key => $value){
            foreach($this->fields as $field){
                if($field->getName() == $key){
                    $validator = $field->getValidator();
                    if($validator->validate($value)){
                        $field->setValid();
                        break;
                    }else{
                        $invalidCount++;
                    }
                }
            }
        }
        $this->isValid = $invalidCount ?: true;
    }

    /**
     * @return array
     */
    public function getFields(){
        return $this->fields;
    }

    /**
     * @return string
     */
    public function getEndTag(){
        return '</form>';
    }
}