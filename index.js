'use strict'
const pluginname = 'daodao_plus'
const pug = require('pug')
const path = require('path')
const urlFor = require('hexo-util').url_for.bind(hexo)
const util = require('hexo-util')
const axios = require('axios');



// 首页小组件

function common_injector(name, item_config, temple_html_text, js_text, css_text) {
    if (temple_html_text !== '') {
        var layout_name;
        var layout_type;
        var layout_index = 0;
        if (item_config.layout_id) {
            layout_name = item_config.layout_id;
            layout_type = 'id';
        } else {
            layout_name = item_config.layout_name;
            layout_type = item_config.layout_type;
            layout_index = item_config.layout_index;
        }
        var get_layout
        if (layout_type === 'class') {
            get_layout = `document.getElementsByClassName('${layout_name}')[${layout_index}]`
        } else if (layout_type === 'id') {
            get_layout = `document.getElementById('${layout_name}')`
        } else {
            get_layout = `document.getElementById('${layout_name}')`
        }
        var user_info_js = `<script data-pjax>
        function ${name}_injector_config(){
            function ddSwiperInit(){
                const ddSwiper =new DaodaoSwiper(daodao_url,bbpath,filter);
                ddSwiper.init();
            }
            var daodao_url = "${item_config.url}/api/query/20";
            var bbpath = /${item_config.path}/;
            var filter = JSON.parse('${item_config.filter}');
            var parent_div_git = ${get_layout};
            var item_html =  '${temple_html_text}';
            console.log('已挂载${name}')
            parent_div_git.insertAdjacentHTML("afterbegin",item_html) 
            if (typeof DaodaoSwiper === 'function' && typeof Daodao==='function'){
                ddSwiperInit();
            }else{
                let ddScripts = []
                if(typeof DaodaoSwiper!==\"function\")
                    ddScripts.push( getScript('${item_config.CDN.js}'))
                if(typeof Daodao!==\"function\")
                    ddScripts.push( getScript('https://cdn.jsdelivr.net/npm/daodaoplus@1.0.5/static/js/index.js'))
                Promise.all(ddScripts).then(ddSwiperInit);
            }

        }
        if( ${get_layout} && (location.pathname ==='${item_config.enable_page}')){
                ${name}_injector_config()
        }</script>`
    }
    if (js_text !== '') {
        hexo.extend.injector.register('body_end', js_text, "default");
    }

    hexo.extend.injector.register('body_end', user_info_js, "default");
    if (css_text !== '') {
        hexo.extend.injector.register('head_end', css_text, "default");
    }

}

hexo.extend.filter.register('after_generate',function() {
const config = hexo.config.daodao_plus || hexo.theme.config.daodao_plus;
if (!(config && config.enable.card)) return
config.layout_name='recent-posts';
config.layout_type= "class";
config.layout_index=0;
config.enable_page="/"
config.filter = config.filter?JSON.stringify( config.filter):'["iframe","img","script","code"]';
const card_data ={path:config.path};
let temple_html_text = pug.renderFile(path.join(__dirname, './lib/card.pug'),card_data)

if(hexo.config.swiper && hexo.config.swiper.enable){
    var js_text =`<script  src="${config.CDN.js}"></script>`
    var css_text =`<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/daodaoplus@1.0.4/static/css/index.css"><link rel="stylesheet" href="${config.CDN.css}">`;
}else{
    var css_text =`<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/daodaoplus@1.0.4/static/css/index.css"><link rel="stylesheet" href="${config.CDN.css}"><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.css">`;
    var js_text =`<script  src="${config.CDN.js}"></script><script data-pjax  src="https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.js"></script>`

}
temple_html_text =temple_html_text .replace(/\n|\r/g,"")
common_injector('daodao_plus', config,temple_html_text,js_text,css_text)


},  hexo.extend.helper.register('priority', function(){
// 过滤器优先级，priority 值越低，过滤器会越早执行，默认priority是0
var pre_priority = hexo.config.daodao_plus.priority || hexo.theme.config.daodao_plus.priority
const priority = pre_priority ? pre_priority : 0
return priority
}))



// 生成叨叨页
hexo.extend.generator.register('daodao_plus', function (locals) {
    const config = hexo.config.daodao_plus || hexo.theme.config.daodao_plus
    if (!(config && config.enable.page)) return
    const data = {
        url: config.url,
        js: config.CDN.js,
        css: config.CDN.css
    }
    const content = pug.renderFile(path.join(__dirname, './lib/html.pug'), data)
    const pathPre = config.path || 'daodaoplus'
    let pageDate = {
        content: content
    }
    if (config.front_matter) {
        pageDate = Object.assign(pageDate, config.front_matter)
    }
    return {
        path: pathPre + '/index.html',
        data: pageDate,
        layout: ['page', 'post']
    }
})

