$(function(){
    $('.Z-abc').click(function(e){
        console.log(e.target)
        
        if(e.target.tagName == 'LI'){
            $(".a").removeClass("active");
            e.target.className = 'a active'
        }
         
        if($(e.target).attr('id')=='a'){
           $('.q').show(500)
           $('.w').hide(500)
           $('.e').hide(500)
           $('.r').hide(500)
        }
        if($(e.target).attr('id')=='b'){
            $('.q').hide(500)
            $('.w').show(500)
            $('.e').hide(500)
            $('.r').hide(500)
        }
        if($(e.target).attr('id')=='c'){
            $('.q').hide(500)
            $('.w').hide(500)
            $('.e').show(500)
            $('.r').hide(500)
        }
        if($(e.target).attr('id')=='d'){
            $('.q').hide(500)
            $('.w').hide(500)
            $('.e').hide(500)
            $('.r').show(500)
        }
    })

    var goodsID = location.search.slice(1)
    $.ajax({
        url:Path.baseUrl+'/goods_selectone',
        type:'post',
        data:{
            goodsID:goodsID
        },
        success:function(res){
            var dataset = res.data
            var html = ''
            console.log(dataset[0])
           //数据生成页面
            for(var i=0;i<dataset.length;i++){
                html +=`<div class="Z-goodsDetail">
                <div id="goods-info">
                    <span class="mire">德国 |
                        <a target="_blank" href="/category-b2133.html">${dataset[i].name}/Salus</a>
                    </span>

                    <h1 id="goods-name">德国 ${dataset[i].name} ${dataset[i].Model}</h1>
                    <div class="Z-sales">
                        <div class="Z-salesm">
                            <span class="Z-salesm1">售价：</span>
                            <span class="Z-salesm2">${dataset[i].NowPrice}.00</span>
                            <span class="Z-salesm3">
                                <img src="../img/Z-goods1.png" alt="">
                            </span>
                            <span class="Z-salesm4">参考价：${dataset[i].OldPrice}.00</span>
                        </div>
                    </div>
                    <div class="Z-wufu">
                        <span class="Z-salesm1">服务：</span>
                        <span>本商品由 浦东机场自贸区 发货</span>
                    </div>
                    <div class="Z-pingjia">
                        <span class="Z-salesm1">评价：</span>
                        <a href="javascrpt::">
                            <span class="red">★★★★★</span>
                            <span class="red">100%</span>
                            <span class="Z-pingjia1">111人评价</span>
                        </a>
                    </div>
                    <div class="Z-qty">
                        <span class="Z-salesm1">数量：</span>
                        <span class="Z-qtyReduce">-</span>
                        <input type="text" value="1" class="Z-goodsqty">
                        <span class="Z-qtyjia">+</span>
                    </div>
                    <div class="Z-buycar clearfix">
                        <a href="javascrpt::" id="Z-buy">立即购买</a>
                        <a href="javascrpt::" id="Z-car">加入购物车</a>
                    </div>
                    <div class="doment">
                        <font color="#00000">100%正品&nbsp;|&nbsp;低价保障&nbsp;|&nbsp;7天无忧退货&nbsp;|&nbsp;专业营养师</font>
                    </div>
                </div>
            </div>`
            }
            $('.Z-goodsarea').append(html)
            CreateGoods(dataset)

            $('.Z-qtyReduce').click(function () {
                var jian = ($('.Z-goodsqty').val() * 1) - 1
                $('.Z-goodsqty').val(jian)
            })
            $('.Z-qtyjia').click(function () {
                var jia = ($('.Z-goodsqty').val() * 1) + 1
                $('.Z-goodsqty').val(jia)
            })
            //点击加入购物车按钮
            $('#Z-car').click(function(){
                Gan();
            })
        }
    })
    //数据插入页面
    function CreateGoods(data) {
        var Z_goods_coco = document.querySelector('.place-show');
        var Z_src = ''
        var Z_title = ''
        var Z_idx = ''
        for (var i = 0; i < data.length; i++) {
            Z_src += data[i].img
            Z_title += data[i].name
            Z_idx += data[i].goodsID
        }
        document.querySelector('.Z-fangdadiao').src = ` ${Z_src}.jpg`
        document.querySelector('.Z-fangxiaodiao').src = ` ${Z_src}.jpg`
        document.querySelector('.Z-fangzhongdiao').src = ` ${Z_src}.jpg`
        document.querySelector('.Z-haha').src = ` ${Z_src}.jpg`
        $('.Z-fangzhongdiao').attr('data-bigimg',Z_src+'.jpg')
        document.querySelector('.Z-htitle').innerHTML = Z_title

    }

    



    //加入购物车
    function Gan(){
        var goodsList = Cookie.get('goodsList');
        if (goodsList.length > 0) {
            goodsList = JSON.parse(goodsList)
        } else {
            goodsList = []
        }
        var goods = {
            phoneId: localStorage.getItem('phoneID'),
            uid: location.search.slice(1),
            src: document.querySelector('.Z-fangdadiao').src,
            title: document.querySelector('.Z-htitle').innerHTML,
            nowPrice: document.querySelector('.Z-salesm2').innerHTML,
            oldPrice: document.querySelector('.Z-salesm4').innerHTML,
            qty: $('.Z-goodsqty').val()
        }
    
        //判断当前商品是否存在
        var has = goodsList.some(function (goods) { 
    
            var res = goods.uid === location.search.slice(1);
            if (res) {
                goods.qty = Number(goods.qty) + Number($('.Z-goodsqty').val())
    
            }
            return res;
        });
    
        if (!has) {
            var goods = {
                phoneId: localStorage.getItem('phoneID'),
                uid: location.search.slice(1),
                src: document.querySelector('.Z-fangdadiao').src,
                title: document.querySelector('.Z-htitle').innerHTML,
                nowPrice: document.querySelector('.Z-salesm2').innerHTML,
                oldPrice: document.querySelector('.Z-salesm4').innerHTML,
                qty: $('.Z-goodsqty').val()
            }
    
            goodsList.push(goods);
        }
        // 设置cookie 
        var params = {
            path:'/',
        }
        Cookie.set('goodsList', JSON.stringify(goodsList),params)
    }

})