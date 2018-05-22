
var user_email="admin@163.com";
var user_password="666666";

//取本地数据进行校验

function checklogin() {
//    获取文本框数据
    var email=$('#txtEmail').val();
    var password=$('#txtPassword').val();
    console.log(email);
    console.log(password);
    if(email==user_email && password==user_password){
        sessionStorage.setItem('userId',email);
        return true;
    }
    else{
        alert("ERROR");
        return false;
    }
    return false;
}


function checkUser() {
    var email=$('#txtEmail').val();
    if(email.length==0){
        $('#email_alert').html("*用户名不能为空");
        $('#email_alert').fadeIn(1000).fadeOut(4000);
        return false;
    }else {
        if(email.indexOf('@')==-1){
            $('#email_alert').html('*用户名格式不合法');
            $('#email_alert').fadeIn(1000).fadeOut(4000);
            return false;
        }else {
            return true;
        }
    }
}

function checkPassword(){
    var password=$('#txtPassword').val();
    if(password.length==0){
        $('#password_alert').html("*密码不能为空");
        $('#password_alert').fadeIn(1000).fadeOut(4000);
        return false;
    }else if(password.length<6){
        $('#password_alert').html("*密码长度应不小于6位");
        $('#password_alert').fadeIn(1000).fadeOut(4000);
        return false;
    }else{
        return true;
    }
}

$('#btn_login').click(function () {
    if(checkUser()&&checkPassword()){
        var email=$('#txtEmail').val();
        var password=$('#txtPassword').val();

        var user={"userId":email,"userPassword":password};
        $.ajax(
            {
                url:'../datas/users.json',
                type:'get',
                dataType:'json',
                data:user,
                success:function (response) {
                    var uu;
                    for(var i=0;i<response.length;i++){
                        if(response[i].userId==email){
                            uu=response[i];
                        }
                    }

                    if(uu){
                        if(uu.userPassword==password){
                            sessionStorage.setItem('userId',email);
                            sessionStorage.setItem('nickName',uu.nickName);
                            sessionStorage.setItem('userIcon',uu.userIcon);
                            location.href='../index.html';
                        }else {
                            $('.password-alert').html("*用户名或密码错误");
                            $('.password-alert').fadeIn(1000).fadeOut(4000);
                        }
                    }else {
                        $('.email-alert').html("*用户名不存在");
                        $('.email-alert').fadeIn(1000).fadeOut(4000);
                    }
                },
                error:function (err) {
                    console.log(err);
                }
            }
        )
    }
})