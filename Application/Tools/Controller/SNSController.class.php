<?php
namespace Tools\Controller;
use Think\Controller;

class SNSController extends CommonController {

	public function talk() {
		$this->display();
	}

	public function weibo() {
		$this->display();
	}

	public function card($page = 1) {
		return file_get_contents('http://m.weibo.cn/page/json?containerid=1005051855112015_-_WEIBO_SECOND_PROFILE_WEIBO&count=20&page='.$page);
	}
}