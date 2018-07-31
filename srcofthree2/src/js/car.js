$(function(){
    // 定义一个全局的data，用来存放我读取的cookie转成的数组
    var data;
    // 封装一个获取cookie,并生产页面数据的函数
    function render(){
        var total = 0;
        var cookies = document.cookie;
        cookies = cookies.split("; ");
        cookies.forEach(function (item, idx) {
            var arr = item.split("=");
            if (arr[0] == "goodsList") {
                data = JSON.parse(arr[1])
                console.log(data);
                var table = $("table")[0];
                data.forEach(function (item, idx) {
                    var tr = document.createElement("tr");
                    table.appendChild(tr);
                    var str = `<td><input type="checkbox"class="danxuan"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="${item.src}" /></td>
                <td>${item.title}</td>
                <td>${item.nowPrice}</td>
                <td><input type="button"value="-"class="jian"/><input type="text"value="${ item.qty}"/><input type="button"value="+"class="jia"/></td>
                <td>${item.qty * item.nowPrice}</td>
                <td class="chacha">&times</td>`;
                    tr.innerHTML = str;
                    total += item.qty * item.nowPrice;
                })
                $(".total1").html(total);
                $(".total2").html(total);
            }

        })
    }
    // 页面刷新的时候先读取一次
    render();
    

    // 点击加号的时候
    $(".jia").click(function(){
        var a = $(this).prev("input");
        var b = a.val()*1+1;
        a.val(b);
        // 获取前一个td
        var c =a.parent().prev("td").html();
        console.log(c);
        // 计算当前tr的总价
        var totalprice = c * 1*b;
        // 将当前tr的总价写入后一个td
        var d =a.parent().next("td").html(totalprice);
        // 所有商品的总价
        $(".total1").html( $(".total1").html()*1 + c * 1 );
        $(".total2").html( $(".total2").html()*1 + c * 1 );
    })
    // 点击减号的时候
    $(".jian").click(function(){
        if ($(this).next("input").val()*1>1){
            var a = $(this).next("input");
            var b = a.val() * 1 - 1
            a.val(b);
            // 获取前一个td
            var c = a.parent().prev("td").html();
            console.log(c);
            // 计算当前tr的总价
            var totalprice = c * 1 * b;
            // 将当前tr的总价写入后一个td
            var d = a.parent().next("td").html(totalprice);
             // 所有商品的总价
            $(".total1").html($(".total1").html() * 1 - c * 1);
            $(".total2").html($(".total2").html() * 1 - c * 1);
        }
    })
    $("#quanxuan2").click(function () {
        console.log(444)
        $(".danxuan").each(function () {
            if (this.checked == true) {
                this.checked = false;
            } else {
                this.checked = true;
            }
        })
    })
    // $("#quanxuan3").click(function () {
    //     console.log(444)
    //     $(".danxuan").each(function () {
    //         if (this.checked == true) {
    //             this.checked = false;
    //         } else {
    //             this.checked = true;
    //         }
    //     })
    // })
    $("#quanxuan4").click(function () {
        console.log(444)
        $(".danxuan").each(function () {
            if (this.checked == true) {
                this.checked = false;
            } else {
                this.checked = true;
            }
        })
    })
    // ·删除cookie中所有商品
    $(".qingkong").click(function(){
        // 给个变色效果
        $(".qingkong").css("color","red");
        // 删除cookie中所有的商品信息
        Cookie.remove("goodsList","/");
        location.reload();
        render();
    })
// 删除单条数据，思路：获取当前cookie，然后转成数组，
// 然后得到我当前点击的是第几个li,然后用splice（）方法，删除掉数组中对应的第几个商品的数据
// 然后再将剩余的数组再重新转成字符串，再次存入cookie，删除单个之后再次重新渲染页面
    $(".chacha").click(function () {
        console.log(data);
        // 获取点击的这个i
        for (var i = 0; i < $(".chacha").length;i++){
            if ($(this)[0] ==$(".chacha")[i]) {
                console.log(i);
                data.splice(i,1);
            }
        }
        // 重新写入cookie
        var params = {
            path: '/',
        }
        Cookie.set('goodsList', JSON.stringify(data), params)

        // 重新渲染页面
        render();
        location.reload();
        
    })
})


