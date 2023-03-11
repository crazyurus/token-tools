<?php
namespace Api\Controller;
use Tools\Controller\CommonController;
use Org\Net;

class CommonController extends CommonController {

	public function thumbnail() {
		$src = I('get.src');
		$width = I('get.w');

		if(!preg_match('/^[a-zA-z]+:\/\/[^\s]*$/', $origin_url)) {
			$this->ajaxError('URL的格式不正确');
		}
		elseif(!is_numeric($width)) {
			$this->ajaxError('widthidth格式不正确');
		}
		else {
			$mc_key = md5($src . $width);
			$mmc = memcache_init();
			if ($mmc) {
				$img = memcache_get($mmc, $mc_key);
				if ($img) {
					$img -> exec("jpg", true);
					exit();
				}
			}

			$img = new SaeImage();
			$img -> setData(Http::curlDownload($src));
			$img -> resize($width);
			memcache_set($mmc, $mc_key, $img, MEMCACHE_COMPRESSED, 3600);
			$img -> exec("jpg", true);
		}
	}
}