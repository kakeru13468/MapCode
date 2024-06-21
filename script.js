$(document).ready(function () {
    const data = {
        "東橫INN JR神戶站北口": "12 306 763*75",
        "神戸の中華そば もっこす 総本店": "12 336 758*61",
        "神戶塔 美利堅公園": "12 337 472*20",
        "北野異人館": "12 398 606*44",
        "神戶六甲牧場 北野本店": "12 398 663*76",
        "天滿神社(水詩籤)": "7 703 316*12",
        "風見雞本舖": "12 398 603*70",
        "神戸三宮高架商店街": "12 368 547*51",
        "南京町中華街": "12 367 143*00",
        "元町商店街一番街": "12 368 242*64",
        "神戶三宮中心街": "12 368 490*01",
        "牛排Mouriya 總店": "12 368 698*81",
        "麵包超人博物館": "12 337 045*66",
        "神戶臨海樂園umie": "12 337 189*13",
        "神戶站地下街": "12 306 870*15",
        "摩耶山掬星台夜景": "12 520 632*14",
        "海の教会": "946 781 789*50",
        "本福寺 水御堂": "339 179 150*63",
        "漩渦之丘 大鳴門橋紀念館": "406 307 164*72",
        "舩本うどん本店": "56 717 608*14",
        "田村神社": "56 717 608*14",
        "東橫INN 高松兵庫町": "60 636 152*43",
        "骨付鳥 一鶴 高松店": "60 606 694*72",
        "高松港玉藻防波堤赤灯台": "60 666 885*14",
        "高屋神社駐車場": "77 213 818*11",
        "父母ヶ浜 第1駐車場": "77 363 277*70",
        "金刀比羅宮": "77 353 630*41",
        "東橫INN 丸龁站前": "77 740 526*41",
        "鷲羽山 駐車場": "19 038 321*24",
        "倉敷美觀地區": "19 632 117*77",
        "吉備津神社": "275 012 101*76",
        "平成租車岡山車站前店": "19 890 747*56",
        "東橫INN 岡山站東口": "19 890 535*20",
        "後樂園/岡山城": "19 892 619*41 / 19 892 409*66"
    };

    const locationSelect = $('#locationSelect');

    $.each(data, function (location, value) {
        locationSelect.append($('<option>', {
            value: location,
            text: location
        }));
    });

    $('#searchButton').click(function () {
        const selectedLocation = locationSelect.val();
        const result = data[selectedLocation] || "請選擇一個地區";
        $('#result').text(result);
    });

    var countOption = $('.old-select option').length;

    function openSelect() {
        var heightSelect = $('.new-select').height();
        var j = 1;
        $('.new-select .new-option').each(function () {
            $(this).addClass('reveal');
            $(this).css({
                'box-shadow': '0 1px 1px rgba(0,0,0,0.1)',
                'left': '0',
                'right': '0',
                'top': j * (heightSelect + 1) + 'px'
            });
            j++;
        });
    }

    function closeSelect() {
        var i = 0;
        $('.new-select .new-option').each(function () {
            $(this).removeClass('reveal');
            if (i < countOption - 3) {
                $(this).css('top', 0);
                $(this).css('box-shadow', 'none');
            } else if (i === countOption - 3) {
                $(this).css('top', '3px');
            } else if (i === countOption - 2) {
                $(this).css({
                    'top': '7px',
                    'left': '2px',
                    'right': '2px'
                });
            } else if (i === countOption - 1) {
                $(this).css({
                    'top': '11px',
                    'left': '4px',
                    'right': '4px'
                });
            }
            i++;
        });
    }

    // 初始化顯示選中的選項
    if ($('.old-select option[selected]').length === 1) {
        $('.selection p span').html($('.old-select option[selected]').html());
    } else {
        $('.selection p span').html($('.old-select option:first-child').html());
    }

    // 將舊選單的選項添加到新的下拉選單中
    $('.old-select option').each(function () {
        var newValue = $(this).val();
        var newHTML = $(this).html();
        $('.new-select').append('<div class="new-option" data-value="' + newValue + '"><p>' + newHTML + '</p></div>');
    });

    var reverseIndex = countOption;
    $('.new-select .new-option').each(function () {
        $(this).css('z-index', reverseIndex);
        reverseIndex = reverseIndex - 1;
    });

    // 初始狀態下關閉選單
    closeSelect();

    // 點擊事件：打開或關閉選單
    $('.selection').click(function () {
        $(this).toggleClass('open');
        if ($(this).hasClass('open') === true) {
            openSelect();
        } else {
            closeSelect();
        }
    });

    // 點擊新選項時的處理
    $('.new-option').click(function () {
        var newValue = $(this).data('value');

        // 更新自定義選單的顯示
        $('.selection p span').html($(this).find('p').html());
        $('.selection').click();

        // 更新舊選單的選中狀態
        $('.old-select option[selected]').removeAttr('selected');
        $('.old-select option[value="' + newValue + '"]').attr('selected', 'selected');

        // 同步顯示舊選單的選中狀態
        $('.old-select').val(newValue).change();
    });
});