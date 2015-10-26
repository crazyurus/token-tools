<?php
namespace Tools\Controller;
use Think\Controller;

class CommonController extends Controller {

	protected function ajaxSuccess($data) {
		$this->generate(200, $data);
	}

	protected function ajaxError($data) {
		$this->generate(500, $data);
	}

	protected function ajaxDefine($data, $code = 300) {
		$this->generate($code, $data);
	}

	private function generate($code, $data) {
		$return = array(
			'code' => $code,
			'data' => $data
		);
		$this->ajaxReturn($return);
	}
}