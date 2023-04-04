<?php
return array(
	// 路由
	'URL_ROUTER_ON'   => true,
	'URL_ROUTE_RULES'=>array(
	    '/^[A-Za-z0-9]{6}$/' => 'Tools/DWZ/url',
        '/^app\/[^\s]*$/'    => 'Tools/Url/download',
	    ''                   => 'Home/Index/index'
	),

	// 数据库
    'DB_TYPE'               =>  'mysql',     // 数据库类型
    'DB_HOST'               =>  $_ENV['MYSQLHOST'], // 服务器地址
    'DB_NAME'               =>  $_ENV['MYSQLDATABASE'],          // 数据库名
    'DB_USER'               =>  $_ENV['MYSQLUSER'],      // 用户名
    'DB_PWD'                =>  $_ENV['MYSQLPASSWORD'],          // 密码
    'DB_PORT'               =>  $_ENV['MYSQLPORT'],        // 端口
    'DB_PREFIX'             =>  '',    // 数据库表前缀

    // 模板参数
    'TMPL_PARSE_STRING' => array(
        '__BOOTSTRAP__' =>  __ROOT__.'/Public/Bootstrap',
        '__TOOLS__' => __ROOT__.'/Public/Assets/Tools',
        '__PLUGIN__' => __ROOT__.'/Public/Plugin'
    ),

    // 其它
    'URL_CASE_INSENSITIVE' => true,
    'URL_MODEL'            =>  2,
    'URL_HTML_SUFFIX'      => ''
);