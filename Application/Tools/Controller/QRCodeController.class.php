<?php
namespace Tools\Controller;
use Think\Controller;

class QRCodeController extends CommonController {

	public function index() {
		$this->assign("mobile", check_mobile());
		$this->display();
	}
}