
    $(function () {
        // 点击切换登陆、注册
        $("ul").click(function (e) {
            if (e.target.tagName.toLowerCase() == "li") {
                var idx;
                for (var i = 0; i < 2; i++) {
                    $("li")[i].style.borderBottom = "1px solid #ccc";
                    $("li")[i].style.color = "#000";
                    $("#qiehuan")[0].children[i].style.display = "none";
                    if ($(e.target)[0] == $("li")[i]) {
                        idx = i;
                        // console.log(idx);
                    }
                }
                $("#qiehuan")[0].children[idx].style.display = "block";
                $(e.target)[0].style.borderBottom = "2px solid #f42f2f";
                $(e.target)[0].style.color = "red";
            }
        })
        // 封装一个生成随机验证码的函数
        function yanzhengma() {
            var str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var a = parseInt(Math.random() * 62);
            var b = parseInt(Math.random() * 62);
            var c = parseInt(Math.random() * 62);
            var d = parseInt(Math.random() * 62);
            var str1 = str[a] + str[b] + str[c] + str[d];
            return str1;
        }
        // 记录当前验证码
        var a;
        // 封装一个生成验证码的函数
        function showyzm() {
            a = yanzhengma();
            $(".yzm")[0].value = a;
            $("#yzm")[0].value = a;
        }
        // 页面刷新自动生成一个验证码
        showyzm();
        // 点击更换验证码
        $(".three0").click(function () {
            showyzm();
        })
        // 点击更换验证码
        $(".three").click(function () {
            showyzm();
        })
        // 点击登陆按钮
        $("#btn_login").click(function(){            
            var username = $("#username").val();
            var password = $("#password").val();
            var yanzheng = $("#yanzheng").val();
            console.log(username,password,yanzheng);
            var params ={
                username:username,
                password:password
            }
            $.post(Path.baseUrl+"/login",params,function(res){
                console.log(res)
                console.log(res.status)
                if(res.status){
                    alert("登陆成功");
                    location.href="index.html";
                }else{
                    alert("用户名或密码错误");
                }
            })
        })
        // 点击注册按钮
        $("#btn_register").click(function(){
            var username1 = $("#username1").val();
            var password1 = $("#password1").val();
            var password2 = $("#password2").val();
            var yanzheng1 = $(".one").val();
            // console.log(username1,password1,password2,yanzheng1);
            // if (!/^1[3-8]\d{9}$/i.test(username1)) {
            //     alert('手机号不合法');

            //     return false;
            // }
            
            var params = {
                username: username1,
                password: password1
            }
            $.post(Path.baseUrl+"/register", params, function (res) {
                console.log(res)
                if(res.status){
                    alert("注册成功")
                }else{
                    alert("用户名已存在");
                }
            })
        })


    })

