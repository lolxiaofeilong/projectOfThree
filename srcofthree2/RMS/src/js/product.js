
$(function () {
   
    bb()
    $('.Z-fuck').dblclick(function (e) {
        if (e.target.tagName == 'TD' && e.target.className !== 'Z-aa') {
            //创建元素input
            var inp = document.createElement('input')
            inp.style = 'border:1px solid #ccc;height:30px'
            //把input写入当前点击的元素
            e.target.appendChild(inp);
            //获取单元格文本，并把文本赋予input
            var texts = e.target.innerText
            inp.value = texts;
            inp.focus();

            // 当input失去焦点时，把input的值写入当前被点击的元素
            inp.onblur = function () {
                var _inp = inp.value;
                e.target.innerText = _inp;
            }
        }

    })
    $('.Z-btn').click(function () {
        document.querySelector('.Z-fuck').innerHTML = ' '
        $.ajax({
            url: 'http://localhost:66/goods_add',
            data: {
                goodsID: $('.Z-a').val(),
                name: $('.Z-b').val(),
                img: $('.Z-c').val(),
                NowPrice: $('.Z-d').val(),
                OldPrice: $('.Z-e').val(),
                Gongxiao: $('.Z-f').val(),
                Model: $('.Z-g').val(),
                qty: $('.Z-h').val()
            },
            type: 'post',
            success: function (res) {               
                if (res.status == true) {
                    document.querySelector('.Z-fuck').innerHTML = ' '
                    bb();
                }
            }
        })

        // var ss = document.querySelector('.Z-a').value++
        // ss++
        // console.log(ss)
    })

    $('.delect_product').click(function () {
        if (confirm('确定全部删除吗')) {
            $.ajax({
                url: 'http://localhost:66/goods_delect',
                type: 'post',
                data: {},
                success: function (res) {
                    if (res.status == true) {
                        bb();
                    }

                }
            })
        }
    })

    $('#blurSearch1').click(function(){
        console.log($('#inputSuccess1').val())
        $.ajax({
            url:'http://localhost:66/searh_goods',
            type:'post',
            data:{
                info:$('#inputSuccess1').val(),
            },
            success:function(res){
               cc(res.data)
            }
        })
    })

    $('#bigul').click(function(e){

        if($(e.target).hasClass('anim')){
            $('.smallul').animate({height:0},100);
            if($(e.target).next().height()==0){
                $(e.target).next().animate({height:60*$(e.target).next().children().length},50);
            }else{
                $(e.target).next().animate({height:0*$(e.target).next().children().length},50);
            }
        }
    })

    function bb() {
        $.ajax({
            url: 'http://localhost:66/goods_select',
            type: 'get',
            success: function (res) {
                var dataset = res.data;
                console.log(dataset)
                cc(dataset)
                // var html = ''

                // for (var i = 0; i < dataset.length; i++) {
                    
                //     html += `<tr class="Z-gan">
                //             <td class="Z-aa">${dataset[i].goodsID}</td>
                //             <td>${dataset[i].name}</td>
                //             <td>${dataset[i].img}</td>
                //             <td>${dataset[i].NowPrice}</td>
                //             <td>${dataset[i].OldPrice}</td>
                //             <td>${dataset[i].Gongxiao}</td>
                //             <td>${dataset[i].Model}</td>
                //             <td>${dataset[i].qty}</td>
                //             <th>
                //                 <button class="btn btn-success btn-xs" id="add_product">更新</button>
                //             </th>
                //             <th><button class="btn Z-diao" data-idx=${dataset[i].goodsID}>x</button></th>
                //         </tr>`
                // }
                
                // document.querySelector('.Z-fuck').innerHTML = html

                $('.Z-gan').click(function (e) {
                    console.log(e.target)
                    if (e.target.innerText == 'x') {
                        console.log(e.target)
                        let goodsID = e.target.getAttribute("data-idx");
                        $.ajax({
                            url: 'http://localhost:66/goods_delect',
                            type: 'post',
                            data: {
                                goodsID: goodsID,
                            },
                            success: function (res) {
                                bb();
                            }
                        })
                    }

                    if (e.target.innerText == '更新') {
                        console.log(e.target.parentNode.parentNode.children[1].innerText)
                        $.ajax({
                            url: 'http://localhost:66/goods_update',
                            type: 'post',
                            data: {
                                goodsID: e.target.parentNode.parentNode.children[0].innerText,
                                name: e.target.parentNode.parentNode.children[1].innerText,
                                img: e.target.parentNode.parentNode.children[2].innerText,
                                NowPrice: e.target.parentNode.parentNode.children[3].innerText,
                                OldPrice: e.target.parentNode.parentNode.children[4].innerText,
                                Gongxiao: e.target.parentNode.parentNode.children[5].innerText,
                                Model: e.target.parentNode.parentNode.children[6].innerText,
                                qty: e.target.parentNode.parentNode.children[7].innerText,
                            },
                            success: function (res) {
                                console.log(res)
                                // location.reload();
                            }
                        })
                    }
                })
            }
        })
    }

    function cc(dataset) {
        var html = ''

        for (var i = 0; i < dataset.length; i++) {
            
            html += `<tr class="Z-gan">
                    <td class="Z-aa">${dataset[i].goodsID}</td>
                    <td>${dataset[i].name}</td>
                    <td>${dataset[i].img}</td>
                    <td>${dataset[i].NowPrice}</td>
                    <td>${dataset[i].OldPrice}</td>
                    <td>${dataset[i].Gongxiao}</td>
                    <td>${dataset[i].Model}</td>
                    <td>${dataset[i].qty}</td>
                    <th>
                        <button class="btn btn-success btn-xs" id="add_product">更新</button>
                    </th>
                    <th><button class="btn Z-diao" data-idx=${dataset[i].goodsID}>x</button></th>
                </tr>`
        }
        
        document.querySelector('.Z-fuck').innerHTML = html
    }
})