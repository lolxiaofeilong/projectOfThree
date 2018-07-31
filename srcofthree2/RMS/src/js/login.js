$(function(){
    $('#btnLogin').click(function(){
        $.ajax({
            url:'http://localhost:66/login',
            type:'post',
            data:{
                username: $('#username').val(),
                password: $('#password').val(),
            },
            success:function(res){
                console.log(res)
                if(res.status == true){
                    alert('登录成功')
                    localStorage.setItem('token',res.data)
                    location.href = '../index.html'
                }else{
                    alert('用户名或密码不正确')
                }
            }
        })
    })
})