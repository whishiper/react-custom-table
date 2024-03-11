export var withDefaultProps = function (defaultProps, Cmp) {
    // here we set our defaultProps
    Cmp.defaultProps = defaultProps;
    // we override return type definition by turning type checker off
    // for original props  and setting the correct return type
    return Cmp;
};
export var getType = function (data) {
    return Object.prototype.toString.call(data).slice(8, -1);
};
//深拷贝
export var deepCopy = function (obj1) {
    var isObject = function (obj) { return (typeof obj === 'object') === true; };
    var isType = function (obj) {
        return Object.prototype.toString.call(obj).slice(8, -1);
    };
    var resObj;
    //引用类型
    if (isObject) {
        if (isType(obj1) === 'Array') {
            resObj = [];
            for (var i = 0; i < obj1.length; i++) {
                if (isObject(obj1[i])) {
                    resObj[i] = deepCopy(obj1[i]);
                }
                else {
                    resObj[i] = obj1[i];
                }
            }
        }
        if (isType(obj1) === 'Object') {
            resObj = {};
            for (var key in obj1) {
                if (isObject(obj1[key])) {
                    resObj[key] = deepCopy(obj1[key]);
                }
                else {
                    resObj[key] = obj1[key];
                }
            }
        }
    }
    else {
        //基本类型
        resObj = obj1;
    }
    return resObj;
};
export default {
    getType: getType
};
