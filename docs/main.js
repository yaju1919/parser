(function() {
    'use strict';
    var h = $("<div>").appendTo($("body")).css({
        "text-align": "center",
        padding: "1em"
    });
    function addBtn(title, func){
        return $("<button>",{text: title}).appendTo(h).click(func);
    }
    $("<h1>",{text:"CSSをJSの連想配列に変換"}).appendTo(h);
    var input = yaju1919.addInputText(h,{
        textarea: true,
        width: "50%",
        placeholder: "xxx: yyy",
    });
    function main(){
        function kakko(str){
            if(str.indexOf('"') === -1) return '"' + str + '"';
            else if(str.indexOf("'") === -1) return "'" + str + "'";
            else if(str.indexOf("`") === -1) return '`' + str + '`';
            return false;
        }
        var str = input().split('\n').map(function(v){
            var m = v.match(/: /);
            if(!m) return '';
            var key = v.slice(0, m.index).trim();
            var value = v.slice(m.index + 2).trim();
            if(value.slice(-1) === ';') value = value.slice(0, -1); // CSS
            key = kakko(key);
            value = kakko(value);
            return (key && value) ? key + ": " + value : false;
        }).filter(function(v){
            return v;
        }).join(',\n');
        str = '{\n' + str + '}\n';
        result = str;
        showResult(str);
    };
    addBtn("変換", main);
    addBtn("コピー", function(){
        if(result) yaju1919.copy(result);
    });
    var result;
    var result_elm = $("<div>").appendTo(h);
    function showResult(str){
        result_elm.empty();
        str.split('\n').forEach(function(v){
            $("<div>").text(v).appendTo(result_elm);
        });
    }
})();
