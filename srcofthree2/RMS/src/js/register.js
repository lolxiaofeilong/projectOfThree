$(function () {

    $('#btnRegister').click(function () {
        var Zpwd = $('#password').val()
        if (!/^[^\s]{6,20}$/i.test(Zpwd)) {
            alert('密码不合法')
            return false;
        }

        var Zpwd = $('#password').val()
        var Zpwd2 = $('.pwd2').val()
        if (Zpwd != Zpwd2) {
            alert('两次密码不一致，请确认两次密码是否一致')
            return false;
        }
        $.ajax({
            url: 'http://localhost:66/adduser',
            type: 'post',
            data: {
                username: $('#username').val(),
                password: $('#password').val(),
                rank: $('#identify').val()
            },
            success: function (res) {
                console.log(res.status)
                if (res.status == true) {
                    alert('注册成功')
                    location.href = './login.html'
                } else {
                    alert('用户已存在')
                }
            }
        })
    })

    // $('#password').blur(function () {
    //     var Zpwd = $('#password').val()
    //     if (!/^[^\s]{6,20}$/i.test(Zpwd)) {
    //         alert('密码不合法')
    //         return false;
    //     }
    // })

    // $('.pwd2').blur(function () {
    //     var Zpwd = $('#password').val()
    //     var Zpwd2 = $('.pwd2').val()
    //     if (Zpwd != Zpwd2) {
    //         alert('两次密码不一致，请确认两次密码是否一致')
    //         return false;
    //     }
    // })
})