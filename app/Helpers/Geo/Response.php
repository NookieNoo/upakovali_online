<?php
namespace App\Helpers\Geo;

/**
 * Class Response
 * @package Yandex\Geo
 * @license The MIT License (MIT)
 */
class Response
{
    /**
     * @var \App\Helpers\Geo\GeoObject[]
     */
    protected $_list = array();
    /**
     * @var array
     */
    protected $_data;

    public function __construct(array $data)
    {
        $this->_data = $data;
        if (isset($data['response']['GeoObjectCollection']['featureMember'])) {
            foreach ($data['response']['GeoObjectCollection']['featureMember'] as $entry) {
                $this->_list[] = new \App\Helpers\Geo\GeoObject($entry['GeoObject']);
            }
        }
    }

    /**
     * Исходные данные
     * @return array
     */
    public function getData()
    {
        return $this->_data;
    }

    /**
     * @return \App\Helpers\Geo\GeoObject[]
     */
    public function getList()
    {
        return $this->_list;
    }

    /**
     * @return null|GeoObject
     */
    public function getFirst()
    {
        $result = null;
        if (count($this->_list)) {
            $result = $this->_list[0];
        }

        return $result;
    }

    /**
     * Возвращает исходный запрос
     * @return string|null
     */
    public function getQuery()
    {
        $result = null;
        if (isset($this->_data['response']['GeoObjectCollection']['metaDataProperty']['GeocoderResponseMetaData']['request'])) {
            $result = $this->_data['response']['GeoObjectCollection']['metaDataProperty']['GeocoderResponseMetaData']['request'];
        }
        return $result;
    }

    /**
     * Кол-во найденных результатов
     * @return int
     */
    public function getFoundCount()
    {
        $result = null;
        if (isset($this->_data['response']['GeoObjectCollection']['metaDataProperty']['GeocoderResponseMetaData']['found'])) {
            $result = (int)$this->_data['response']['GeoObjectCollection']['metaDataProperty']['GeocoderResponseMetaData']['found'];
        }
        return $result;
    }

    /**
     * Широта в градусах. Имеет десятичное представление с точностью до семи знаков после запятой
     * @return float|null
     */
    public function getLatitude()
    {
        $result = null;
//        var_dump($this->_data['response']);
        if (isset($this->_data['response']['GeoObjectCollection']['metaDataProperty']['GeocoderResponseMetaData']['found'])
            && $this->_data['response']['GeoObjectCollection']['metaDataProperty']['GeocoderResponseMetaData']['found']) {
//            list(,$latitude) = explode(' ', $this->_data['response']['GeoObjectCollection']['metaDataProperty']['GeocoderResponseMetaData']['Point']['pos']);
            list(,$latitude) = explode(' ', $this->_data['response']['GeoObjectCollection']['featureMember'][0]['GeoObject']['Point']['pos']);
            $result = (float)$latitude;
        }
        return $result;
    }

    /**
     * Долгота в градусах. Имеет десятичное представление с точностью до семи знаков после запятой
     * @return float|null
     */
    public function getLongitude()
    {
        $result = null;
        if (isset($this->_data['response']['GeoObjectCollection']['metaDataProperty']['GeocoderResponseMetaData']['found'])
            && $this->_data['response']['GeoObjectCollection']['metaDataProperty']['GeocoderResponseMetaData']['found']) {
//            list($longitude,) = explode(' ', $this->_data['response']['GeoObjectCollection']['metaDataProperty']['GeocoderResponseMetaData']['Point']['pos']);
            list($longitude,) = explode(' ', $this->_data['response']['GeoObjectCollection']['featureMember'][0]['GeoObject']['Point']['pos']);
            $result = (float)$longitude;
        }
        return $result;
    }
}
