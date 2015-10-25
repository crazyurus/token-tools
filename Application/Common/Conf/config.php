<?php
return array(
	// 路由
	'URL_ROUTER_ON'   => true,
	'URL_ROUTE_RULES'=>array(
	    '/^[A-Za-z0-9]{6}$/' => 'Tools/DWZ/url',
	    ''                   => 'Home/Index/index'
	),

	// 数据库
    'DB_TYPE'               =>  'mysql',     // 数据库类型
    'DB_HOST'               =>  'localhost', // 服务器地址
    'DB_NAME'               =>  'tokenteam',          // 数据库名
    'DB_USER'               =>  'root',      // 用户名
    'DB_PWD'                =>  '',          // 密码
    'DB_PORT'               =>  '3306',        // 端口
    'DB_PREFIX'             =>  '',    // 数据库表前缀
);