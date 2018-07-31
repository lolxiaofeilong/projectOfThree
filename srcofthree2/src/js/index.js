document.addEventListener('DOMContentLoaded',()=>{

    // 轮播图
    $('.c-banner').myscroll({
        picEl: $('#move'),
        ctrlEl: $('#ctrl'),
        libs: true,
        arrows: false,
        autoPlay: true,
        time: 3000,
        speed: 500,
        effect: 'left'
    });




    // 返回顶部
    $('.c-btntop').click(()=>{
        var timer = setInterval(()=>{
            var speed = Math.ceil(window.scrollY * 0.5);
            scrollBy(0, -speed);
            if(window.scrollY === 0){
                clearInterval(timer);
            }
        },100)
    })

    window.onscroll = ()=>{
        if(window.scrollY >= 1000){
            $('.c-fixed')[0].style.display = 'block';
        }else{
            $('.c-fixed')[0].style.display = 'none';
        }
    }

    // 首页末切换
    var parent = document.getElementsByClassName('c-h3parent')[0];
    var one = parent.children[0].children;
    var two = parent.children[1].children;

    one[0].className = 'active';
    for(let i = 0; i < one.length; i++){
        if(i > 0){
            two[i].style.display = 'none';
        }

        one[i].onmouseover = function(){
            var idx;
            for(let i = 0; i < one.length; i++){
                if(one[i] == this){
                    idx = i;
                }
                one[i].className = '';
                two[i].style.display = 'none';
            }
            this.className = 'active';
            two[idx].style.display = 'block';
        }
    }



    // ajax请求数据
    $(function(){
        http.get(Path.baseUrl+"/goods_select", "", function(res){
            // console.log(res.data)
            
            var datalist = res.data.slice(0,4);
            // console.log(datalist)
            
            $('.c-ziyim').html(datalist.map(function(item){
                
                return `<a href="javascript:;" data-guid="${item.goodsID}">
                    <p class="c-name ac"><b>${item.name}&nbsp;${item.Model}</b><p>
                    <p class="c-price ac"><span>￥${item.NowPrice}</span>&nbsp;<del>￥${item.OldPrice}</del></p>
                    <img src="${item.img}.jpg">
                </a>`;
            }).join(''));

        })
    })

    $(function(){
        http.get(Path.baseUrl+"/goods_select", "", function(res){
            // console.log(res.data)
            
            var datalist = res.data.slice(4,8);
            // console.log(datalist)
            
            $('.c-ziyirm').html(datalist.map(function(item){
                
                return `<a href="javascript:;" data-guid="${item.goodsID}">
                    <img src="${item.img}.jpg">             
                    <p class="c-name dib">${item.name}&nbsp;${item.Model}<p>
                    <p class="c-price dib"><span><b>￥${item.NowPrice}</b></span></p>
                </a>`;
            }).join(''));
        })
    })



    $(function(){
        http.get(Path.baseUrl+"/goods_select", "", function(res){
            // console.log(res.data)
            
            var datalist = res.data.slice(8,12);
            // console.log(datalist)
            
            $('.c-girlm').html(datalist.map(function(item){
                
                return `<a href="javascript:;" data-guid="${item.goodsID}">
                    <p class="c-name ac"><b>${item.name}&nbsp;${item.Model}</b><p>
                    <p class="c-price ac"><span>￥${item.NowPrice}</span>&nbsp;<del>￥${item.OldPrice}</del></p>
                    <img src="${item.img}.jpg">
                </a>`;
            }).join(''));

        })
    })

    $(function(){
        http.get(Path.baseUrl+"/goods_select", "", function(res){
            // console.log(res.data)
            
            var datalist = res.data.slice(12,16);
            // console.log(datalist)
            
            $('.c-girlrm').html(datalist.map(function(item){
                
                return `<a href="javascript:;" data-guid="${item.goodsID}">
                    <img src="${item.img}.jpg">             
                    <p class="c-name dib">${item.name}&nbsp;${item.Model}<p>
                    <p class="c-price dib"><span><b>￥${item.NowPrice}</b></span></p>
                </a>`;
            }).join(''));
        })
    })



    $(function(){
        http.get(Path.baseUrl+"/goods_select", "", function(res){
            // console.log(res.data)
            
            var datalist = res.data.slice(16,20);
            // console.log(datalist)
            
            $('.c-boym').html(datalist.map(function(item){
                
                return `<a href="javascript:;" data-guid="${item.goodsID}">
                    <p class="c-name ac"><b>${item.name}&nbsp;${item.Model}</b><p>
                    <p class="c-price ac"><span>￥${item.NowPrice}</span>&nbsp;<del>￥${item.OldPrice}</del></p>
                    <img src="${item.img}.jpg">
                </a>`;
            }).join(''));

        })
    })

    $(function(){
        http.get(Path.baseUrl+"/goods_select", "", function(res){
            // console.log(res.data)
            
            var datalist = res.data.slice(20,24);
            // console.log(datalist)
            
            $('.c-boyrm').html(datalist.map(function(item){
                
                return `<a href="javascript:;" data-guid="${item.goodsID}">
                    <img src="${item.img}.jpg">             
                    <p class="c-name dib">${item.name}&nbsp;${item.Model}<p>
                    <p class="c-price dib"><span><b>￥${item.NowPrice}</b></span></p>
                </a>`;
            }).join(''));
        })
    })



    $(function(){
        http.get(Path.baseUrl+"/goods_select", "", function(res){
            // console.log(res.data)
            
            var datalist = res.data.slice(24,28);
            // console.log(datalist)
            
            $('.c-parentm').html(datalist.map(function(item){
                
                return `<a href="javascript:;" data-guid="${item.goodsID}">
                    <p class="c-name ac"><b>${item.name}&nbsp;${item.Model}</b><p>
                    <p class="c-price ac"><span>￥${item.NowPrice}</span>&nbsp;<del>￥${item.OldPrice}</del></p>
                    <img src="${item.img}.jpg">
                </a>`;
            }).join(''));

        })
    })

    $(function(){
        http.get(Path.baseUrl+"/goods_select", "", function(res){
            // console.log(res.data)
            
            var datalist = res.data.slice(26,30);
            // console.log(datalist)
            
            $('.c-parentrm').html(datalist.map(function(item){
                
                return `<a href="javascript:;" data-guid="${item.goodsID}">
                    <img src="${item.img}.jpg">             
                    <p class="c-name dib">${item.name}&nbsp;${item.Model}<p>
                    <p class="c-price dib"><span><b>￥${item.NowPrice}</b></span></p>
                </a>`;
            }).join(''));
        })
    })



    $(function(){
        http.get(Path.baseUrl+"/goods_select", "", function(res){
            // console.log(res.data)
            
            var datalist = res.data.slice(2,6);
            // console.log(datalist)
            
            $('.c-increatem').html(datalist.map(function(item){
                
                return `<a href="javascript:;" data-guid="${item.goodsID}">
                    <p class="c-name ac"><b>${item.name}&nbsp;${item.Model}</b><p>
                    <p class="c-price ac"><span>￥${item.NowPrice}</span>&nbsp;<del>￥${item.OldPrice}</del></p>
                    <img src="${item.img}.jpg">
                </a>`;
            }).join(''));

        })
    })

    $(function(){
        http.get(Path.baseUrl+"/goods_select", "", function(res){
            // console.log(res.data)
            
            var datalist = res.data.slice(6,10);
            // console.log(datalist)
            
            $('.c-increaterm').html(datalist.map(function(item){
                
                return `<a href="javascript:;" data-guid="${item.goodsID}">
                    <img src="${item.img}.jpg">             
                    <p class="c-name dib">${item.name}&nbsp;${item.Model}<p>
                    <p class="c-price dib"><span><b>￥${item.NowPrice}</b></span></p>
                </a>`;
            }).join(''));
        })
    })



    $(function(){
        http.get(Path.baseUrl+"/goods_select", "", function(res){
            // console.log(res.data)
            
            var datalist = res.data.slice(10,14);
            // console.log(datalist)
            
            $('.c-livem').html(datalist.map(function(item){
                
                return `<a href="javascript:;" data-guid="${item.goodsID}">
                    <p class="c-name ac"><b>${item.name}&nbsp;${item.Model}</b><p>
                    <p class="c-price ac"><span>￥${item.NowPrice}</span>&nbsp;<del>￥${item.OldPrice}</del></p>
                    <img src="${item.img}.jpg">
                </a>`;
            }).join(''));

        })
    })

    $(function(){
        http.get(Path.baseUrl+"/goods_select", "", function(res){
            // console.log(res.data)
            
            var datalist = res.data.slice(14,18);
            // console.log(datalist)
            
            $('.c-liverm').html(datalist.map(function(item){
                
                return `<a href="javascript:;" data-guid="${item.goodsID}">
                    <img src="${item.img}.jpg">             
                    <p class="c-name dib">${item.name}&nbsp;${item.Model}<p>
                    <p class="c-price dib"><span><b>￥${item.NowPrice}</b></span></p>
                </a>`;
            }).join(''));
        })
    })

});
    