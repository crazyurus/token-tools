<?php
return array(
	// 路由
	'URL_ROUTER_ON'   => true,
	'URL_ROUTE_RULES'=>array(
	    '/^[A-Za-z0-9]{6}$/' => 'Url/Index/index',
	    ''                   => 'Home/Index/index'
	),
);