$(function() {

    //点击底部游戏规则监听事件
    $('.rules').click(function() {
            $('.rule').stop().fadeIn(100);
        })
        //弹出详细规则页面
    $('.rule a').click(function() {
        $('.rule').stop().fadeOut(100);
    })

    //监听开始按钮
    $('.start').click(function() {
        $(this).stop().fadeOut(100);
        //处理进度条的方法
        progressHandler();

        starfAnimation();
    });




    //监听重新开始按钮
    $('.restart').click(function() {
        $('.mask').stop().fadeOut(100);
        $('.score').text(0);
        progressHandler();

        starfAnimation();
    })


    //进度条处理事件
    function progressHandler() {
        //重新设置进度条的宽度
        $('.progress').css({ width: 180 });
        //开启定时器处理进度条
        var timer = setInterval(function() {

            var progressWidth = $('.progress').width();

            progressWidth -= 0.03;
            if (progressWidth <= 0) {
                clearInterval(timer);
                $('.mask').stop().fadeIn(100);
                stopAn();
            }


            $('.progress').css({ width: progressWidth })




        }, 1)

    }

    var wofTimer;


    function starfAnimation() {


        //定义两个数组 保存所有灰太狼和小灰灰的图片
        var wof_1 = ['./images/h0.png', './images/h1.png', './images/h2.png', './images/h3.png', './images/h4.png', './images/h5.png', './images/h6.png', './images/h7.png', './images/h8.png', './images/h9.png'];
        var wof_2 = ['./images/x0.png', './images/x1.png', './images/x2.png', './images/x3.png', './images/x4.png', './images/x5.png', './images/x6.png', './images/x7.png', './images/x8.png', './images/x9.png'];

        //定义位置数组
        var arrPos = [
            { left: '100px', top: '115px' },
            { left: '20px', top: '160px' },
            { left: "190px", top: "142px" },
            { left: "105px", top: "193px" },
            { left: "19px", top: "221px" },
            { left: "202px", top: "212px" },
            { left: "120px", top: "275px" },
            { left: "30px", top: "295px" },
            { left: "209px", top: "297px" }
        ]

        //3.创建一个图片
        var wofImage = $('<img src="" class="wofImage">');
        //随机图片位置
        var posIndex = Math.round(Math.random() * 8);
        //4.设置图片显示位置
        wofImage.css({
            position: 'absolute',
            left: arrPos[posIndex].left,
            top: arrPos[posIndex].top
        });
        //随机获取图片类型
        var wofType = Math.round(Math.random()) == 0 ? wof_1 : wof_2;
        //5.设置图片的内容
        window.wofIndex = 0;
        window.wofIndexEnd = 5;
        wofTimer = setInterval(function() {
            if (wofIndex > wofIndexEnd) {
                wofImage.remove();
                clearInterval(wofTimer);
                // wofIndex = 0;
                starfAnimation();
            }
            wofImage.attr('src', wofType[wofIndex]);
            wofIndex++;
        }, 300)


        //6.将图片添加到界面上
        $('.container').append(wofImage);

        //7.处理游戏规则的方法
        getRules(wofImage);

    }

    //停止动画方法
    function stopAn() {

        $('.wofImage').remove();

        clearInterval(wofTimer);
    }



    function getRules(wofImage) {
        wofImage.one('click', function() {

            window.wofIndex = 5;
            window.wofIndexEnd = 9;

            //拿到当前点击图片的地址
            var src = $(this).attr('src');

            var flag = src.indexOf('h') >= 0;

            if (flag) {
                var score = parseInt($('.score').text()) + 10;
                $('.score').text(score);
            } else {
                var score = parseInt($('.score').text()) - 10;
                $('.score').text(score);
            }
        })
    }





})