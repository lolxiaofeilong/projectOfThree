$(function () {

    $.ajax({
        url: Path.baseUrl+'/goods_select',
        post: 'get',
        success: function (res) {
            console.log(res)
            var dataset = res.data
            cc(dataset)
        }
    })
    //点击进入详情页
    $('.Z-hellococo').click(function (e) {
        if ($(e.target).parents('.Z-shujv').length > 0) {
            let idx = $(e.target).parents('.Z-shujv').attr('data-grid');
            location.href = './goods.html?' + idx
        }
    })

    //点击搜索进入详情页
    $('.c-btnsearch').click(function(){
        location.href = './search.html?'+$('.inputSuccess1').val()
    })

    function cc(dataset) {
        var html = ''
        for (var i = 0; i < dataset.length; i++) {
            html += ` <div class="Z-shujv" data-grid=${dataset[i].goodsID}>
            <img src="${dataset[i].img}.jpg" alt="">
            <div class="Z-goodboys">
                <div class="Z-money">￥${dataset[i].NowPrice}.00</div>
                <span class="Z-jieshi">
                    <a href="javascript:">${dataset[i].name}</a>
                </span>
                <br>
                <span class="Z-jieshi">
                    <a href="javascript:">${dataset[i].Gongxiao}</a>
                </span>
            </div>
        </div>`
        }
        $('.Z-hellococo').html(html)

        //hover效果
        $('.Z-shujv').hover(function(){
            $(this).addClass('active')
        },function(){
            $(this).removeClass('active')
        })
    }

})