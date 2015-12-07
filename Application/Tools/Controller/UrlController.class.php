<?php
namespace Tools\Controller;
use Think\Controller;

class UrlController extends CommonController {

    protected $model;

    function _initialize() {
        $this->model = M('app');
    }

    public function modify() {
        if(empty($_POST['id'])) $this->ajaxError("无效的请求！");
        else {
            try {
                $this->model->data($_POST)->save();
                $this->ajaxSuccess($this->model->field('app_short')->find($_POST['id'])['app_short']);
            } catch(\Exception $e) {
                $this->ajaxError("生成失败，请检查输入的信息是否正确");
            }
        } 
    }

    public function getinfo($id) {
        $result = $this->model->field('ios_url, android_url, apk_url, wp_url, default_url')->find(intval($id));
        if($result) {
            $this->ajaxSuccess($result);
        }
        else $this->ajaxError('无效的App编号！');
    }

    public function download() {
        $app = I('path.1');
        $user_agent = strtolower($_SERVER['HTTP_USER_AGENT']);
        $result = $this->model->where("`app_short`='%s'", $app)->find();
        $url = '';
        if($result) {
            if(preg_match('/(micromessenger|weibo)/i', $user_agent)) {
                $this->assign('title', $result['app_name']);
                $this->display('QRCode/open');
                exit;
            }
            elseif(preg_match('/(ipad|ipod|iphone|ios)/i', $user_agent)) {
                $url = 'itms-appss://itunes.apple.com/cn/app/id'.$result['ios_url'];
            }
            elseif(preg_match('/(qq|tb|alipay|windvane)/i', $user_agent)) {
                $url = $result['apk_url'].'.apk';
            }
            elseif(preg_match('/(android|yunos)/i', $user_agent)) {
                $url = empty($result['android_url']) ? $result['apk_url'].'.apk' : 'market://details?id='.$result['android_url'];
            }
            elseif(preg_match('/windows phone/i', $user_agent)) {
                $url = 'http://www.windowsphone.com/zh-cn/store/app/'.$result['wp_url'];
            }
            if(empty($url)) $url = $result['default_url'];
            redirect($url);
        }
        else $this->error('该App不存在或被删除，无法下载');
    }
}