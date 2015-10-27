<?php
namespace Tools\Controller;
use Think\Controller;

class DetectController extends CommonController {

	public function index() {
		$this->assign('ip', get_client_ip());
		$this->assign('url', 'http://'.$_SERVER['SERVER_NAME'].':'.$_SERVER['SERVER_PORT'].$_SERVER['REQUEST_URI']);
		$this->assign('user', get_current_user());
		$this->assign('server', $_SERVER["SERVER_SOFTWARE"].' MySQL/'.$this->mysql_version().' ThinkPHP/'.THINK_VERSION);
		$this->assign('user_agent', $_SERVER['HTTP_USER_AGENT']);
		$this->display();
	}

	public function info() {
		phpinfo();
	}

	private function mysql_version() {
        $version = M()->query('SELECT version() AS ver');
        return $version[0]['ver'];
    }
}